---
layout: default
title: Trust Infrastructure Schemas
nav_order: 1
has_children: false
permalink: /
---

# Trust Infrastructure Schemas

Trust Infrastructure Schemas (TIS) publishes portable, machine-readable contracts for authority, delegation, evidence, decisions, registries, conformance, and assurance.

**Status:** Candidate specification  
**Current release:** `v0.16.0`  
**Lifecycle:** Active  
**Operational status:** Active validation

## Navigate by task

- **Implement:** [Adoption]({% link docs/adoption.md %}) → [Architecture]({% link docs/architecture.md %}) → [Artifact Contracts]({% link docs/artifact-contracts.md %})
- **Trace meaning:** [Semantic Alignment]({% link docs/semantic-alignment.md %}) → [TSMM Semantic Coverage]({% link docs/tsmm-semantic-coverage.md %})
- **Validate:** [Assurance & Validation]({% link docs/assurance-validation.md %}) → [Candidate Readiness]({% link docs/candidate-readiness.md %})
- **Integrate:** [Integration & Adoption]({% link docs/integration-adoption.md %}) → [Interoperability]({% link docs/interoperability.md %})
- **Govern:** [Governance & Lifecycle]({% link docs/governance-lifecycle.md %}) → [Portfolio Relationship Contract]({% link docs/portfolio-relationship-contract.md %})
- **Release history:** [v0.16.0 release notes]({% link docs/releases/v0.16.0.md %})

The complete task-oriented documentation map is available from the [Documentation home]({% link docs/index.md %}).

## Authority boundary

TIS owns portable schema design, identifiers, serialization contracts, validation rules, and repository releases. It does not own the canonical semantic definitions maintained by the Trust Systems Meta Model, nor does it assert certification or independent assurance.

## First validation result

```bash
npm ci --no-audit --no-fund
npm run candidate:check
```

The Candidate evidence report is written to:

```text
artifacts/candidate/candidate-readiness.json
```
