# Changelog

## v0.15.0 - 2026-08-30

### Added
- added portable external conformance declaration/result contracts with fail-safe handling for unknown profiles, unsupported versions, missing evidence and required failures;
- added `governance/authority-at-commitment.schema.json` for exact-action authority decisions, scope, lifecycle state, approvals and deterministic action binding;
- added composite-authority lifecycle/invalidation validation and negative fixtures separating collective principals from participating controllers and historical verification from current authorization;
- added `assurance/assurance-lifecycle-event.schema.json` as the portable Stack contract for change detection, reassessment, invalidation, supersession, provenance, authority, and bounded reassessment scope;
- added machine-verifiable material, non-material, and unknown-impact handling with fail-safe lifecycle dispositions;
- added lifecycle validation and negative probes preventing material or unknown impact from silently preserving current assurance.

### Interoperability evidence
- demonstrated TSPP production of the shared lifecycle event while retaining security/privacy posture materiality authority;
- demonstrated CTS consumption for bounded-versus-full conformance reassessment without reclassifying upstream materiality;
- demonstrated Assurance Hub recomposition of current assurance validity without rewriting historical outcomes or stealing upstream semantic authority.

### Governance
- preserved the distinction between identity/signature and current action-specific authority;
- preserved fail-safe behavior when authority evidence is missing, stale or indeterminate;
- preserved TSMM canonical semantic authority and explicit `authorityTransfer: false` bindings;
- promoted the lifecycle event into the TSMS golden-path contract set only after cross-repository consumption succeeded;
- recorded that v0.15.0 is additive and evidence-driven rather than a synchronization-only release.

## v0.14.1 - 2026-08-20

### Fixed
- repaired GitHub Pages link generation and publication-surface validation;
- removed raw repository Markdown from the deployed Pages artifact;
- removed the npm package-install dependency from candidate validation.

### Governance
- established TIS Core admission criteria and separated normative core contracts from ecosystem adapters and repository assurance evidence.


## [v0.14.0] - 2026-08-20

### Changed
- Align the DTG Witness Credential overlay with the merged DTG credential specification: `taskContext` and a JCS/SHA-256 VRC `digest` now provide exchange and exact-edge binding.
- Refresh DTG upstream compatibility tracking across credential, Trust Task, ZKP, and implementation repositories.
- Reduce npm validation dependencies to Ajv only, move CI to Node 22 LTS, disable lifecycle scripts, prefer the npm cache, and bound registry retry delays.

### Documentation and publication
- Add a complete schema catalog and a dated DTG upstream review to GitHub Pages.
- Add generated-site completeness validation so every `docs/**/*.md` source must produce an HTML page before deployment.

### Assurance
- Treat unmerged VDC and proof-of-liveness work as tracked drift rather than silently promoting proposal semantics into TIS.


## [v0.13.0] - 2026-08-20

### Added
- Stable TSMM semantic traceability using `urn:tsmm:concept:*` identifiers.
- Machine-readable TSMM semantic coverage and schema-level `x-tsmm-semantic-binding` metadata.
- Portable portfolio relationship, repository authority, adoption path, and validation-result schemas.
- Repository-local portfolio relationship and TSMM compatibility contracts.
- CI checks for semantic alignment, authority transfer violations, mapped artifact existence, and version drift.
- Task-oriented GitHub Pages navigation across Artifact Contracts, Semantic Alignment, Assurance & Validation, Integration & Adoption, Governance & Lifecycle, and Releases.
- Executable GitHub Pages information-architecture validation through `tools/validate-pages-ia.js`.


### CI and publication
- Remove the unused npm Mermaid package; Mermaid validation remains Python-based.
- Reduce the npm lockfile dependency surface from 168 package entries to 28.
- Run `npm ci --no-audit --no-fund` with an explicit lockfile cache key.
- Expand `candidate:check` to include governance, portfolio relationships, semantic alignment, version consistency, documentation, Pages IA, Mermaid validation, and candidate evidence generation.

### Governance
- Preserve TSMM authority over canonical semantics, TIS authority over portable schema contracts, and portfolio-repository authority over classification.

## Unreleased

- Establish flagship authority, adoption, assurance, interoperability, validation-evidence, and GitHub Pages controls without changing the repository version.


All notable changes to this repository are documented here.

## [v0.10.0] - 2026-06-26

### Added

- Added TSMM runtime governance projection schema and validated example.
- Added Trust Task reference, manifest-reference, lifecycle-event, and execution-receipt schemas.
- Added OpenVTC state-normalization and task-evidence schemas.
- Added VTI status-list reference schema for revocation, suspension, expiry, and activation evidence.
- Added registry publication profile with assurance-level publication evidence requirements.
- Added evidence bundle integrity metadata for canonicalization, bundle digest, detached proof, and signature references.
- Added TSMM runtime governance crosswalks and v0.10.0 cross-repo runtime assurance example pack.

### Changed

- Updated VTI ACL and authorization credential profiles to align with implementation roles, capability vocabulary, allowed contexts, consumer kind, lifecycle state, step-up metadata, and TSMM authority/effect references.
- Separated Trust Task lifecycle state from decision outcome and effect admission.
- Updated cross-repo compatibility tracking to include TSMM as the semantic governance layer and TIS as the executable artifact contract layer.
- Updated release metadata, documentation navigation, taxonomy, and validation coverage for v0.10.0.

