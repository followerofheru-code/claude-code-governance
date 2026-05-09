# Failure Doctrine

Defines system behavior under stress. No improvisation. No silent failures.

---

## Severity Levels

| Level | Definition | Response |
|-------|------------|----------|
| **DEGRADED** | One component failing, system still operational | Alert operator, log, continue with reduced capability |
| **CRITICAL** | Core function impaired or data integrity at risk | Halt execution, alert operator, enter ERROR state |
| **CATASTROPHIC** | Data loss, external system corruption, or unrecoverable state | Halt everything, alert immediately, do not attempt auto-recovery |

---

## Response Sequence (any failure)

1. **Stop** — do not continue executing the current task
2. **Assess** — determine severity level
3. **Log** — record what happened, what state the system is in, what was in progress
4. **Alert** — notify operator with severity and current state
5. **Wait** — do not proceed until operator confirms recovery path

**Never attempt recovery without explicit operator approval.**

---

## No Silent Failure Rule

If something breaks and you don't report it, the system is worse than if it had crashed visibly. Every failure must produce a log entry. Every critical failure must produce an alert.

Silent failure modes to watch for:
- Async operations that reject without surfacing the error
- State that appears valid but is stale
- External calls that time out silently
- Guards that fail open instead of fail closed

---

## Safe Recovery Sequence

When recovering from ERROR state:

1. Operator reviews audit log — understand what failed and why
2. Verify external system state (does broker/DB/API agree with local state?)
3. Resolve any discrepancies manually
4. Run reconciliation — confirm clean state
5. Explicit operator re-arm — transition to RECONCILING → ARMED
6. Resume with one small, validated action before returning to normal operation

**Do not rush re-arm.** An incorrect re-arm is worse than staying in ERROR.

---

## Rollback Protocol

Before any rollback:
1. Confirm what state you're rolling back to
2. Confirm the rollback itself won't cause data loss
3. Get explicit operator approval
4. Execute rollback
5. Validate post-rollback state
6. Log the entire sequence

---

## Known Failure Modes

<!-- Document your system's specific failure modes here as you discover them -->

| Failure Mode | Trigger | Correct Response |
|-------------|---------|-----------------|
| [Add as discovered] | | |

---

## Customization Notes

This doctrine establishes the behavioral floor. Your system may have domain-specific failure modes (network partitions, lock contention, external API failures) — add them to the Known Failure Modes table as you discover them. The goal is that every failure the system has ever seen is documented so it can be recognized and handled predictably next time.
