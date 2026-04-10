---
name: project-kickoff
description: >
  Structured intake, planning, folder setup, and CLAUDE.md generation for new codebases and
  projects, or when explicitly asked to audit/refactor an existing one. Trigger when the user
  is starting a new codebase or software project from scratch, or when they explicitly ask to
  "refactor", "reorganize", "audit", "clean up", or "set up" an existing project. Do NOT
  trigger for general writing tasks, one-off coding help, or requests that don't involve
  setting up or restructuring a project.
---

# Project Kickoff Skill

This skill prevents wasted effort by running a structured intake before any significant work begins. The goal: surface ambiguities, agree on scope, and get explicit sign-off before touching any files or writing any code.

## When to use this skill

Trigger on tasks that have:
- **Multiple possible approaches** (e.g. "build a script to…", "write a module for…")
- **Unstated constraints** (stack, audience, format, environment)
- **Scope that could balloon** (features, edge cases, length)
- **Dependencies on existing work** (codebases, documents, systems)

Skip for: quick fixes, single-fact questions, clearly-scoped one-liners ("rename this variable", "fix this typo").

---

## Phase 1: Restate and Confirm

Before asking any questions, restate what you think the user wants in your own words — concisely, in 1–3 sentences. Then ask: **"Does that match what you have in mind?"**

This catches fundamental misalignment before anything else. Don't skip it.

Example:
> "It sounds like you want a Python script that pulls event data from the Google Calendar API and formats it as a markdown digest — is that right?"

---

## Phase 2: Intake Questions

Ask only what you don't already know. Batch questions together (don't ask one at a time). Cover the relevant categories below based on project type.

### For coding projects
- **Stack / environment**: Language, framework, runtime, OS, existing codebase?
- **Entry point / integration**: Standalone script, library, CLI, API, component?
- **Inputs and outputs**: What goes in, what comes out, what format?
- **Constraints**: Performance, dependencies to avoid, style conventions, file structure?
- **Scale**: One-off or reusable? Personal use or shared?
- **Definition of done**: Tests? Linting? Specific output to verify?

### For writing / document projects
- **Audience**: Who is this for? What do they already know?
- **Format and length**: Headings, prose, bullets, word count, file type?
- **Tone**: Formal, conversational, instructional, persuasive?
- **Source material**: Are there existing docs, notes, or references to draw from?
- **Definition of done**: Approved draft? Specific sections required?

### For research / analysis projects
- **Scope**: What specific questions need answering?
- **Depth vs. breadth**: Survey of the landscape, or deep dive on one thing?
- **Output format**: Summary, structured report, comparison table?
- **Sources**: Any preferred or required sources?

### For infrastructure / config projects
- **Current state**: What exists already? What's being replaced or added to?
- **Target state**: What should it look like when done?
- **Constraints**: Cloud provider, cost, tools already in use?
- **Rollback / safety**: Any risk of breaking existing things?

---

## Phase 3: Propose a Plan

Once you have enough context, write a concise plan before doing any work. Structure it as:

```
## Plan

**Goal:** [One sentence restatement]

**Approach:**
1. [Step one]
2. [Step two]
3. [Step three]
...

**Key decisions / tradeoffs:**
- [Any choices you're making and why]
- [Alternatives you're not taking and why]

**Risks / unknowns:**
- [What could go wrong or need clarification mid-task]

**Definition of done:**
- [What the finished output looks like]
```

Keep it scannable. The user should be able to read it in under a minute.

---

## Phase 4: Green Light Gate

End the plan with an explicit ask:

> "Does this look right? Any changes before I start?"

**Do not begin work until the user says yes** (or gives corrections). This is the whole point.

If the user says "just go for it" or seems impatient, you can compress phases 2–3 into a shorter version — but still do a quick restate-and-confirm before diving in.

---

## Existing Projects: Audit and Realignment

When invoked on a project already in progress, the phases shift from "plan what to build" to "assess what exists and agree on direction."

**Phase 1 becomes: Current-State Assessment**
Read the existing folder structure before asking anything. Then summarize:
- What the project appears to be
- What the current state of work is (nascent, mid-stream, nearly done, drifting)
- What feels unclear, inconsistent, or underdocumented

**Phase 2 becomes: Gap and Direction Questions**
- Is the current direction still right, or has scope changed?
- What's blocking progress or causing confusion?
- Are there artifacts, decisions, or context that exist only in someone's head and should be written down?
- What does "done" look like from here?

**Phase 3 becomes: Realignment Plan**
Same format as the standard plan, but lead with "Here's where things stand" before "Here's what I propose."

**Phase 4 (Green Light Gate) is unchanged.** Always confirm before making structural changes.

---

## Folder Structure

A project's folder structure should reflect its shape. Part of every kickoff — new or existing — is proposing or auditing the folder layout.

