# Reference Example — Trading System Governance

This example shows how the governance framework was applied to a live automated futures trading system. Names and credentials are sanitized.

---

## System Profile

| Field | Value |
|-------|-------|
| Type | Automated NQ futures trading (prop firm eval) |
| Stack | Node.js, PM2, SQLite, TradingView CDP |
| Execution path | TradersPost webhook → atomic SL+TP bracket |
| Risk | Real money, real-time, failure = loss or account violation |

---

## State Machine Applied

| State | Meaning in This Domain |
|-------|----------------------|
| BOOTING | Startup sequence not yet complete |
| RECONCILING | Verifying DB ↔ broker state consistency |
| ARMED | All systems green, trades permitted |
| DISARMED | Manually halted (market close, discretionary pause) |
| ERROR | Anomaly detected, execution blocked until investigation |

**Domain-specific rule:** Any mismatch between local DB state and broker fill state → immediately transition to ERROR, halt all execution, reconcile manually before re-arming.

---

## Runtime Contract (Trading Domain)

**May without approval:**
- Read market data from TradingView
- Log signals and events to SQLite
- Send informational Slack/Telegram messages

**Requires explicit approval:**
- Modifying signal detection logic
- Changing risk parameters (stop-loss caps, position sizing)
- Adding new trading sessions or instruments

**Never:**
- Execute a trade while not ARMED
- Bypass the Risk Guardian veto
- Modify execution logic without an approved plan

---

## Guards Implemented

| Guard | Implementation |
|-------|---------------|
| ArmedStateGuard | Reads `system_state.json` — blocks all execution if state ≠ ARMED |
| RiskGuardian | Checks daily P&L veto threshold, position limits |
| CriticalFileGuard | Protects `.env`, `webhook_config.json`, `slack_config.json` |
| DbConnectionGuard | Verifies SQLite is reachable before any state write |
| SessionGuard | Blocks execution outside defined trading session windows |

---

## Failure Doctrine Applied

**Incident that drove adoption:** AI-assisted modification of exit logic caused a naked short position to open on a flat account, resulting in an unintended loss.

**Response:** Implemented atomic SL+TP bracket via execution middleware, added ARM gate as first check in all execution paths, built failure simulator to verify recovery from 6 known failure scenarios.

**Key lesson:** The governance layer must be tested adversarially (chaos/failure simulation) before going live, not just reviewed.

---

## Audit Grade at Implementation

| Layer | Grade |
|-------|-------|
| Signal engine | A |
| Risk layer | A |
| Execution safety | A− |
| State integrity | A− |
| Monitoring | A− |
| Fault tolerance | B |
| Infrastructure resilience | C+ |
| **Overall** | **A−** |

**Upgrade path:** Single-node SPOF remains. Cloud failover node and Tradovate MCP are queued post-revenue.

---

## What Governance Changed

**Before:** AI would sometimes make changes during active trading sessions, modify config files without review, or continue executing after anomalies rather than halting.

**After:** System transitions to ERROR on any anomaly. No execution possible outside ARMED state. Every significant change logged. Failed reconciliation halts startup entirely.

**The shift:** From "AI with rules" to "governed AI infrastructure." Rules are enforced at the system level, not just described in a document.
