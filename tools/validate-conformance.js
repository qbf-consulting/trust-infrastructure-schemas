#!/usr/bin/env node
/**
 * Reference validator for trust-infrastructure-schemas.
 *
 * Uses the repository-local JSON Schema subset validator so validation has zero package-install dependencies.
 * Usage:
 *   node tools/validate-conformance.js
 */
const fs = require("fs");
const { validate: validateJsonSchema } = require("./json-schema-lite");

function exists(p) {
  try { fs.accessSync(p); return true; } catch { return false; }
}

function loadJson(p) {
  return JSON.parse(fs.readFileSync(p, "utf8"));
}

function validate(schema, data, label) {
  if (!exists(schema)) throw new Error(`Missing schema: ${schema}`);
  if (!exists(data)) throw new Error(`Missing data/example: ${data}`);
  console.log(`== Validating ${label} ==`);
  const schemaObj = loadJson(schema);
  const errors = validateJsonSchema(schemaObj, schemaObj, loadJson(data));
  if (errors.length) {
    throw new Error(`${data} invalid against ${schema}:\n- ${errors.join("\n- ")}`);
  }
}

function validateCredentialFamilies() {
  for (const domain of ["dtg", "agent", "reputation"]) {
    console.log(`== Validating credential family: ${domain} ==`);
    const files = fs.readdirSync(`credentials/${domain}/v1`).filter((f) => f.endsWith(".json"));
    for (const base of files) {
      const schema = `credentials/${domain}/v1/${base}`;
      const example = `examples/${domain}/v1/${base.replace(/\.json$/, ".example.json")}`;
      validate(schema, example, `${domain}/${base}`);
    }
  }
}

function validateCoverageManifest() {
  validate("validation/artifact-coverage.schema.json", "validation/artifact-coverage.json", "artifact coverage manifest");
  const manifest = loadJson("validation/artifact-coverage.json");
  for (const artifact of manifest.artifacts) {
    for (const field of ["schema", "documentation"]) {
      const value = artifact[field];
      if (Array.isArray(value)) {
        for (const p of value) if (!exists(p)) throw new Error(`Coverage manifest references missing ${field}: ${p}`);
      } else if (value && !exists(value)) {
        throw new Error(`Coverage manifest references missing ${field}: ${value}`);
      }
    }
    for (const p of artifact.examples || []) {
      if (!exists(p)) throw new Error(`Coverage manifest references missing example: ${p}`);
    }
  }
}

if (!exists("conformance/conformance-declaration.schema.json")) {
  console.error("ERROR: run from repository root.");
  process.exit(1);
}

