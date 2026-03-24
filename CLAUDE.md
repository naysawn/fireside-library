# CLAUDE.md

## Rules

- Never invent or fabricate Baha'i quotations — all source material is provided by the contributor
- Write **Baha'i** with its apostrophe; write names like **Baha'u'llah**, **Abdu'l-Baha**, **Shoghi Effendi** without diacritical marks
- AI-generated drafts go in `drafts/ai-draft.md` — never overwrite a writer's revision (`v1.md`, `v2.md`, etc.)
- Do not modify `final.md` directly — copy from `drafts/` when the writer approves
- Each module is self-contained: its research, drafts, and final output all live in its own folder
- Update `metadata.yaml` status when a module moves between stages: planning → drafting → review → rewrite → beta → testing → v1
- Ask before creating a new module folder or renaming an existing one

## Phases

Each module is tagged with a seeker phase: `discovery`, `investigation`, or `consolidation`.

## Context routing

- Starting or resuming work on a module → read that module's `metadata.yaml` and `research/` folder
- Writing or drafting a module → read `brief/audience.md` and `brief/samples/`, then use the `bahai-module` skill
- Understanding the process and lifecycle → read `brief/process.md`
- Understanding who the modules are for → read `brief/audience.md`
- Calibrating writing tone → read examples in `brief/samples/`
- Kicking off a new project or restructuring → use the `project-kickoff` skill
- Understanding the module format → read `.claude/skills/bahai-module/SKILL.md`
- Checking module status → read `metadata.yaml` in the relevant module folder
