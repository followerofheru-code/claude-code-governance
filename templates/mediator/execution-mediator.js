/**
 * Execution Mediator — Single choke point for AI-driven system changes.
 *
 * All meaningful changes pass through here:
 *   pre-flight guards → state snapshot → sandboxed execution → validation → audit log
 *
 * Customize guards and snapshot logic for your domain.
 */

const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const AUDIT_LOG = path.join(__dirname, '../../governance/audit-log.jsonl');

// ---------------------------------------------------------------------------
// Guard base class — implement check() in each subclass
// ---------------------------------------------------------------------------

class Guard {
  get name() { return this.constructor.name; }

  async check(proposal) {
    throw new Error(`${this.name}.check() not implemented`);
  }
}

// ---------------------------------------------------------------------------
// Built-in guards — customize or replace for your domain
// ---------------------------------------------------------------------------

class ArmedStateGuard extends Guard {
  async check(proposal) {
    // Replace with your state-reading logic
    const stateFile = path.join(__dirname, '../../governance/system_state.json');
    try {
      const state = JSON.parse(fs.readFileSync(stateFile, 'utf8'));
      const armed = state.state === 'ARMED';
      return { passed: armed, reason: armed ? 'state=ARMED' : `state=${state.state} (must be ARMED)` };
    } catch {
      return { passed: false, reason: 'system_state.json unreadable — treat as not ARMED' };
    }
  }
}

class CriticalFileGuard extends Guard {
  constructor(protectedPaths = []) {
    super();
    this.protectedPaths = protectedPaths;
  }

  async check(proposal) {
    const touchedPaths = proposal.affectedPaths || [];
    const violations = touchedPaths.filter(p =>
      this.protectedPaths.some(protected_ => p.startsWith(protected_))
    );
    return {
      passed: violations.length === 0,
      reason: violations.length === 0
        ? 'no protected paths touched'
        : `protected paths: ${violations.join(', ')}`
    };
  }
}

class PlanApprovalGuard extends Guard {
  async check(proposal) {
    const approved = Boolean(proposal.approvalId || proposal.approved);
    return {
      passed: approved,
      reason: approved ? `approved: ${proposal.approvalId}` : 'no approval on record for this proposal'
    };
  }
}

class DbConnectionGuard extends Guard {
  constructor(checkFn) {
    super();
    this.checkFn = checkFn; // async () => boolean
  }

  async check(proposal) {
    try {
      const connected = await this.checkFn();
      return { passed: connected, reason: connected ? 'db reachable' : 'db unreachable' };
    } catch (err) {
      return { passed: false, reason: `db check threw: ${err.message}` };
    }
  }
}

// ---------------------------------------------------------------------------
// Errors
// ---------------------------------------------------------------------------

class GuardViolation extends Error {
  constructor(failures) {
    super(`Guard violation: ${failures.map(f => `${f.name}: ${f.reason}`).join('; ')}`);
    this.failures = failures;
  }
}

class PostExecFailure extends Error {
  constructor(reason) {
    super(`Post-execution validation failed: ${reason}`);
  }
}

// ---------------------------------------------------------------------------
// Mediator
// ---------------------------------------------------------------------------

class ExecutionMediator {
  constructor({ guards, snapshotFn, validatePostExecFn, rollbackFn }) {
    this.guards = guards;
    this.snapshotFn = snapshotFn;         // async () => object
    this.validatePostExecFn = validatePostExecFn; // async (before, after, result) => boolean
    this.rollbackFn = rollbackFn;         // async (beforeState) => void
  }

  async execute(proposal) {
    const proposalId = proposal.id || crypto.randomUUID();

    // 1. Pre-flight — all guards must pass
    const guardResults = await Promise.all(
      this.guards.map(async g => {
        const result = await g.check(proposal);
        return { name: g.name, ...result };
      })
    );
    const failures = guardResults.filter(r => !r.passed);
    if (failures.length > 0) {
      await this._log('GUARD_VIOLATION', { proposalId, proposal, guards: guardResults });
      throw new GuardViolation(failures);
    }

    // 2. Snapshot before
    const beforeState = await this.snapshotFn();
    const beforeHash = this._hash(beforeState);

    let result;
    try {
      // 3. Execute (caller-provided — keep this thin)
      result = await proposal.execute();
    } catch (err) {
      await this._log('EXEC_ERROR', { proposalId, error: err.message, beforeHash });
      throw err;
    }

    // 4. Snapshot after + validate
    const afterState = await this.snapshotFn();
    const afterHash = this._hash(afterState);

    const valid = await this.validatePostExecFn(beforeState, afterState, result);
    if (!valid) {
      await this.rollbackFn(beforeState);
      await this._log('ROLLBACK', { proposalId, beforeHash, afterHash });
      throw new PostExecFailure('post-exec state validation failed');
    }

    // 5. Log success
    await this._log('EXEC_SUCCESS', {
      proposalId,
      guards: guardResults,
      beforeHash,
      afterHash,
      durationMs: result?.durationMs
    });

    return result;
  }

  _hash(obj) {
    return crypto.createHash('sha256').update(JSON.stringify(obj)).digest('hex').slice(0, 16);
  }

  async _log(event, data) {
    const entry = JSON.stringify({
      ts: new Date().toISOString(),
      event,
      ...data
    });
    fs.appendFileSync(AUDIT_LOG, entry + '\n');
  }
}

// ---------------------------------------------------------------------------
// Factory — wire up your domain-specific guards and snapshot logic here
// ---------------------------------------------------------------------------

function createMediator({ protectedPaths = [], dbCheckFn = async () => true } = {}) {
  return new ExecutionMediator({
    guards: [
      new ArmedStateGuard(),
      new CriticalFileGuard(protectedPaths),
      new PlanApprovalGuard(),
      new DbConnectionGuard(dbCheckFn)
    ],
    snapshotFn: async () => {
      // Replace with your actual state snapshot logic
      const stateFile = path.join(__dirname, '../../governance/system_state.json');
      return JSON.parse(fs.readFileSync(stateFile, 'utf8'));
    },
    validatePostExecFn: async (before, after, result) => {
      // Replace with your actual post-exec validation
      return after.state !== 'ERROR';
    },
    rollbackFn: async (beforeState) => {
      // Replace with your actual rollback logic
      const stateFile = path.join(__dirname, '../../governance/system_state.json');
      fs.writeFileSync(stateFile, JSON.stringify(beforeState, null, 2));
    }
  });
}

module.exports = { ExecutionMediator, createMediator, GuardViolation, PostExecFailure };
