# Claude Code Governance Framework

### Predictable, Auditable AI That Lives in Your Codebase

---

## Contents

- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [What Gets Installed](#what-gets-installed)
- [Core Operating Principle](#core-operating-principle)
- [Use Cases](#use-cases)
- [Quick Start](#quick-start-self-install)
- [Consulting Engagement](#pricing)
- [Repository Structure](#repository-structure)

---

## The Problem

AI coding assistants are powerful but stateless. Every session resets context — rules must be re-explained, architectural constraints drift, and there's no audit trail of decisions.

For real operational systems — dispatch, logistics, trading, automation — this creates uncontrolled variability in how AI behaves across sessions.

## The Solution

A governance layer installed directly inside your repository. It doesn't change what your software does — it ensures your AI assistant does it the right way, every time.

This is not a prompt pack or chatbot configuration. It is a persistent execution governance system that makes AI behavior:

- **Deterministic** — same inputs produce same behavior across sessions
- **Auditable** — every significant action logged and traceable
- **Constrained** — explicit rules enforced as workflow boundaries
- **Recoverable** — defined behavior under failure and stress

---

## What Gets Installed

### 1. State Machine (Operational Control)
Explicit runtime modes: `BOOTING → RECONCILING → ARMED → DISARMED → ERROR`. AI actions are only permitted in safe states. Unsafe states automatically block execution.

### 2. Persistent Project Memory
Project knowledge lives in structured, versioned files — architecture decisions, constraints, business rules, known failure modes. Claude reconstructs context from these files each session rather than relying on volatile chat history.

### 3. Runtime Contract (Behavioral Boundaries)
Defines what AI can and cannot do. Critical files are protected. High-risk actions require explicit approval. System state must be validated before execution.

### 4. Execution Mediator (Audit + Control)
All meaningful changes pass through a single mediation layer that:
- Validates state before execution
- Logs every action (immutable, append-only)
- Blocks unauthorized operations
- Provides full traceability

### 5. Failure Doctrine (Recovery Behavior)
Defines system behavior under stress — degraded vs critical states, automatic escalation paths, "no silent failure" rules, safe recovery sequences.

### 6. Watchdog + Invariants (Runtime Safety)
Continuous monitoring of process health, state validity, and silent failures. Anomalies trigger alerts or disable execution capability.

### 7. Graphify Integration (Optional)
Builds a knowledge graph of your repository to reduce AI cognitive load, improve navigation, and lower token usage in complex projects.

---

## Core Operating Principle

**Observer before executor.**

```
observe → reconcile → validate → arm → execute
```

Reversing this order forfeits the defining property of the system.

---

## Use Cases

Any system where AI assists with ongoing development and operational changes:

- **Dispatch / logistics automation** — load matching, driver assignment, document processing
- **Trading systems** — signal processing, risk management, execution pipelines
- **Data pipelines** — ingestion, transformation, monitoring workflows
- **API backends** — service logic, webhook handling, state management
- **Internal tooling** — any system with real consequences if AI behavior drifts

---

## Scope

This system governs how AI interacts with your system — not the system itself.

It does **not** replace your application logic, implement your business workflows, guarantee correctness of external systems, or function as a production execution engine on its own.

---

## Pricing

| Tier | Scope | Investment |
|------|-------|------------|
| **Phase 1 — Stabilize** | Core governance: state machine, memory system, runtime contract. One session, same-day delivery. | $1,000–1,500 |
| **Phase 2 — Full Governance** | Phase 1 + execution mediator, watchdog, invariants, failure doctrine, Graphify. 30-day refinement window. | $3,000–5,000 |
| **Phase 3 — Managed Governance** | Monthly audit, drift detection, rule evolution, ongoing optimization. | $750–1,500/month |

**Current availability:** Beta partnerships with custom terms. [Contact for details.]

---

## Quick Start (Self-Install)

1. Clone this repo into your project directory
2. Copy `templates/CLAUDE.md` → your project root, customize for your domain
3. Copy `templates/governance/` → `governance/` in your project
4. Open Claude Code in your project root — governance activates automatically
5. Run the onboarding questionnaire: paste `docs/onboarding-questionnaire.md` into your session

---

## Repository Structure

```
templates/
  CLAUDE.md                     — Drop-in governance CLAUDE.md
  governance/
    state-machine.md            — State machine spec
    runtime-contract.md         — Behavioral boundaries
    failure-doctrine.md         — Recovery behavior
    watchdog-spec.md            — Invariant monitoring
  mediator/
    execution-mediator.js       — Execution mediator scaffold (configurable)
docs/
  onboarding-guide.md           — Client onboarding process
  onboarding-questionnaire.md   — Domain customization questions
  execution-mediator-spec.md    — Full mediator architecture
  skill-adoption-matrix.md      — When to activate which skills
examples/
  trading-system/               — Reference governance config (sanitized)
```

---

## Contact

Built and maintained by [@followerofheru-code](https://github.com/followerofheru-code)
