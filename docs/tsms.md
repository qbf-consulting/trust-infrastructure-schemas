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

The immutable accepted stack release remains **`tsms-stack-2026.1 — Cashew-Nut`**:

- TSMM `v0.24.0` — commit `2867010121e8a61971184d8fe7d3306b985e5884`
- TIS `v0.14.1` — commit `d25539932181e6d883f5bec261daaf011f740059`
- TGA `v0.12.1` — commit `f0bdc309a691a7be8dca3b48fed8ac1555219bec`

TIS `v0.15.0` is a newer independently governed component release. It adds lifecycle, conformance, authority-at-commitment, and composite-authority contract capabilities and is an input to the separately governed TSMS 2026.2 renewal. It does **not** automatically supersede the 2026.1 accepted TIS pin.

Complete-stack adopters should use the canonical QBF-hosted TSMS documentation:

https://qbf-consulting.github.io/trust-systems-meta-model/tsms-adopter-guide.html

The machine-readable TIS declaration is `model/tsms-compatibility.json`.

Run:

```bash
npm run tsms:check
```

## Portable contracts relevant to the successor stack

TIS v0.15.0 carries the portable surfaces now exercised across the post-2026.1 stack:

- `governance/authority-boundary.schema.json`;
- `governance/authority-at-commitment.schema.json`;
- `evidence/evidence-bundle-manifest.schema.json`;
- `decision/decision-receipt.schema.json`;
- `assurance/assurance-lifecycle-event.schema.json`;
- external conformance declaration/result contracts.

The contracts preserve these invariants:

- identity or a valid signature does not establish authority for an exact material commitment;
- scope, expiry, revocation, approvals and evaluation time remain decision inputs;
- collective-authority membership/threshold/rule freshness is representable;
- stale collective-authority evidence can be invalidated or superseded without destroying historical verification;
- unknown or missing required evidence cannot silently become PASS.

## Fail-safe compatibility

Only an explicitly accepted stack receipt receives accepted compatibility. An unknown TSMM, TIS, or TGA state must not silently inherit compatibility. Cross-repository drift can withdraw stack-level compatibility even when local TIS validation remains green.

## Evidence and non-claims

A passing TIS candidate gate means this repository's contracts, fixtures, semantic bindings and authority boundaries are internally coherent. It does **not** establish external certification, prove a remote repository is unchanged, authorize TIS to redefine TSMM semantics or TGA compositions, or create a successor TSMS baseline.

The successor stack baseline is accepted only through the TSMM-coordinated release gate and immutable receipt lifecycle.
