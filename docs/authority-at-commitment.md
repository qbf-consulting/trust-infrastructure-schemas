# Authority at Commitment Contract

## Purpose

`governance/authority-at-commitment.schema.json` is the portable TIS contract for an action-specific authority decision at a material commitment boundary. It carries enough structured evidence to distinguish actor identity from current authority for the exact action.

TIS owns this wire-neutral contract. TSMM remains authoritative for canonical semantics; GAAM supplies governance framing; protocol and application owners remain authoritative for their own authorization and execution rules.

## Required semantics

A record binds:

- principal and actor;
- mandate reference and digest;
- exact action identifier and canonical digest;
- evaluation time and policy version;
- current authority state;
- each material constraint result;
- approval requirements and exact-action approval binding;
- decision outcome and stable reason codes; and
- evidence/provenance references.

`permit` is structurally compatible only with `authority_state: active` and without failed/indeterminate constraints. When `approval.required: true`, approval evidence and an action digest are required.

## Cross-field conformance rules

JSON Schema validates the shape and several safety conditions. Implementations MUST additionally enforce these semantic comparisons:

1. `approval.action_digest == action.digest` when approval is required.
2. `approval.valid_until`, if present, is later than or equal to the material evaluation time.
3. mandate/status/revocation evidence is fresh enough for the governing policy.
4. the exact action executed or accepted is byte/canonicalization-equivalent to the action represented by `action.digest`.
5. historical reconstruction keeps requested historical time distinct from reconstruction time.

These are executable-policy obligations rather than assertions that JSON Schema can safely infer.

## Outcomes

- `permit`: required authority propositions are positively established.
- `deny`: a material authority or constraint proposition is false.
- `indeterminate`: a material proposition cannot currently be established.

Missing evidence is never an implicit `permit`.

## Privacy

Evidence references SHOULD expose only what the relying purpose needs. The contract is compatible with selective disclosure or proof-based evidence; a digest is an integrity binding, not proof of provenance or authority.

## Validation fixtures

- `examples/authority-at-commitment.valid.json` demonstrates an in-scope current commitment.
- `examples/authority-at-commitment.invalid-permit-revoked.json` deliberately attempts to pair `permit` with revoked authority and MUST fail schema validation.

The repository-wide `npm run candidate:check` remains the completion gate.
