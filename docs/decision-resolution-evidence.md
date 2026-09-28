---
layout: default
title: Decision Resolution Evidence
parent: Documentation
---
# Decision Resolution Evidence

TIS serializes the minimum portable evidence needed to preserve TSMM decision-resolution semantics across independently authoritative implementations.

The contract at `decision/decision-resolution-evidence.schema.json` keeps three propositions machine-readable:

1. authority does not increase through communication, repetition, endorsement, aggregation, projection, or transformation;
2. a changed outcome retains whether its material basis was authority, evidence, policy, lifecycle, correction, or evaluation context;
3. a material unresolved condition remains unresolved until an admissible material basis change is recorded.

TIS does not decide whether a condition is morally important or whether an action should be refused. Those judgments remain with the applicable governance and runtime authorities.

## Evidence change is not authority change

A common case is a decision changing because authoritative evidence changes a factual predicate. The portable record can therefore state:

```json
{
  "primary_category": "evidence_change",
  "authority_changed": false
}
```

This is materially different from an authority grant or delegation.

## Unresolved conditions

An unresolved condition uses `primary_category: "none"` and an empty `changed_dimensions` set. Workflow progression, peer pressure, repetition, confidence, or reputation are not valid resolution categories.

## Semantic authority

The schema binds to TSMM canonical concepts and declares `authorityTransfer: false`. TIS owns serialization and validation only.

## Research provenance

The TSMM semantic investigation was informed by a read-only review of the independent **Protocol of Care for Agents** project, including:

- https://github.com/JessHines360/protocol-of-care-for-agents
- https://github.com/JessHines360/protocol-of-care-for-agents/blob/main/BRIEF.md
- https://github.com/JessHines360/protocol-of-care-for-agents/blob/main/experiments/SIMULATION_01_RUNBOOK.md

TIS does not adopt `CareSignal`, `DeliberativeHold`, or the upstream normative vocabulary. These citations record research provenance only. No upstream content is modified.
