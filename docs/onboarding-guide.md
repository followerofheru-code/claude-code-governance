# Claude Code Governance — Client Onboarding Guide

---

## What We're Doing

Installing a governance system inside your repository that makes Claude Code predictable, auditable, and safe for operational work.

**Time required:** Half-day session (3–4 hours). Installation is 90 minutes; the rest is customization, testing, and handoff.

---

## Before the Session — What You Need Ready

Send these before we start. Gaps here eat into session time.

- [ ] Repo access (read/write) — local clone or GitHub access
- [ ] A one-sentence description of what your system does
- [ ] List of the 3–5 files Claude should never touch without approval
- [ ] Any external APIs or services your system calls with real consequences
- [ ] Your biggest AI reliability complaint — what went wrong that brought you here
- [ ] One person on the call who understands the system architecture end-to-end

**Optional but useful:** existing CLAUDE.md, any prior AI session logs showing the problem behavior.

---

## The 4-Step Process

### Step 1 — System Review (45–60 min)

- Walk through your project architecture and existing automation
- Identify critical files, protected paths, and high-risk operations
- Define your state machine modes for your domain
- Map out what Claude should never touch without explicit approval

**Output:** Domain-specific rule list, protected file inventory, state machine sketch.

### Step 2 — Installation (45–60 min)

- Open Claude Code in your project root
- Claude scaffolds the full governance layer (state machine, memory, runtime contract, mediator)
- Validate everything loaded correctly with a session sanity check
- Confirm audit log is writing

**Output:** Governance files live in your repo, Claude reads them on startup.

### Step 3 — Customization (45–60 min)

- Run the onboarding questionnaire together (see `onboarding-questionnaire.md`)
- Tune the state machine for your operational modes
- Set risk thresholds, protected paths, and approval requirements
- Activate governance mode in CLAUDE.md

**Output:** Rules match your domain. Claude behaves correctly in your context.

### Step 4 — Handoff (30 min)

- Test a real workflow with governance active
- Review the audit log together — confirm actions are being recorded
- Walk through failure recovery: what happens if Claude tries something blocked
- You get 2 weeks async support for questions and drift checks

**Output:** You can operate the system independently. You know how to read the audit log and adjust rules.

---

## What You'll Have After

| Component | What It Does |
|-----------|-------------|
| State machine | Claude knows when it's safe to act |
| Project memory | No more re-explaining your architecture each session |
| Runtime contract | Hard boundaries on what Claude can touch |
| Audit log | Every significant action recorded and traceable |
| Watchdog | Alerts if something drifts or breaks silently |
| Failure doctrine | Defined recovery sequence — no improvisation under stress |

---

## What I Need From You

- Read/write access to your repository
- A clear description of your biggest AI reliability frustrations
- 3–4 hours for the initial session
- One person who understands the system architecture

---

## After the Session

**Week 1:** Use the system normally. Note any rules that feel too tight or too loose.

**Week 2:** First drift check — I review your audit log, flag any anomalies, adjust rules if needed.

**Ongoing (optional):** Monthly audit, rule evolution as your system grows (Phase 3 — Managed Governance).

---

## Pricing Reference

| Phase | Scope | Investment |
|-------|-------|------------|
| Phase 1 — Stabilize | Core governance installed and customized | $1,000–1,500 |
| Phase 2 — Full Governance | + Execution mediator, watchdog, invariants, Graphify | $3,000–5,000 |
| Phase 3 — Managed Governance | Monthly audits, drift detection, rule evolution | $750–1,500/month |

Beta partnerships available with custom terms.

---

## Important Scope Note

This system governs how AI interacts with your system, not the system itself. It does not replace your application logic, implement business workflows, or guarantee correctness of external systems. It ensures your AI assistant remains trustworthy as your project evolves.
