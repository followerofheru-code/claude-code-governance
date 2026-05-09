# Changelog

All notable changes to the Claude Code Governance Framework are documented here.

---

## [0.1.0] — 2026-05-09

### Initial release — Beta

**Added**
- `README.md` — Full pitch deck: problem, solution, what gets installed, pricing, structure
- `templates/CLAUDE.md` — Drop-in governance CLAUDE.md with state machine, protected assets, session hygiene, failure protocol, and audit section
- `templates/governance/state-machine.md` — BOOTING→RECONCILING→ARMED→DISARMED→ERROR spec with transition table
- `templates/governance/runtime-contract.md` — Behavioral boundaries: what Claude may/must/must not do; protected files and operations
- `templates/governance/failure-doctrine.md` — Severity levels (INFO/DEGRADED/CRITICAL/CATASTROPHIC), recovery sequences, no-silent-failure rule
- `templates/governance/watchdog-spec.md` — Invariant monitoring checklist: health checks, state checks, drift detection, alert thresholds
- `templates/mediator/execution-mediator.js` — Working JS scaffold: ArmedStateGuard, CriticalFileGuard, PlanApprovalGuard, DbConnectionGuard; configurable factory; append-only JSONL audit log; SHA256 state hashing; atomic rollback
- `docs/onboarding-guide.md` — Half-day (3–4 hr) session process: system review → installation → customization → handoff; pre-session client prep checklist; pricing reference
- `docs/onboarding-questionnaire.md` — 22 questions across system identity, state machine, protected assets, external integrations, failure modes, and handoff
- `docs/skill-adoption-matrix.md` — Phase-aligned skill activation guide: observer→reconcile→validate→arm→execute doctrine
- `docs/execution-mediator-spec.md` — Full mediator architecture: guard modules, audit log format, CLAUDE.md integration, git hook wiring, 4-phase implementation sequence
- `docs/pitch-deck.md` — Structured sales document: problem, solution, components, use cases, pricing, engagement model
- `examples/trading-system/governance-summary.md` — Sanitized reference case: live automated futures trading system (Judge-Bey), architecture grades, guard status, lessons learned
- `LICENSE` — MIT
- `package.json` — Node ≥18, main entry points to mediator scaffold
- `.gitignore` — Excludes `system_state.json`, `audit-log.jsonl`, `*_config.json`, `.env`

**Notes**
- Beta availability: custom partnerships, no standard pricing enforced yet
- Reference implementation: live automated futures trading system (sanitized in examples/)
- `RiskLogicGuard` referenced in spec is domain-specific — not included in base factory; implement per client
