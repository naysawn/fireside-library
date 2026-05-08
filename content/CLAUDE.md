# CLAUDE.md

## Rules

- Never invent or fabricate Baha'i quotations — all source material is provided by the contributor
- Write **Baha'i** with its apostrophe; write names like **Baha'u'llah**, **Abdu'l-Baha**, **Shoghi Effendi** without diacritical marks
- AI-generated drafts go in `drafts/ai-draft.md` — never overwrite a writer's revision (`v1.md`, `v2.md`, etc.)
- Do not modify `final.md` directly — copy from `drafts/` when the writer approves
- Each module is self-contained: its research, drafts, report, and final output all live in its own folder under `modules/`
- Update `metadata.yaml` status when a module moves between stages: planning → drafting → review → rewrite → beta → testing → v1
- Ask before creating a new module folder or renaming an existing one

## Writing modules

When drafting, rewriting, or revising any module content:

- Use the `bahai-module` skill to structure the module (sections, format, lifecycle)
- Then run the `humanizer` skill on the draft to strip AI-tells before saving

### Audience

Write for **newcomers to the Baha'i Faith** with a **high-school-completed reading level**. Avoid jargon, assumed insider context, or academic register. Define terms the first time they appear.

### Reference samples to emulate

These two drafts set the tone, pacing, and voice target. Read them before drafting:

- [04-developing-a-relationship-with-god/drafts/V1.md](modules/04-developing-a-relationship-with-god/drafts/V1.md)
- [09-the-bahai-faith-and-christianity/drafts/V1.md](modules/09-the-bahai-faith-and-christianity/drafts/V1.md)

## Phases

Each module is tagged with a seeker phase: `discovery`, `investigation`, or `consolidation`. See `brief/audience.md` for persona definitions.

## Context routing

- Starting or resuming work on a module → read that module's `metadata.yaml` and `research/` folder in `modules/`
- Writing or drafting a module → read `brief/audience.md` and `brief/style.md`, review the reference samples above, then use the `bahai-module` skill followed by the `humanizer` skill
- Grading or evaluating a module → use the `grade-module` skill (generates `report.html` in the module folder)
- Understanding the process and lifecycle → read `brief/process.md`
- Understanding who the modules are for → read `brief/audience.md`
- Calibrating writing tone and style → read `brief/style.md`, `brief/voice.md`, and examples in `brief/samples/`
- Understanding the module format → read `.claude/skills/bahai-module/SKILL.md`
- Checking module status → read `metadata.yaml` in the relevant module folder under `modules/`
- Reviewing cross-module analysis → read files in `analysis/`
