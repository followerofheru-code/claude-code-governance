# Execution Mediator — Architecture Specification

**Status:** Reference design — adapt to your stack
**Purpose:** Single choke point for deterministic AI execution enforcement

---

## Problem Statement

Without a mediator, enforcement is probabilistic:
```
Claude proposes → scattered guards → maybe enforced
```

With a mediator, enforcement is guaranteed:
```
Claude proposes → mediator validates → system executes
```

---

## Core Architecture

```javascript
class ExecutionMediator {
  async executeChange(proposal) {
    // 1. PRE-FLIGHT — all guards must pass (atomic)
    const guards = await this.runAllGuards(proposal);
    if (!guards.every(g => g.passed)) {
      await this.logEvent('GUARD_VIOLATION', { proposal, guards });
      throw new GuardViolation(guards.filter(g => !g.passed));
    }

    // 2. SNAPSHOT — immutable state before any change
    const beforeState = await snapshotState();

    // 3. EXECUTE — sandboxed
    const result = await sandboxExecute(proposal.code);

    // 4. VALIDATE — confirm post-exec state is valid
    const afterState = await snapshotState();
    if (!this.validatePostExec(beforeState, afterState, result)) {
      await this.rollback(beforeState);
      await this.logEvent('ROLLBACK', { proposal, beforeState, afterState });
      throw new PostExecFailure();
    }

    // 5. LOG — immutable, append-only
    await this.logEvent('EXEC_SUCCESS', {
      proposal_id: proposal.id,
      guards,
      before_hash: hash(beforeState),
      after_hash: hash(afterState),
      result
    });

    return result;
  }
}
```

---

## Guard Modules

Each guard is independent and returns `{ passed: boolean, reason: string }`.

```javascript
// Guards run in this order — first failure blocks execution
guards: [
  new ArmedStateGuard(),      // system must be in ARMED state
  new CriticalFileGuard(),    // proposal must not touch protected paths
  new PlanApprovalGuard(),    // an approved plan must exist for this change
  new RiskLogicGuard(),       // passes the proposal through your risk module
  new DbConnectionGuard()     // database must be reachable before execution
]
```

Add domain-specific guards as your system grows. Keep each guard focused on one concern.

---

## Audit Log Format

Every execution appends one entry (never overwrite, never truncate):

```json
{
  "ts": "2026-05-09T14:23:11.000Z",
  "event": "EXEC_SUCCESS | GUARD_VIOLATION | ROLLBACK | POSTEXEC_FAILURE",
  "proposal_id": "uuid-v4",
  "guards": [
    { "name": "ArmedStateGuard", "passed": true, "reason": "state=ARMED" },
    { "name": "CriticalFileGuard", "passed": true, "reason": "no protected paths" }
  ],
  "before_hash": "sha256-of-state-snapshot",
  "after_hash": "sha256-of-state-snapshot",
  "rollback": false,
  "duration_ms": 142
}
```

Rotate by date (e.g., `mediator_audit_2026-05-09.log`). Never delete historical logs.

---

## CLAUDE.md Integration

Once built, add this to your governance CLAUDE.md session flow:

```
Execution workflow:
1. Analyze the task → draft a change proposal (JSON format)
2. /execute-proposal [proposal JSON] → mediator handles validation and execution
3. Review mediator output → iterate or approve
4. Check audit log: node mediator_audit.js report --today
```

---

## Git Hook Integration

```bash
# .git/hooks/pre-commit
#!/bin/sh
node execution-mediator.js validate-staged
if [ $? -ne 0 ]; then
  echo "Mediator pre-flight failed. Check audit log."
  exit 1
fi

# .git/hooks/post-commit
#!/bin/sh
node execution-mediator.js snapshot --event=post-commit
```

---

## Enforcement Guarantees (when fully implemented)

- 100% of code changes pass through mediator
- No bypass path exists (git hooks enforce at commit layer)
- State snapshots are immutable (hash-verified)
- Rollback is atomic
- Every execution produces an audit record

---

## Implementation Sequence

| Phase | Deliverable | Estimate |
|-------|-------------|----------|
| 1 | Core mediator + 5 guards + snapshot | 1 session |
| 2 | CLAUDE.md flow + `/execute-proposal` | 1 session |
| 3 | Git hooks + pre-commit enforcement | 1 session |
| 4 | Audit log reader + daily report | 1 session |

**Before starting Phase 1:**
- Interview stakeholders to surface hidden requirements (`/ben-process-interviewer` or equivalent)
- Write tests before implementation (`/test-driven-development`)
- Isolate work in a git worktree (`/using-git-worktrees`)
- Confirm your invariant checker is live — guards depend on it

---

## Maturity Jump

```
Before mediator:  "constraint system" — probabilistic, advisory
After mediator:   "deterministic execution runtime" — guaranteed, auditable
```

This is the architectural boundary between "AI with rules" and "governed AI infrastructure."
