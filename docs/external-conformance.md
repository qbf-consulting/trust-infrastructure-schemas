---
title: External Conformance Contracts
parent: Assurance & Validation
grand_parent: Documentation
---

# External conformance contracts

TIS provides portable contracts for expressing a bounded TSMM conformance claim. These contracts serialize claims and results; they do not define canonical trust semantics and do not make TIS a certification authority.

## Contracts

- `conformance/external-conformance-profile-declaration.schema.json` — an adopter declares which TSMM profile it is evaluating and supplies evidence references for each requirement.
- `conformance/external-conformance-result.schema.json` — a validator records the disposition of the declared requirements.

## Dispositions

- `PASS` requires every required profile requirement to pass with evidence.
- `PARTIAL` is permitted only when every required requirement passes and one or more optional requirements are unsupported or unevidenced, while all required requirements pass.
- `FAIL` is required when any required requirement fails or is explicitly unsupported.
- `INDETERMINATE` is required when evidence needed to evaluate a required requirement is missing or unavailable.

`PARTIAL`, `FAIL`, and `INDETERMINATE` are distinct states and MUST NOT be promoted to `PASS`.

## Authority boundary

TSMM remains authoritative for semantic requirement identifiers and meanings. TIS validates portable representation only. An external adopter remains responsible for the truth of its implementation claim and the provenance of evidence it references.

## Compatibility

Consumers MUST treat unknown profile identifiers or unsupported profile versions as non-success. A future profile version is not presumed backward compatible merely because its JSON shape validates.

## First adopter

The first pressure-test adopter is ARPA. ARPA's declaration is intentionally maintained in the ARPA repository so this programme proves that the contracts can be consumed outside the TSMS repositories.
