# Folio Agent Pipelines

## Quick Reference

| Pipeline | Command | When to Use | Stages |
|----------|---------|-------------|--------|
| **Feature** | `@folio-orchestrator` | New feature touching 2+ files | planner -> architect -> implementor -> tester -> reviewer |
| **Bugfix** | `@folio-bug-orchestrator` | Bug report, unknown root cause | triager -> fixer -> tester -> reviewer |
| **Hotfix** | `@folio-hotfix-orchestrator` | Bug with known root cause, needs fast fix | fixer -> reviewer |
| **Refactor** | `@folio-refactor-orchestrator` | Restructure code, preserve behavior | analyzer -> executor -> tester -> reviewer |

## How Pipelines Work

### 1. You describe the work

Tell the orchestrator what you need in natural language:

```
@folio-orchestrator Add a works/portfolio page with project screenshots and descriptions
@folio-bug-orchestrator The 3D donut model is not loading on mobile
@folio-hotfix-orchestrator The theme toggle button is missing its aria-label in navbar.js
@folio-refactor-orchestrator Extract the game engine into a standalone module with clean API
```

### 2. The orchestrator creates a work directory

Each pipeline type has its own directory:

```
.planning/
├── features/{slug}/      <- feature pipeline
├── bugs/{slug}/          <- bugfix pipeline
├── hotfixes/{slug}/      <- hotfix pipeline
└── refactors/{slug}/     <- refactor pipeline
```

### 3. Agents run in sequence

The orchestrator spawns one agent at a time. Each agent:
- Reads its instructions from `.claude/agents/folio-{name}.md`
- Reads predecessor artifacts from the work directory
- Does its work (investigation, code changes, testing, review)
- Writes its output artifact to the work directory
- Reports status: `complete`, `blocked`, or `failed`

### 4. Artifacts pass between agents

Agents communicate through markdown files with YAML frontmatter:

```yaml
---
feature: projects-gallery
stage: planner
status: complete
produced_by: folio-planner
consumed_by: folio-architect
---
```

The orchestrator tracks everything in `PIPELINE-STATE.md`:

```
| # | Stage | Agent | Status | Started | Completed | Artifact |
|---|-------|-------|--------|---------|-----------|----------|
| 1 | Plan | folio-planner | complete | 12:00 | 12:02 | 01-SPEC.md |
| 2 | Architect | folio-architect | running | 12:02 | | 02-ARCHITECTURE.md |
| 3 | Implement | folio-implementor | pending | | | 03-IMPLEMENTATION.md |
```

### 5. The reviewer decides the outcome

Every pipeline ends with the reviewer. Three possible verdicts:
- **pass** -- ship it
- **pass-with-warnings** -- ship it, but address the warnings
- **fail** -- the orchestrator determines which stage to re-run

## Running Individual Agents

You can run any agent standalone without a pipeline:

```
# Investigation only
@folio-bug-triager Investigate why the donut model flickers on resize

# Code review only
@folio-reviewer Review components/game/engine/GameEngine.js against project conventions

# Quick analysis
@folio-refactor-analyzer Map all dependencies of components/donut.js
```

When running standalone, tell the agent where to write its output.

## Choosing the Right Pipeline

```
"I need a new feature"                    -> @folio-orchestrator (feature)
"Something is broken, not sure why"       -> @folio-bug-orchestrator (bugfix)
"Something is broken, I know the cause"   -> @folio-hotfix-orchestrator (hotfix)
"I want to restructure this code"         -> @folio-refactor-orchestrator (refactor)
"Single-file fix, trivial change"         -> just do it directly, no pipeline needed
```

## Coverage

Every development workflow is covered by either a pipeline or a direct action:

| Workflow | Covered? | How |
|----------|----------|-----|
| Build a new feature | yes | Feature pipeline |
| Fix a bug (unknown cause) | yes | Bugfix pipeline |
| Fix a bug (known cause, fast) | yes | Hotfix pipeline |
| Restructure / refactor code | yes | Refactor pipeline |
| Code review | yes | `@folio-reviewer` standalone |
| Investigation only | yes | `@folio-bug-triager` standalone |
| Dependency analysis | yes | `@folio-refactor-analyzer` standalone |
| Single-file edit | yes | Direct edit, no pipeline needed |
| Config changes | yes | Direct edit, no pipeline needed |

## Agent Inventory

### Feature Pipeline (6 agents)
| Agent | Role | Writes Code? |
|-------|------|-------------|
| `folio-orchestrator` | Coordinates feature pipeline | No |
| `folio-planner` | Writes feature spec | No |
| `folio-architect` | Designs technical approach | No |
| `folio-implementor` | Implements all code (components, Three.js, game, pages) | Yes |
| `folio-tester` | Verifies implementation | Yes (build/lint only) |
| `folio-reviewer` | Reviews all changes | No (read-only) |

### Bugfix Pipeline (3 new + reuses tester, reviewer)
| Agent | Role | Writes Code? |
|-------|------|-------------|
| `folio-bug-orchestrator` | Coordinates bugfix pipeline | No |
| `folio-bug-triager` | Investigates root cause | No (read-only) |
| `folio-bug-fixer` | Implements minimal fix | Yes |

### Refactor Pipeline (3 new + reuses tester, reviewer)
| Agent | Role | Writes Code? |
|-------|------|-------------|
| `folio-refactor-orchestrator` | Coordinates refactor pipeline | No |
| `folio-refactor-analyzer` | Maps dependencies, plans steps | No (read-only) |
| `folio-refactor-executor` | Executes refactor changes | Yes |

### Hotfix Pipeline (1 new + reuses bug-fixer, reviewer)
| Agent | Role | Writes Code? |
|-------|------|-------------|
| `folio-hotfix-orchestrator` | Fast-track fix, skip triage | No |

**Total: 13 agent files, 4 pipelines**

## Shared Agents

Some agents are reused across pipelines:

| Agent | Used By |
|-------|---------|
| `folio-tester` | feature, bugfix, refactor |
| `folio-reviewer` | feature, bugfix, hotfix, refactor |
| `folio-bug-fixer` | bugfix, hotfix |
