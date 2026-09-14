#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { validate } = require('./json-schema-lite');

const root = path.resolve(__dirname, '..');

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

function schemaErrors(schemaPath, value) {
  const schema = readJson(schemaPath);
  return validate(schema, schema, value);
}

function expectedDisposition(requirements) {
  const required = requirements.filter(r => r.required);
  if (required.some(r => r.status === 'FAIL' || r.status === 'UNSUPPORTED')) return 'FAIL';
  if (required.some(r => r.status === 'INDETERMINATE' || (r.status === 'PASS' && r.evidence.length === 0))) return 'INDETERMINATE';
  const optional = requirements.filter(r => !r.required);
  if (optional.some(r => r.status !== 'PASS' || r.evidence.length === 0)) return 'PARTIAL';
  return 'PASS';
}

function validateDeclaration(value) {
  const errors = schemaErrors('conformance/external-conformance-profile-declaration.schema.json', value);
  const ids = (value.requirements || []).map(r => r.id);
  if (new Set(ids).size !== ids.length) errors.push('$.requirements: requirement ids must be unique');
  for (const r of value.requirements || []) {
    if (r.support === 'supported' && r.evidence.length === 0) {
      errors.push(`$.requirements.${r.id}: supported requirement must include evidence`);
    }
  }
  return errors;
}

function validateResult(value) {
  const errors = schemaErrors('conformance/external-conformance-result.schema.json', value);
  const ids = (value.requirements || []).map(r => r.id);
  if (new Set(ids).size !== ids.length) errors.push('$.requirements: requirement ids must be unique');
  if (!errors.length) {
    const expected = expectedDisposition(value.requirements);
    if (value.disposition !== expected) {
      errors.push(`$.disposition: ${value.disposition} contradicts requirement evidence; expected ${expected}`);
    }
    if (value.disposition === 'PASS' && value.evidence_status !== 'complete') {
      errors.push('$.evidence_status: PASS requires complete evidence');
    }
    if (value.disposition === 'PARTIAL' && value.evidence_status !== 'partial') {
      errors.push('$.evidence_status: PARTIAL requires partial evidence');
    }
    if (value.disposition === 'INDETERMINATE' && !['missing', 'unavailable'].includes(value.evidence_status)) {
      errors.push('$.evidence_status: INDETERMINATE requires missing or unavailable evidence');
    }
  }
  return errors;
}

function assertFixture(fixture) {
  const value = readJson(fixture.path);
  const errors = fixture.kind === 'declaration' ? validateDeclaration(value) : validateResult(value);
  const valid = errors.length === 0;
  if (valid !== fixture.valid) {
    throw new Error(`${fixture.path}: expected valid=${fixture.valid}, got valid=${valid}: ${errors.join('; ')}`);
  }
}

function pressureTests() {
  const base = readJson('examples/conformance/result-pass.json');

  const missingEvidence = structuredClone(base);
  missingEvidence.requirements[0].evidence = [];
  missingEvidence.disposition = 'PASS';
  if (validateResult(missingEvidence).length === 0) throw new Error('pressure test failed: missing required evidence promoted to PASS');

  const requiredUnsupported = structuredClone(base);
  requiredUnsupported.requirements[1].status = 'UNSUPPORTED';
  requiredUnsupported.disposition = 'PASS';
  if (validateResult(requiredUnsupported).length === 0) throw new Error('pressure test failed: required UNSUPPORTED promoted to PASS');

  const indeterminateAsPass = structuredClone(base);
  indeterminateAsPass.requirements[2].status = 'INDETERMINATE';
  indeterminateAsPass.requirements[2].evidence = [];
  indeterminateAsPass.disposition = 'PASS';
  if (validateResult(indeterminateAsPass).length === 0) throw new Error('pressure test failed: INDETERMINATE promoted to PASS');

  const unknownDisposition = structuredClone(base);
  unknownDisposition.disposition = 'UNKNOWN';
  if (validateResult(unknownDisposition).length === 0) throw new Error('pressure test failed: unknown disposition accepted');
}

function main() {
  const manifest = readJson('examples/conformance/fixture-manifest.json');
  manifest.fixtures.forEach(assertFixture);
  pressureTests();
  console.log(`external conformance validation passed: ${manifest.fixtures.length} fixtures + pressure tests`);
}

if (require.main === module) main();

module.exports = { expectedDisposition, validateDeclaration, validateResult };