### Fixed

- Removed `.DS_Store` local artifact that caused repository hygiene lint failure.
- Added validation coverage for all new runtime assurance schemas and examples.

## [v0.9.0] - 2026-05-06

### Added

- Added DTG VC envelope compatibility profile and DTG credential subject profile aligned to `OpenVTC/dtg-credentials`.
- Added DTG personhood membership and relationship-card overlay schemas with validated examples.
- Added OpenVTC runtime schemas for relationship state, VRC issuance receipts, configuration evidence, DIDComm routing evidence, and top-level runtime profile evidence.
- Added VTI runtime assurance schemas for VTA contexts, ACL entries, VTA authorization credentials, sealed transfer envelopes, DID template references, TEE attestation references, and provision-integration receipts.
- Added `model/cross-repo-compatibility-matrix.json` and schema to track upstream references, mappings, assurance implications, and drift-review triggers.
- Added cross-repo examples connecting DTG, OpenVTC, VTI, evidence bundles, and TIS decision receipts.

### Changed

- Refreshed README, documentation index, upstream reference documentation, and validation coverage for v0.9.0.
- Expanded validation tooling to include all new compatibility profile examples.
- Repositioned DTG schemas as both wire-compatibility profiles and stronger TIS semantic governance overlays.

### Fixed

- Cleaned stale current-release references across active documentation.
- Added explicit drift-review guidance for DTG, OpenVTC, and VTI upstream changes.

## [v0.7.0] - 2026-05-05

### Added

- Added `decision/decision-receipt.schema.json` as a first-class trust decision receipt artifact.
- Added `decision/examples/decision-receipt.example.json` and decision receipt documentation.
- Added `evidence/evidence-bundle-manifest.schema.json` for runnable evidence bundle composition examples.
- Added `registry/registry-entry.schema.json` for validating single registry entries used in composition packs.
- Added `validation/artifact-coverage.json` and `validation/artifact-coverage.schema.json` as machine-readable validation coverage evidence.
- Added `docs/decision-receipts.md` and `docs/validation-coverage.md`.
- Added `package.json` with local validation scripts.
- Added `.gitignore` for local artifact hygiene.

### Changed

- Expanded `governance/authority-boundary.schema.json` with structured authority type, authority ID, delegation chain, revocation metadata, scope constraints, relying-party constraints, and evidence references.
- Updated artifact reference role vocabulary to include `decision` and `receipt` roles.
- Updated conformance declaration scope handling so composition examples can reference profiles, policies, and decision artifacts in addition to credential schemas.
- Updated composition examples to show the full declaration → evidence → evaluation → decision → registry flow.
- Updated `registry/sample-registry.json` to include decision receipt references.
- Updated `model/trust-artifact-taxonomy.json` for v0.7.0 artifact families and validation coverage.
- Refreshed README, documentation index, architecture, trust model, trust assumptions, artifact taxonomy, roadmap, and cross-repo governance documents.
- Expanded `tools/validate-conformance.js` and GitHub Actions validation across all major artifact families.
- Expanded `tools/lint-schemas.js` to check release documentation, schema namespace hygiene, coverage references, and local-only artifacts.

### Fixed

- Removed stale local `.DS_Store` artifact.
- Backfilled missing `docs/releases/v0.6.0.md` release documentation.
- Cleaned release traceability by aligning `VERSION`, README, docs, taxonomy, and release notes around `v0.7.0`.

## [v0.6.0] - 2026-04-07

### Added

- Introduced OASF publication profile and evaluation envelope schemas.
- Added OASF control crosswalk artifacts.
- Added ODRL policy reference schema and sample.
- Added AIS-1 experimental profile materials.
- Added reusable artifact-reference and authority-boundary contracts.
- Added cross-repo composition examples connecting baseline declarations, evidence, evaluation, and registry publication.

### Changed

- Repositioned the repository as an Open Trust Artifact Model rather than a loose schema catalog.
- Expanded registry examples to support OASF-aware and ODRL-aware references.

## [v0.5.0] - 2026-03-25

### Added
- Added cross-repo governance and composition documentation.
- Added expanded schema governance and identifier guidance.

## [v0.4.0] - 2026-03-10

### Added
- Added assurance-level and control mapping materials.

## [v0.3.0] - 2026-02-20

### Added
- Added conformance declaration schema and implementer declaration template.

## [v0.2.1] - 2026-02-01

### Changed
- Refined schema documentation and example validation practices.

## v0.11.0 - 2026-07-14

- Added delegation-lineage and delegation-lineage-verification schemas.
- Added linear, fan-out, and negative scope-expansion examples.
- Added implementer guidance and authority-boundary integration notes.
- Preserved backward compatibility for existing schema consumers.

## Unreleased

### Fixed

- Added a canonical root `index.md` so the Just The Docs build generates `_site/index.html`.
- Improved the Pages post-build checks to report missing home-page, Mermaid-loader, and title conditions independently.
- Updated the documentation landing page to identify v0.12.0 Candidate status.