try {
  validateCredentialFamilies();

  validate("conformance/conformance-declaration.schema.json", "conformance/examples/example-declaration.json", "conformance declaration example");
  validate("controls/controls.schema.json", "controls/controls.json", "controls registry");
  validate("assurance/assurance.schema.json", "assurance/assurance-levels.json", "assurance registry");
  validate("controls/mappings/control-assurance-matrix.schema.json", "controls/mappings/control-assurance-matrix.json", "control-to-assurance matrix");
  validate("registry/registry.schema.json", "registry/sample-registry.json", "registry simulation");
  validate("registry/registry-entry.schema.json", "examples/composition/registry-entry.example.json", "composition registry entry");
  validate("common/artifact-reference.schema.json", "common/examples/artifact-reference.example.json", "reusable artifact reference example");
  validate("governance/authority-boundary.schema.json", "governance/examples/authority-boundary.example.json", "authority boundary example");
  validate("governance/authority-at-commitment.schema.json", "examples/authority-at-commitment.valid.json", "authority at commitment valid example");
  {
    const schemaObj = loadJson("governance/authority-at-commitment.schema.json");
    const invalid = loadJson("examples/authority-at-commitment.invalid-permit-revoked.json");
    const negativeErrors = validateJsonSchema(schemaObj, schemaObj, invalid);
    if (!negativeErrors.length) {
      throw new Error("authority-at-commitment negative fixture unexpectedly validated");
    }
    console.log("== Validating authority at commitment negative fixture ==\nOK: rejected as expected");
  }
  validate("evidence/evidence-bundle-manifest.schema.json", "examples/composition/evidence-bundle-manifest.example.json", "evidence bundle manifest example");
  validate("oasf/oasf-publication-profile.schema.json", "oasf/examples/oasf-publication-profile.example.json", "OASF publication profile example");
  validate("oasf/oasf-evaluation-envelope.schema.json", "oasf/examples/oasf-evaluation-envelope.example.json", "OASF evaluation envelope example");
  validate("oasf/oasf-evaluation-envelope.schema.json", "examples/composition/verifier-evaluation.example.json", "composition verifier evaluation example");
  validate("oasf/mappings/oasf-control-crosswalk.schema.json", "oasf/mappings/oasf-control-crosswalk.json", "OASF control crosswalk");
  validate("odrl/odrl-policy-reference.schema.json", "odrl/samples/odrl-policy-reference.json", "ODRL policy reference sample");
  validate("profiles/ais1/schema.json", "profiles/ais1/examples/bonded-agent-profile.example.json", "AIS-1 bonded agent profile example");

  validate("profiles/openvtc/openvtc-profile.schema.json", "profiles/openvtc/examples/openvtc-profile.example.json", "OpenVTC runtime profile example");
  validate("profiles/openvtc/openvtc-relationship-state.schema.json", "profiles/openvtc/examples/relationship-established.example.json", "OpenVTC relationship state example");
  validate("profiles/openvtc/openvtc-vrc-issuance-receipt.schema.json", "profiles/openvtc/examples/vrc-issued.example.json", "OpenVTC VRC issuance receipt example");
  validate("profiles/openvtc/openvtc-config-evidence.schema.json", "profiles/openvtc/examples/config-evidence.example.json", "OpenVTC config evidence example");
  validate("profiles/openvtc/openvtc-didcomm-routing-evidence.schema.json", "profiles/openvtc/examples/didcomm-routing.example.json", "OpenVTC DIDComm routing evidence example");

  validate("profiles/vti/vta-context.schema.json", "profiles/vti/examples/vta-context.example.json", "VTI VTA context example");
  validate("profiles/vti/vta-acl-entry.schema.json", "profiles/vti/examples/vta-acl-entry.example.json", "VTI VTA ACL entry example");
  validate("profiles/vti/vta-authorization-credential.schema.json", "profiles/vti/examples/vta-authorization-credential.example.json", "VTI VTA authorization credential example");
  validate("profiles/vti/sealed-transfer-envelope.schema.json", "profiles/vti/examples/sealed-transfer-envelope.example.json", "VTI sealed transfer envelope example");
  validate("profiles/vti/did-template-reference.schema.json", "profiles/vti/examples/did-template-reference.example.json", "VTI DID template reference example");
  validate("profiles/vti/tee-attestation-reference.schema.json", "profiles/vti/examples/tee-attestation-reference.example.json", "VTI TEE attestation reference example");
  validate("profiles/vti/provision-integration-receipt.schema.json", "profiles/vti/examples/provision-integration-receipt.example.json", "VTI provision integration receipt example");

  validate("profiles/tsmm/tsmm-runtime-governance-projection.schema.json", "profiles/tsmm/examples/runtime-governance-projection.example.json", "TSMM runtime governance projection example");

  validate("profiles/trust-tasks/trust-task-reference.schema.json", "profiles/trust-tasks/examples/trust-task-reference.example.json", "Trust Task reference example");
  validate("profiles/trust-tasks/trust-task-lifecycle-event.schema.json", "profiles/trust-tasks/examples/trust-task-lifecycle-event.example.json", "Trust Task lifecycle event example");
  validate("profiles/trust-tasks/trust-task-manifest-reference.schema.json", "profiles/trust-tasks/examples/trust-task-manifest-reference.example.json", "Trust Task manifest reference example");
  validate("profiles/trust-tasks/trust-task-execution-receipt.schema.json", "profiles/trust-tasks/examples/trust-task-execution-receipt.example.json", "Trust Task execution receipt example");

  validate("profiles/openvtc/openvtc-state-normalization.schema.json", "profiles/openvtc/examples/state-normalization.example.json", "OpenVTC state normalization example");
  validate("profiles/openvtc/openvtc-task-evidence.schema.json", "profiles/openvtc/examples/task-evidence.example.json", "OpenVTC task evidence example");

  validate("evidence/evidence-bundle-manifest.schema.json", "evidence/examples/integrity-bound-evidence-bundle.example.json", "integrity-bound evidence bundle example");
  validate("profiles/vti/status-list-reference.schema.json", "profiles/vti/examples/status-list-reference.example.json", "VTI status-list reference example");
  validate("registry/registry-publication-profile.schema.json", "registry/examples/registry-publication-profile.example.json", "registry publication profile example");

  validate("profiles/tsmm/tsmm-runtime-governance-projection.schema.json", "examples/cross-repo/runtime-assurance-v0.10/01-tsmm-runtime-governance-projection.example.json", "v0.10 composition TSMM projection");
  validate("profiles/vti/vta-acl-entry.schema.json", "examples/cross-repo/runtime-assurance-v0.10/02-vti-acl-entry.example.json", "v0.10 composition VTI ACL");
  validate("profiles/openvtc/openvtc-task-evidence.schema.json", "examples/cross-repo/runtime-assurance-v0.10/03-openvtc-task-evidence.example.json", "v0.10 composition OpenVTC task evidence");
  validate("profiles/trust-tasks/trust-task-lifecycle-event.schema.json", "examples/cross-repo/runtime-assurance-v0.10/04-trust-task-lifecycle-event.example.json", "v0.10 composition Trust Task lifecycle");
  validate("profiles/trust-tasks/trust-task-execution-receipt.schema.json", "examples/cross-repo/runtime-assurance-v0.10/05-trust-task-execution-receipt.example.json", "v0.10 composition Trust Task execution receipt");
  validate("evidence/evidence-bundle-manifest.schema.json", "examples/cross-repo/runtime-assurance-v0.10/06-integrity-bound-evidence-bundle.example.json", "v0.10 composition integrity-bound evidence bundle");
  validate("decision/decision-receipt.schema.json", "examples/cross-repo/runtime-assurance-v0.10/07-decision-receipt.example.json", "v0.10 composition decision receipt");
  validate("registry/registry-publication-profile.schema.json", "examples/cross-repo/runtime-assurance-v0.10/08-registry-publication-profile.example.json", "v0.10 composition registry publication profile");

  validate("model/cross-repo-compatibility-matrix.schema.json", "model/cross-repo-compatibility-matrix.json", "cross-repo compatibility matrix");
  validate("model/trust-artifact-taxonomy.schema.json", "model/trust-artifact-taxonomy.json", "trust artifact taxonomy");
  validate("decision/decision-receipt.schema.json", "decision/examples/decision-receipt.example.json", "decision receipt example");
  validate("conformance/conformance-declaration.schema.json", "examples/composition/domain-baseline-declaration.example.json", "composition domain baseline declaration");

  validate("model/tsmm-artifact-mapping.schema.json", "model/tsmm-artifact-mapping.json", "TSMM artifact mapping");
  validate("governance/authority-boundary.schema.json", "governance/examples/tsmm-derived-authority-boundary.example.json", "TSMM-derived authority boundary example");
  validate("evidence/evidence-bundle-manifest.schema.json", "evidence/examples/tsmm-evidence-bundle-manifest.example.json", "TSMM evidence bundle manifest example");
  validate("oasf/oasf-evaluation-envelope.schema.json", "examples/composition/tsmm-aligned/03-evaluation-envelope.example.json", "TSMM-aligned evaluation envelope example");
  validate("decision/decision-receipt.schema.json", "decision/examples/tsmm-mapped-decision-receipt.example.json", "TSMM-mapped decision receipt example");
  validate("registry/registry-entry.schema.json", "registry/examples/tsmm-derived-registry-entry.example.json", "TSMM-derived registry entry example");
  validate("governance/authority-boundary.schema.json", "examples/composition/tsmm-aligned/01-authority-boundary.example.json", "TSMM composition authority boundary");
  validate("evidence/evidence-bundle-manifest.schema.json", "examples/composition/tsmm-aligned/02-evidence-bundle-manifest.example.json", "TSMM composition evidence bundle");
  validate("decision/decision-receipt.schema.json", "examples/composition/tsmm-aligned/04-decision-receipt.example.json", "TSMM composition decision receipt");
  validate("registry/registry-entry.schema.json", "examples/composition/tsmm-aligned/05-registry-entry.example.json", "TSMM composition registry entry");

  validate("model/tsmm-semantic-coverage.schema.json", "model/tsmm-semantic-coverage.json", "TSMM semantic coverage");

  validateCoverageManifest();

  console.log("OK");
} catch (e) {
  console.error(e.message || e);
  process.exit(2);
}
