---
title: Composite Authority Contract Pressure Test
parent: Integration & Adoption
grand_parent: Documentation
nav_order: 16
---

# Composite Authority Contract Pressure Test

## Result

The current TIS v0.15.0 contracts split the collective-authority problem into two
different outcomes.

1. The existing `authority-at-commitment` contract **cannot carry first-class
   collective membership, threshold-rule, and per-controller exact-action
   evidence**. This is deliberate proof of a portable-contract gap, not a reason
   to smuggle those fields through generic metadata.
2. The existing `assurance-lifecycle-event` contract **can already carry the
   lifecycle consequence** of a material membership or authority-rule change:
   previous evidence is retained, the change is classified as material, and
   current reuse moves to `reassessment_required`.

The pressure test therefore avoids modifying the v0.15.0 schema surface. A new
or extended portable collective-authority evidence contract should be considered
only after the TSMM semantic disposition and cross-implementation evidence are
accepted.

## Executable evidence

Run:

```bash
npm run composite-authority:check
```

The check proves both sides of the boundary: the unsupported detail is rejected
by the existing authority contract, while material authority-change evidence is
accepted by the lifecycle contract.

## Authority boundary

TSMM remains authoritative for the semantics of collective authority and
material authority change. TIS owns only the portable schema/serialization
decision. TGA may prototype executable compositions without making those
prototypes canonical contracts.
