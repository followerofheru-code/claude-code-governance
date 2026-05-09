# [PROJECT NAME] — Claude Code Governance

## MANDATORY SESSION START

- [ ] Read `governance/system-state.md` — confirm current operational state
- [ ] Check `governance/runtime-contract.md` — review what is and isn't allowed
- [ ] Verify system is in a SAFE state before making any changes
- [ ] Do not execute anything until state is confirmed

---

## Core Rules (Always Active)

1. **95% Confidence Rule** — Ask follow-up questions before making changes. No guessing.
2. **No code without approved plan** — Brainstorm → Plan → Review → Execute.
3. **Never automate unvalidated logic.**
4. **If active state conflicts with operational rules, the rules win.**
5. **If local system and external service state diverge, stop and reconcile before executing.**

---

## System State (update each session)

<!-- Customize this section for your domain -->

| Field | Value |
|-------|-------|
| Current state | [BOOTING / RECONCILING / ARMED / DISARMED / ERROR] |
| Last known good | [date + description] |
| Active incidents | [none / description] |

---

## State Machine

| State | Meaning | Claude may execute? |
|-------|---------|---------------------|
| BOOTING | System initializing | No |
| RECONCILING | Verifying state consistency | No |
| ARMED | Healthy, validated, ready | Yes |
| DISARMED | Manually halted | No |
| ERROR | Anomaly detected | No — investigate first |

**Transition rule:** Claude must verify state is ARMED before any execution. If state is unknown, treat as ERROR.

---

## Protected Assets

<!-- List files/dirs/services Claude must never touch without explicit approval -->

**Protected files (never modify without explicit instruction):**
- `[list your critical config files here]`
- `[list your secret/credential files here]`

**Protected services (never call automatically):**
- `[list external APIs with real-world consequences]`

**Protected operations (require explicit approval every time):**
- Schema migrations
- Deleting records
- Modifying authentication logic
- Pushing to production

---

## Execution Workflow

1. Analyze the task → state your plan clearly
2. Wait for explicit approval before executing
3. Execute in the smallest safe increments
4. Validate output before marking complete
5. Log what changed and why

---

## Failure Protocol

If something breaks or behaves unexpectedly:
1. Stop immediately — do not attempt to fix by continuing
2. Report what happened and what state the system is in
3. Wait for explicit instruction before proceeding
4. Do not attempt rollback without explicit approval

**No silent failures.** If something is wrong, say so.

---

## Audit

All significant changes should be logged in `governance/audit-log.md` with:
- What changed
- Why it changed
- What state the system was in before and after
- Who approved the change

---

## Reference

- `governance/runtime-contract.md` — full behavioral boundaries
- `governance/state-machine.md` — state transition rules
- `governance/failure-doctrine.md` — recovery procedures
- `governance/audit-log.md` — change history
