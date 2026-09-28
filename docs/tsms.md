---
title: TSMS portable contract layer
parent: Integration & Adoption
grand_parent: Documentation
---
# TIS in the Trust Systems Modelling Stack (TSMS)

TIS is the **portable machine-readable contract layer** of TSMS.

```text
TSMM canonical semantics
        ↓
TIS portable contracts
        ↓
TGA executable governance artifacts
```

## Authority boundary

TIS owns portable contracts, identifiers, serialization and their validation rules. It does not own canonical TSMM semantics, TGA executable compositions, principal authority, or external certification.

A need discovered downstream does not permit TIS to redefine a TSMM concept. Semantic gaps must be raised to TSMM. Likewise, executable-composition gaps remain TGA concerns.

## Accepted stack baseline versus current TIS release

The immutable accepted stack release is **`tsms-stack-2026.2 — Alphonso mango`**:

- TSMM `v0.25.0` — commit `a673971d7a3e10cff5ceb679738de4ce5bce6857`
- TIS `v0.15.0` — commit `e4fbe60e6810f108b593c76ac2b970093a59a5e1`
- TGA `v0.13.0` — commit `457fc18a4be90f439d64f96c5a4d6c8cce237404`

TIS `v0.16.0` is a newer independently governed component release. It adds portable decision-resolution evidence bound to TSMM `v0.26.0` semantics. It does **not** automatically supersede the accepted 2026.2 TIS pin; coordinated compatibility requires a separately governed TSMS renewal.

Complete-stack adopters should use the canonical QBF-hosted TSMS documentation:

https://qbf-consulting.github.io/trust-systems-meta-model/tsms-adopter-guide.html

The machine-readable TIS declaration is `model/tsms-compatibility.json`.

Run:

```bash
npm run tsms:check
```

## Portable contracts relevant to current and successor stack evaluation

TIS v0.16.0 carries the accepted v0.15.0 contract families plus the newer decision-resolution evidence surface used for subsequent stack evaluation:

- `governance/authority-boundary.schema.json`;
- `governance/authority-at-commitment.schema.json`;
- `evidence/evidence-bundle-manifest.schema.json`;
- `decision/decision-receipt.schema.json`;
- `decision/decision-resolution-evidence.schema.json`;
- `assurance/assurance-lifecycle-event.schema.json`;
- external conformance declaration/result contracts.

The contracts preserve these invariants:

- identity or a valid signature does not establish authority for an exact material commitment;
- scope, expiry, revocation, approvals and evaluation time remain decision inputs;
- collective-authority membership/threshold/rule freshness is representable;
- stale collective-authority evidence can be invalidated or superseded without destroying historical verification;
- unknown or missing required evidence cannot silently become PASS;
- a changed decision remains attributable to authority, evidence, policy, lifecycle, correction, or evaluation-context change;
- workflow progression, peer pressure, repetition, or reputation do not silently resolve a material unresolved condition.

## Fail-safe compatibility

Only an explicitly accepted stack receipt receives accepted compatibility. An unknown TSMM, TIS, or TGA state must not silently inherit compatibility. Cross-repository drift can withdraw stack-level compatibility even when local TIS validation remains green.

## Evidence and non-claims

A passing TIS candidate gate means this repository's contracts, fixtures, semantic bindings and authority boundaries are internally coherent. It does **not** establish external certification, prove a remote repository is unchanged, authorize TIS to redefine TSMM semantics or TGA compositions, or create a successor TSMS baseline.

The successor stack baseline is accepted only through the TSMM-coordinated release gate and immutable receipt lifecycle.
