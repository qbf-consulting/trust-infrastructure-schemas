#!/usr/bin/env node
const fs = require('fs');
const { validate } = require('./json-schema-lite');

function load(p) { return JSON.parse(fs.readFileSync(p, 'utf8')); }

const authoritySchema = load('governance/authority-at-commitment.schema.json');
const lifecycleSchema = load('assurance/assurance-lifecycle-event.schema.json');
const attempted = load('validation/pressure-tests/composite-authority.attempt.json');
const lifecycle = load('validation/pressure-tests/composite-authority.lifecycle.json');

let failed = false;

const authorityErrors = validate(authoritySchema, authoritySchema, attempted);
if (authorityErrors.length === 0) {
  failed = true;
  console.error('FAIL: current authority-at-commitment contract unexpectedly accepts composite-authority detail');
} else {
  console.log('PASS: current authority-at-commitment contract rejects undeclared composite-authority detail');
}

const lifecycleErrors = validate(lifecycleSchema, lifecycleSchema, lifecycle);
if (lifecycleErrors.length) {
  failed = true;
  console.error('FAIL: assurance lifecycle contract could not carry material authority-change evidence');
  lifecycleErrors.forEach(e => console.error('- ' + e));
} else {
  console.log('PASS: existing assurance lifecycle contract carries material authority-change/reassessment evidence');
}

if (lifecycle.impact !== 'material' || lifecycle.disposition !== 'reassessment_required') {
  failed = true;
  console.error('FAIL: lifecycle pressure fixture must fail closed to reassessment_required');
}

if (failed) process.exit(1);
console.log('OK composite-authority contract gap pressure test');
