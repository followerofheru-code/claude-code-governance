# State Machine Specification

## States

| State | Description | Entry Condition | Exit Condition |
|-------|-------------|-----------------|----------------|
| BOOTING | System initializing, not ready | System start | All startup checks pass |
| RECONCILING | Verifying consistency with external sources | After BOOTING or ERROR | Reconciliation passes |
| ARMED | Healthy, validated, safe to execute | After RECONCILING | Manual disarm or anomaly |
| DISARMED | Manually halted | Explicit operator action | Explicit operator action |
| ERROR | Anomaly detected, execution blocked | Any guard failure | Manual investigation + reset |

## Transition Rules

```
BOOTING → RECONCILING   (auto, on startup checks complete)
RECONCILING → ARMED     (auto, on reconciliation pass)
RECONCILING → ERROR     (auto, on reconciliation fail)
ARMED → DISARMED        (manual, operator decision)
ARMED → ERROR           (auto, on anomaly detection)
DISARMED → RECONCILING  (manual, after operator review)
ERROR → RECONCILING     (manual, after incident investigation)
```

## Guard Rule

**Claude may only execute changes when state is ARMED.**

Any other state = block all execution, report state to operator.

## Implementation Notes

- State must be persisted across restarts (file or DB, not in-memory only)
- State transitions must be logged with timestamp and reason
- No transition should be silent — every state change generates a log entry
- If state file is missing or corrupt on startup: treat as BOOTING, do not assume ARMED

## Customization

Replace state names and transition rules to match your domain:
- A CI/CD system might use: IDLE → BUILDING → TESTING → DEPLOYING → DEPLOYED
- A data pipeline might use: WAITING → INGESTING → PROCESSING → VALIDATING → COMPLETE
- Keep the principle: explicit states, no implicit transitions, execution only in safe states
