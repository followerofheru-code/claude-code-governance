# Claude Code Governance Framework

**Predictable, auditable AI that lives in your codebase.**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

A governance layer for AI-assisted development. Structured memory, explicit state control, execution mediation, and append-only audit logging — so an AI coding agent operates inside defined boundaries instead of on trust.

**Governance-based, not sandbox-enforced.** See [Honest Boundaries](#honest-boundaries) before anything else. That section is first for a reason.

---

## Contents

- [Honest Boundaries](#honest-boundaries)
- [The Problem](#the-problem)
- [The Solution](#the-solution)
- [Core Operating Principle](#core-operating-principle)
- [What Gets Installed](#what-gets-installed)
- [Quick Start](#quick-start)
- [Deployment Modes](#deployment-modes)
- [Proven In Production](#proven-in-production)
- [Use Cases](#use-cases)
- [Repository Structure](#repository-structure)
- [Consulting](#consulting)
- [Roadmap](#roadmap)

---

## Honest Boundaries

**What this framework does:**

- Enforces a structured decision flow through tooling gates
- Creates full auditability of every significant action
- Prevents accidental unsafe execution via state checks
- Defines reproducible operational behavior
- Detects bypass attempts through pre-commit hooks and a watchdog

**What this framework does not do:**

- Sandbox Claude Code at the OS or process level
- Prevent a determined bypass by the agent itself
- Guarantee absolute enforcement
- Replace production access controls or secrets management

**Honest classification:** a governance-backed operating framework with mediation, invariants, and state control. Not an OS. Not a sandbox. A structured execution discipline layer.

If you need hard isolation, use containers and OS-level permissions. This solves a different problem — making agent behavior *legible and auditable*, not making it *impossible*.

---

## The Problem

AI coding agents are fast and occasionally wrong in expensive ways.

- They modify files you didn't ask them to touch
- They act on stale context after a file has changed underneath them
- They report success while a system sits in a broken state
- They leave no trail explaining why a change happened
- Nothing distinguishes "safe to run" from "not safe to run"

None of this is a model defect. It's a missing operational layer. Human engineers work inside code review, deploy gates, and runbooks. Agents usually don't.

---

## The Solution

Five components that together make agent behavior predictable and reviewable.

| Component | What it does |
|---|---|
| **Structured memory (L1/L2)** | Separates transient session context from stable architectural knowledge |
| **State machine** | A single source of truth for whether the system is safe to operate, with explicit transition authority |
| **Execution mediator** | A checkpoint every significant change routes through — validates state, protects critical files, writes an audit entry |
| **Intent locks** | A signed statement of what's about to change, with file hashes, preventing action on stale context |
| **Runtime invariants** | Assertions that must hold true for the system to remain operational |

---

## Core Operating Principle

> **Governance → mediation → execution.** No direct, unchecked autonomy.

Four rules underneath it:

1. **One trustworthy node before redundancy** — make the primary deterministic first
2. **Observer before executor** — monitor, alert, log, then act
3. **Certainty before complexity** — operational clarity over clever features
4. **Soft governance backed by detection** — not a sandbox, but not optional

---

## What Gets Installed

```
CLAUDE.md                    Project constitution — loaded first, always
memory/
  L1-session-memory.md       Transient context, current goals
  L2-project-memory.md       Stable knowledge, architecture decisions
operational/
  state-machine.md           States and transition authority
  health-endpoints.md        Health check template
  watchdog.md                Process and state monitoring
  deploy-discipline.md       Versioning, deployment, rollback
governance/
  runtime-contract.md        Agent behavioral rules
  failure-doctrine.md        Failure states, recovery, escalation
  execution-mediator.md      Mediator design spec
  intent-lock.md             Intent JSON spec and validation
  runtime-invariants.md      Always-true system assertions
```

---

## Quick Start

```bash
git clone https://github.com/followerofheru-code/claude-code-governance.git
cd claude-code-governance
./onboarding/setup-script.sh
```

Then customize `CLAUDE.md` for your domain and run the verification checklist. Minimal mode gets you operational in under an hour.

---

## Deployment Modes

**Minimal** — `CLAUDE.md`, state machine, runtime contract, L2 memory. Fast adoption, low ceremony.

**Operational** — adds the execution mediator and watchdog. Changes are gated and monitored.

**Full Governance** — adds runtime invariants and intent locks. Every significant change is hash-verified against declared intent.

Start minimal. Upgrade when the cost of a mistake exceeds the cost of the ceremony.

---

## Proven In Production

The reference implementation is an automated execution platform that ran continuously on a single node under this framework.

| What was tested | Result |
|---|---|
| Failure scenarios simulated | 6 of 6 handled correctly |
| Unauthorized state mutations | 0 — all gated and logged |
| Silent failures | 0 — every fault raised an alert |
| Audit coverage | Complete, append-only |
| Independent governance assessment | A− |

The framework contains no proprietary logic from that system — no signal engines, no risk modules, no code that executes transactions. Only the governance layer.

---

## Use Cases

- Onboarding an AI agent onto an existing codebase without losing control of it
- Reproducible AI engineering environments across a small team
- Any stack where a wrong automated action is expensive
- Systems that need an audit trail explaining why each change happened
- Solo developers who want the discipline of a review process without a reviewer

---

## Repository Structure

```
docs/                  Stack audits, MCP scope rules, review notes
examples/              Worked reference implementation
templates/             Customizable starting files
onboarding/            Client questionnaire, setup script, verification checklist
modes/                 Minimal mode fast-track
CHANGELOG.md
```

---

## Consulting

I help teams deploy and customize this framework, and work more broadly on practical AI implementation for small and mid-sized businesses.

| Tier | Scope |
|---|---|
| **Discovery Audit** | Written assessment — what's worth automating, what it costs to run, what data risk exists, what to do first. Nothing built. |
| **Build** | The highest-value item from the audit. Working system, documentation, handover. |
| **Governance Layer** | Full deployment of this framework, customized to your stack. |
| **Ongoing** | Monthly review, drift detection, rule evolution. |

Most engagements start with the audit — small commitment, and you keep the document either way.

Not an enterprise consultancy. If you need a twelve-month transformation program, I'm the wrong fit and I'll say so on the first call.

**Contact:** [LinkedIn](https://www.linkedin.com/in/darrelle-jones-0b5a92348/) · darrelle.jones@outlook.com

---

## Roadmap

- `intent-lock.js` — JSON generator with hash validation
- `invariant-checker.js` — runtime verification before ARMED state
- Pre-commit hook for critical file change detection

---

## License

MIT — see [LICENSE](LICENSE).
