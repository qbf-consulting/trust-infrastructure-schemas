# Security policy

## Supported versions

Security fixes are supported for the current released `v0.15.x` line. Older schema releases remain available for reproducibility and compatibility analysis but should not be assumed to receive security fixes unless a release note explicitly states otherwise.

Because TIS artifacts are portable contracts, a security-relevant schema or validator fix does not silently rewrite historical evidence. Downstream consumers must evaluate whether prior evidence becomes stale, invalid, or requires reassessment under their own authority.

## Reporting

Report schema bypasses, validator defects, unsafe defaults, misleading assurance claims, identifier collisions, or dependency vulnerabilities through GitHub private vulnerability reporting where available. If private vulnerability reporting is unavailable, contact the maintainer at `sankarshan@qbfconsulting.digital`. Do not open a public issue containing exploit details.

Include reproduction steps, affected artifact identifiers and versions, impact, and proposed containment where known.

## Scope and authority

TIS is authoritative for portable schema and contract definitions, identifiers, compatibility declarations, and validation behavior in this repository. QBF Consulting LLP is the current project steward. TIS does not own downstream runtime policy, implementation-specific trust decisions, coordinated Stack assurance conclusions, or upstream Archetech provenance.

A report that reveals ambiguity in upstream canonical semantics should be escalated to the semantic authority rather than repaired by silently inventing new TIS meaning.
