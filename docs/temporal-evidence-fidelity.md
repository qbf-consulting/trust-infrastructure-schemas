---
title: Temporal Evidence Fidelity Assessment
parent: Semantic Alignment
grand_parent: Documentation
owner: maintainers
last_reviewed: 2026-11-13
applicable_version: v0.16.0
tier: 1
---

# Temporal Evidence Fidelity Assessment

## Decision for issue #32

**Assessment only, no schema expansion or release.** The [TSMM-owned temporal composition assessment](https://github.com/qbf-consulting/trust-systems-meta-model/issues/68) identifies source competence, qualified recording cutoffs, historical coverage, policy-version compatibility and original as-known-at evidence as material to an affirmative composite trust decision. TIS can reference evidence for such a determination but its current general-purpose contracts do not independently establish these properties. No demonstrated independent consumer requirement yet justifies a new versioned temporal payload. This is a **known semantic fidelity boundary**, not a claim that every temporal decision can be safely reconstructed from current TIS fields.

## Contract inventory and mapping

| Temporal role or dependency | Existing portable surface | Fidelity | Consequence |
| --- | --- | --- | --- |
| Effective applicability time | Authority-at-commitment `evaluation.requested_historical_time`, `evaluated_at`; decision receipt `timestamps.decided_at` | Partial | These times identify evaluation or decision context, not a general authoritative effective interval for each input. |
| Authoritative source recording time and cutoff | Evidence URI/digest references in authority-at-commitment, decision-resolution evidence, evidence bundle | Lossy without a governed referenced artifact | No existing required first-class field authenticates source recording or establishes a query cutoff; `observed_at` explicitly does **not** do so. |
| Client observation | Decision-resolution `observed_at`; authority-at-commitment evidence `observed_at` | Representable | Observation is not recording, publication, knowledge, or permission to rely. |
| Reconstruction time | Authority-at-commitment `evaluation.reconstructed_at` | Representable in that contract | It does not determine what evidence was in the authoritative record at a requested cutoff. |
| Original decision time and receipt | Decision receipt `receipt_id`, `timestamps.decided_at`, `policy_reference`, `evaluated_artifacts`, `result`; transition `previous_decision_ref` / `current_decision_ref` | Representable when the original receipt survives | A later assessment must be a new record and may not rewrite what the original receipt claimed. Receipt existence does not prove decision correctness. |
| Policy identity/version | Authority-at-commitment `policy.id`, `policy.version`; decision receipt policy URI/digest | Partial | Exact input-specific policy-version compatibility and governing version-selection rule are not validated generically. |
| Competent source / chain provenance | Authority boundary, mandate digest and evidence refs; decision-resolution `provenance.producer` and `source_event_ref` | Partial | Producer identity or an evidence reference cannot independently prove source competence. |
| Source-history coverage, correction and contradictions | Evidence-bundle `artifacts[].uri` / `sha256`; decision-resolution `transition_basis` including `correction` | Lossy without governed referenced evidence | A reference can identify a source-history proof or correction record, but neither completeness nor absence-of-conflict is generally enforced by these schemas. |
| Composition-context compatibility | Authority-at-commitment `decision.outcome`, `constraints[]`; receipt `result.status` | Unsupported as an intrinsic general-purpose guarantee | Existing outcome fields do not independently demonstrate that all temporal inputs used comparable cutoffs or policy. |
| Revocation enforcement and notice | Authority-at-commitment `authority_state`; optional evidence references and receipt status | Partial | Historical effective status, actual notice, and operational enforcement convergence are not interchangeable. |

Relevant contracts: `decision/decision-resolution-evidence.schema.json`, `decision/decision-receipt.schema.json`, `governance/authority-at-commitment.schema.json`, `evidence/evidence-bundle-manifest.schema.json`. Existing decision-resolution and composite-authority validators cover their stated structural and semantic properties, not authenticated temporal-history completeness. No competing temporal-event model is introduced here.

## Conditional portability rule

A recipient requesting **critical as-known-at semantics** must be able to establish the effective time, authoritative source and recording cutoff, source-competence evidence, qualified source-history coverage, policy version and compatibility decision from a governed, interpretable evidence contract. Existing artifact references are sufficient **only if** the consumer can retrieve and validate an appropriate authoritative profile and knows that temporal interpretation is mandatory. If a reference is unavailable, its semantics are unknown, or the profile/cutoff cannot be verified, the temporal trust determination is **indeterminate** or rejected according to governing policy; it must not fall back to an effective-time-only or current-state `passed`/`permit` result. This is a semantic consumer obligation, **not** a guarantee currently enforced by generic TIS JSON Schema validation.

A URI or digest can preserve a binding to external evidence but cannot prove that a complete competent source history was recorded by a cutoff. The existing `observed_at` is an observation timestamp. A receiver MUST NOT relabel or infer it as authoritative recording. Portable receipts support an original as-decided record, but do not prove contemporaneous observation, valid reliance, or enforcement of a revocation. Later reconstruction must be separately attributable.

## Future versioned profile trigger

Only when a real consumer path demonstrates that a governed referenced profile cannot preserve or safely require essential semantics should TIS evaluate the smallest **opt-in and versioned** temporal-context companion. Such a proposal would require: TSMM-approved composition semantics; an explicit criticality/unsupported-context failure contract; competent source identity and historical coverage evidence; policy/cutoff compatibility rules; valid and invalid examples through a consuming validator; wire, semantic and evidence-compatibility analysis; migration and downgrade treatment; and tests where missing provenance, contradictory histories, mismatched cutoffs and unknown critical profiles cannot yield an affirmative outcome. No proposed field name from TRQP or ARPA becomes binding merely by analogy.

## Assurance and publication boundary

No existing required fields, schema IDs, schema catalogue entries, crosswalk mappings or version declarations are changed. The consumer path remains *unverified for critical cross-system historical decisions*; the structural schema-valid path alone would be insufficient evidence. The current contracts can carry externally qualified supporting artifacts, so introducing a speculative mandatory schema would increase interoperability obligations without proving adoption value.

TSMM owns composition semantics; TIS owns portable representation; GAAM provides informative research; TRQP and ARPA remain independent protocol authorities. External historical-source authentication, cross-implementation comparison, source-history retention/availability, clock precision, privacy-preserving source correlation and legal effect of retrospective corrections remain open implementation and governance questions. **Release decision: commit-only.**
