# Skill Adoption Matrix — Operational Phase Alignment

When to activate which Claude Code skills, and why order matters.

---

## The Core Principle

```
observe → reconcile → validate → arm → execute
```

Adopt skills that reinforce this sequence. Defer everything else until the system is stable.

---

## Phase 1 — Stabilize (Install Now)

These skills directly improve reliability, auditability, or recovery. Activate before anything else.

| Skill | Why |
|-------|-----|
| `systematic-debugging` | Forces root-cause analysis before fixes — matches reconciliation-first architecture |
| `verification-before-completion` | Confirms behavior before marking work done — matches audit-before-arm doctrine |
| `writing-plans` | Prevents impulsive architectural drift — no code without an approved plan |
| `test-driven-development` | Invariant enforcement — tests define expected behavior before implementation |
| `using-git-worktrees` | Isolates experiments from live branch — safest way to test risky changes |
| `writing-skills` | Converts operating doctrine into reusable behaviors Claude can apply consistently |

---

## Phase 2 — Harden (Activate After Core Is Stable)

Infrastructure skills that improve production resilience. Add after Phase 1 is running cleanly.

| Skill | Focus |
|-------|-------|
| Webhook hardening | Idempotency, replay protection, retry logic, stale-signal rejection, signature verification |
| Error monitoring (Sentry) | Capture mediator failures, reconciliation failures, invariant violations — not everything |
| Runtime invariant checker | Make impossible states impossible, not just detectable |
| Node.js best practices | Compounds over time — async safety, error handling, observability patterns |

**Constraint on error monitoring:** Log only actionable failures. Noise entropy defeats the purpose.

---

## Phase 3 — Scale (Post-Validation Only)

Business-enabling skills. None of these improve forward-test quality or operational reliability. Do not touch until the system has proven stability.

- MCP server integrations — broker-native execution, external APIs
- Database scaling — cloud sync, secondary storage
- Client-facing layers — dashboards, portals, reporting
- Infrastructure scaling — CDN, workers, failover nodes
- Business layer — marketing, payments, CRM

---

## Skill Design Rule

Build **few, strong, canonical skills** — not sprawl.

Recommended first custom skills for any governance deployment:
- `reconciliation-audit` — verify system state is clean before execution
- `runtime-governance` — enforce state machine transitions
- `invariant-checker` — validate impossible states before they happen
- `forward-test-review` — structured review of live system behavior

---

## Most Common Mistake

Building consulting infrastructure or feature capabilities before proving operational consistency.

If your system can't survive a cold restart and reconcile cleanly, no amount of new features changes that. Stability gates everything else.
