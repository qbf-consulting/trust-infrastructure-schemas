# Trust Infrastructure Schemas

> **Flagship repository**  
> **Role:** `portable-machine-readable-contract-layer`  
> **Current version:** `v0.15.0`  
> **Canonical validation:** `make validate`  
> **Authority:** [`governance/repository-authority.yaml`](governance/repository-authority.yaml)  
> **Start here:** [`docs/adoption.md`](docs/adoption.md)


**Current release:** `v0.15.0`  
**Release theme:** Portable assurance lifecycle evidence under change  
**Last reviewed:** 2026-09-10

This repository publishes canonical **machine-readable trust artifacts** for operational digital trust infrastructure. It is an implementation-oriented **Open Trust Artifact Model** for expressing authority, evidence, assurance, conformance, registry state, policy references, runtime workflow state, and bounded trust decisions in forms that can be validated by machines and reviewed by humans.

## Why this repository exists

Trust infrastructure fails when governance remains trapped in websites, PDFs, and informal operational practice. A verifier, registry, auditor, agent, or relying party needs executable artifacts that can answer:

- What claim is being made?
- Who had authority to make it?
- What scope, delegation, and revocation rules applied?
- What evidence supports the claim?
- Which assurance level and controls were checked?
- What runtime decision was made?
- What can be independently audited later?

`trust-infrastructure-schemas` provides the artifact contracts for those questions.

## TIS in the Trust Systems Modelling Stack (TSMS)

TIS is the **portable machine-readable contract layer** between TSMM canonical semantics and TGA executable governance artifacts. The current candidate baseline is **TSMM v0.24.0 / TIS v0.15.0 / TGA v0.12.1**. Unknown versions are not silently treated as compatible.

- [TSMS portable contract guide](docs/tsms.md)
- Machine-readable compatibility declaration: `model/tsms-compatibility.json`
- Validation: `npm run tsms:check`
- Governing workstream: [#7](https://github.com/qbf-consulting/trust-infrastructure-schemas/issues/7)

## TRQP Stack relationship

**TRQP Stack 2026.3 — Banyan** pins TIS `0.15.0` at exact commit `edda0e87ced40797d22e3df542099871c57fcb59` as the Stack's portable contract/schema authority. This is an external coordinated-release pin, not a TIS release event and not a transfer of assurance-composition authority into this repository.

TIS remains independently versioned. Stack 2026.3 reuses the existing `0.15.0` lifecycle/evidence contracts because they remain sufficient for the profile-aware compositional assurance capability; no synchronization-only TIS release is required.

The TRQP Assurance Hub owns the coordinated Stack release declaration, while CTS and TSPP own their executable conformance and posture evidence respectively. TIS owns the portable contracts those components consume and validate.

## What changed in v0.15.0

`v0.15.0` adds the portable assurance lifecycle event contract required to carry change-impact evidence across independently authoritative Stack components.

Major changes:

- adds `assurance/assurance-lifecycle-event.schema.json` for change detection, reassessment, invalidation, supersession, provenance, and authority-boundary evidence;
- represents material, non-material, and unknown impact without allowing unknown impact to collapse silently to current/reusable assurance;
- preserves TSMM semantic authority and component-local judgment ownership through explicit `authorityTransfer: false` bindings;
- validates negative cases for material/unknown impact and unsupported reassessment/supersession states;
- establishes cross-repository consumption evidence through TRQP-TSPP, trqp-conformance-suite, and trqp-assurance-hub;
- keeps historical assurance immutable while enabling lineage-based reassessment and supersession.

See [`docs/releases/v0.15.0.md`](docs/releases/v0.15.0.md).

## Canonical governance flow

```text
Model -> Authority Boundary -> Runtime Evidence -> Evaluation -> Decision Receipt -> Registry Entry
```

For DTG/OpenVTC/VTI workflows, the executable flow is:

```text
TSMM Runtime Governance Projection -> VTI Authority Evidence -> OpenVTC Task Evidence -> Trust Task Receipt -> Evidence Bundle -> Decision Receipt -> Registry Publication
```

For TRQP Stack lifecycle evidence, the proven flow is:

```text
TSPP materiality judgment -> TIS lifecycle contract -> CTS reassessment consequence -> Assurance Hub current-validity recomposition
```

## Artifact families

### Identity, credential, and authority artifacts

- DTG credential schemas: `credentials/dtg/v1/README.md`
- DTG compatibility profile: `docs/dtg-compatibility-profile.md`
- Agent credential schemas: `credentials/agent/v1/README.md`
- Reputation credential schemas: `credentials/reputation/v1/README.md`
- Authority boundary schema: `governance/authority-boundary.schema.json`

### Runtime profiles

- TSMM runtime governance projection profile: `docs/tsmm-runtime-governance-projection-profile.md`
- Trust Task runtime assurance profile: `docs/trust-task-runtime-assurance-profile.md`
- OpenVTC runtime profile: `docs/openvtc-runtime-profile.md`
- OpenVTC state normalization: `docs/openvtc-state-normalization.md`
- VTI runtime assurance profile: `docs/vti-runtime-assurance-profile.md`
- AIS-1 bonded agent profile: `profiles/ais1/schema.json` *(experimental)*

### Assurance and conformance artifacts

- Assurance levels: `assurance/assurance-levels.md`
- Assurance lifecycle event schema: `assurance/assurance-lifecycle-event.schema.json`
- Conformance declaration schema: `conformance/conformance-declaration.schema.json`
- Evidence bundle manifest schema: `evidence/evidence-bundle-manifest.schema.json`
- Evidence bundle integrity profile: `docs/evidence-bundle-integrity-profile.md`
- Status and revocation evidence: `docs/status-and-revocation-evidence.md`
- Decision receipt schema: `decision/decision-receipt.schema.json`

### Registry and ecosystem-state artifacts

- Registry schema: `registry/registry.schema.json`
- Registry entry schema: `registry/registry-entry.schema.json`
- Registry publication profile: `registry/registry-publication-profile.schema.json`
- Trust artifact taxonomy: `model/trust-artifact-taxonomy.json`
- Cross-repo compatibility matrix: `model/cross-repo-compatibility-matrix.json`

## Upstream implementation references

TIS tracks these repositories as operational references:

- <https://github.com/OpenVTC/dtg-credentials>
- <https://github.com/OpenVTC/openvtc>
- <https://github.com/OpenVTC/verifiable-trust-infrastructure>

The tracking method is documented in `docs/dtg-openvtc-vti-interoperability.md` and expressed in `model/cross-repo-compatibility-matrix.json`.

## Validation

Local validation requires Node.js. Candidate validation has no npm package-install dependency.

```bash
npm run candidate:check
```

The validation pipeline checks schema examples, coverage references, release documentation, authority boundaries, lifecycle invariants, semantic alignment, TSMS compatibility, and local artifact hygiene.

## Delegation lineage

Version 0.11.0 adds portable schemas for chained and fan-out delegation. Implementers can verify originating-principal continuity, scope attenuation, trust-domain transitions, branch convergence, and revocation propagation before admitting an effect. Start with [`delegation/README.md`](delegation/README.md).
