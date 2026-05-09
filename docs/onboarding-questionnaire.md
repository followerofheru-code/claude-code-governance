# Governance Onboarding Questionnaire

Paste this into your Claude Code session after installation. Answer each question — Claude will use your responses to customize the governance layer.

---

## System Identity

1. What does this system do in one sentence?
2. What language/runtime is it built in?
3. Is this system currently in production / handling real users or real money?
4. What is the worst realistic outcome if Claude makes an unvalidated change?

---

## State Machine

5. What are the meaningful operational states of your system?  
   *(Examples: BOOTING, READY, PROCESSING, PAUSED, ERROR — customize for your domain)*
6. What state should the system be in before Claude is allowed to make changes?
7. Are there states where Claude should never execute anything, no matter what?

---

## Protected Assets

8. List the files or directories Claude should never modify without explicit approval:
9. List any external services that should never be called automatically (payment APIs, messaging, etc.):
10. Are there any database tables or data stores that require special caution?

---

## Risk Thresholds

11. What constitutes a "low-risk" change that Claude can make without asking? *(e.g., editing comments, updating non-critical config)*
12. What constitutes a "high-risk" change that always requires explicit approval? *(e.g., modifying execution logic, touching auth, schema changes)*
13. Are there any operations that should be impossible — blocked at the system level regardless of instruction?

---

## Failure Behavior

14. If something goes wrong mid-execution, what should Claude do first?  
    *(Options: stop and alert, attempt rollback, log and continue, escalate immediately)*
15. Is there a safe "halt" state your system can enter while you investigate?
16. How do you currently detect silent failures — things that break without alerting anyone?

---

## Audit Requirements

17. Do you need to comply with any regulatory or internal audit requirements?
18. Who (besides you) needs to be able to read the audit log?
19. How long do you need to retain audit history?

---

## Session Workflow

20. How do you currently start a Claude Code session? *(fresh session, pasted context, CLAUDE.md only)*
21. What's the most common type of task you ask Claude to do?
22. What's the task that worries you most — the one where you wish you had more control?

---

Once you've answered these, tell Claude: **"Use these answers to customize the governance layer in this project."**