### Step 1: Read what exists
For existing projects, list the current folder structure before proposing changes. Note what's missing, misplaced, or unnamed.

### Step 2: Propose a structure
Match the folder layout to the project type. Common patterns:

**Writing / content project**
```
project/
├── brief/          # Goals, audience, tone, constraints
├── context/        # Source material, research, references
├── drafts/         # Versioned drafts
└── output/         # Final deliverable(s)
```

**Website / web app**
```
project/
├── brief/          # Goals, audience, scope
├── research/       # Competitive analysis, user research, references
├── design/         # Mockups, style guides, assets
├── src/            # Code
└── docs/           # Technical decisions, setup notes
```

**Research / analysis**
```
project/
├── brief/          # Questions to answer, scope, format
├── sources/        # Raw references, PDFs, links
├── notes/          # Synthesis, running observations
└── output/         # Final report or deliverable
```

**General / ambiguous**
```
project/
├── brief/          # What this is and why
├── context/        # Background, constraints, prior work
├── work/           # In-progress files
└── output/         # Final deliverables
```

### Folder conventions
- **`brief/`** — Always present. Contains the goal, constraints, audience, and definition of done. Even a single `brief.md` is better than nothing.
- **`context/`** or **`research/`** — Background material Claude or a collaborator needs to understand the project. For content-heavy projects, this folder may be large. For lightweight web projects, keep it lean.
- **`design/`** — For any project with visual or structural decisions: wireframes, style guides, component specs.
- **`output/`** — Final deliverables only. Not drafts.

### Step 3: Confirm before reorganizing
Propose the structure in the plan. Don't move or create files until the user confirms.

---

## Shortcuts and Adaptations

**If the user has already provided rich context**, skip intake questions you can answer yourself and go straight to the plan.

**If the task is time-sensitive or the user is clearly expert**, compress to: restate → one-sentence plan → go. But still restate.

**If you discover new ambiguity mid-task**, pause and surface it rather than guessing. A brief "Quick check before I continue — should X be Y or Z?" is much better than finishing the wrong thing.

**For iterative work** (continuing a prior session), start with a brief "Here's where we left off…" restatement before proposing next steps.

---

## CLAUDE.md: The Project Router

Every project should have a `CLAUDE.md` at its root. This is the first file Claude reads when entering a project, and it serves two purposes only: **hard rules** and **routing**. It is not documentation, not a summary, not a getting-started guide. Keep it short.

### What belongs in CLAUDE.md

**Hard rules** — constraints Claude must always follow in this project, stated tersely:
- Coding conventions ("Always use TypeScript strict mode", "No external dependencies without approval")
- Off-limits actions ("Never modify files in `/output` directly", "Don't commit to main")
- Tone or style mandates ("All copy must be written for an 8th-grade reading level")
- Approval gates ("Ask before adding new dependencies", "Confirm before restructuring folders")

**Routing** — where to load context from, keyed to what Claude is about to do:

```markdown
## Context routing

- Starting or resuming work → read `brief/brief.md` first
- Writing or editing copy → read `context/voice-and-tone.md`
- Working on the site → read `design/system.md` and `docs/architecture.md`
- Unsure what's in scope → read `brief/brief.md`
```

The routing table should be exhaustive enough that Claude always knows where to go next, but no longer.

### What does NOT belong in CLAUDE.md

- Background information (put it in `context/` or `brief/`)
- Full style guides (put them in `design/` or `context/`, reference from CLAUDE.md)
- Project history or decisions (put them in `docs/decisions.md` or similar)
- Anything Claude only needs to read once, not on every entry

### Generating the CLAUDE.md

As the final output of a kickoff, draft a `CLAUDE.md` that reflects:
1. The hard rules surfaced during intake
2. A routing table based on the agreed folder structure
3. Nothing else

For an existing project being audited, propose an updated `CLAUDE.md` that matches the current (or proposed) folder structure. If the project has no `CLAUDE.md` yet, creating one is a primary output of the audit.

### Example CLAUDE.md (website project)

```markdown
# CLAUDE.md

## Rules
- Never edit files in `output/` directly — copy from `drafts/` when ready
- All new components go in `src/components/`, not inline
- Ask before installing new npm packages
- Copy must match the voice guide before going to output

## Context routing
- Starting or resuming → read `brief/brief.md`
- Writing any copy → read `context/voice-and-tone.md`
- Building UI → read `design/system.md`
- Checking what's in scope → read `brief/scope.md`
- Understanding past decisions → read `docs/decisions.md`
```

---

## Anti-Patterns to Avoid

- **Diving straight in** without confirming scope — even when the request seems clear
- **Asking one question at a time** — batch them
- **Writing the plan inside a code block or artifact** before the user confirms — keep it in chat
- **Gold-plating** — building more than was agreed in the plan
- **Silent assumptions** — if you're making a significant choice (language, structure, approach), name it in the plan
