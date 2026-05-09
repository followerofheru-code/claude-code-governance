# Watchdog + Invariants Specification

Continuous monitoring of system health, state validity, and silent failures.

---

## What the Watchdog Monitors

| Check | Interval | Failure Action |
|-------|----------|---------------|
| Process health | 30s | Alert if any core process is down |
| State validity | 30s | Alert + block execution if state != ARMED and execution is expected |
| Heartbeat freshness | 60s | Alert if last heartbeat is stale |
| Database connectivity | 30s | Alert + block execution if DB unreachable |
| External service reachability | 5m | Alert if primary execution path is unreachable |
| Audit log writability | On each write | Alert + block if log cannot be written |

---

## Invariants (Things That Must Always Be True)

Invariants are checked before execution and periodically during operation. Any invariant violation triggers CRITICAL severity.

**Example invariants — replace with yours:**

```
INV-001: system_state must be one of {BOOTING, RECONCILING, ARMED, DISARMED, ERROR}
INV-002: active trade count must be >= 0 and <= MAX_CONCURRENT
INV-003: balance must not be below floor value
INV-004: no execution may proceed if state != ARMED
INV-005: audit log must be writable before any execution
```

---

## Alert Design Rules

1. **Alert on first occurrence** — don't suppress the first instance of anything
2. **Deduplicate repeating alerts** — don't spam on the same condition every interval
3. **Alert on recovery** — send a recovery notification when the condition clears
4. **Include state in every alert** — the operator needs to know what state the system is in, not just what broke
5. **Alert-only by default** — watchdog should not restart processes automatically unless you've tested that restart behavior thoroughly

---

## Alert Format

```
[SEVERITY] [COMPONENT] [CONDITION]
State: [current system state]
Last known good: [timestamp]
Action required: [what operator should check]
```

---

## Implementation Notes

- Watchdog should run as a separate process (PM2 or equivalent) with its own restart policy
- Do not let the watchdog share state with the processes it monitors — that defeats the purpose
- Watchdog restarts should not change system_state — that's the operator's job
- Clock drift is a real failure mode on Windows — check that your timestamps are sane on startup

---

## Invariant Checker Structure

```javascript
class InvariantChecker {
  async checkAll() {
    const results = await Promise.all(this.invariants.map(inv => inv.check()));
    const violations = results.filter(r => !r.passed);
    if (violations.length > 0) {
      await this.alert('INVARIANT_VIOLATION', violations);
      await this.blockExecution();
    }
    return violations;
  }
}
```

Run `checkAll()` on startup, before any execution, and on a periodic interval.

---

## Maturity Levels

| Level | Description |
|-------|-------------|
| **Detect** | Watchdog notices failures after they happen |
| **Prevent** | Invariants block bad states before execution |
| **Predict** | Trends in metrics suggest failures before they occur |

Start at Detect. Move to Prevent once invariants are defined and tested. Predict is aspirational.
