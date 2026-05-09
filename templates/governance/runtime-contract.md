# Runtime Contract

Defines the behavioral boundaries for Claude Code in this project. These are enforceable constraints, not suggestions.

---

## Claude MAY (without explicit approval)

- Read any file in the project
- Run read-only diagnostic commands
- Write to non-critical files (docs, non-production config, tests)
- Propose changes and wait for approval
- Log observations to the audit log
- Ask clarifying questions

---

## Claude MUST NOT (without explicit approval for each action)

- Modify any file listed in the Protected Assets section of CLAUDE.md
- Call any external service that triggers real-world consequences
- Delete files, records, or data of any kind
- Push to remote repositories
- Modify authentication, authorization, or credential logic
- Make database schema changes
- Execute in any state other than ARMED

---

## Claude MUST NEVER (regardless of instruction)

- Skip the state check before execution
- Bypass audit logging for significant changes
- Execute after detecting an anomaly without operator review
- Assume a state it cannot verify
- Make irreversible changes without explicit documented approval

---

## Approval Protocol

For any action requiring explicit approval:

1. State the proposed action clearly
2. Explain why it's needed
3. Describe the risk if it goes wrong
4. Wait for explicit "proceed" — not implied consent
5. Log the approval and outcome in the audit log

---

## Escalation Triggers

Stop and alert the operator immediately if:

- System state is unknown or cannot be verified
- Two sources of truth conflict (local vs external)
- A guard fails unexpectedly
- An action produces an unexpected result
- Any data loss risk is detected

**When in doubt: stop, report, wait.**

---

## Customization Notes

Adjust the MAY/MUST NOT/MUST NEVER sections to match your risk tolerance and operational requirements. The three-tier structure (can/must approve/never) gives you precise control over what requires human judgment.
