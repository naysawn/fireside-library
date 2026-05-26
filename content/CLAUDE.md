# CLAUDE.md

## Rules

- Never invent or fabricate Baha'i quotations — all source material is provided by the contributor
- Write **Baha'i** with its apostrophe; write names like **Baha'u'llah**, **Abdu'l-Baha**, **Shoghi Effendi** without diacritical marks
- AI-generated drafts go in `drafts/ai-draft.md` — never overwrite a writer's revision (`v1.md`, `v2.md`, etc.)
- Do not modify `final.md` directly — copy from `drafts/` when the writer approves
- Each fireside is self-contained: its research, drafts, report, and final output all live in its own folder under `firesides/`
- Update `metadata.yaml` status when a fireside moves between stages: planning → drafting → review → rewrite → beta → testing → v1
- Ask before creating a new fireside folder or renaming an existing one

## Writing firesides

When drafting, rewriting, or revising any fireside content:

- Use the `bahai-module` skill to structure the fireside (sections, format, lifecycle)
- Then run the `humanizer` skill on the draft to strip AI-tells before saving

### Audience

Write for **newcomers to the Baha'i Faith** with a **high-school-completed reading level**. Avoid jargon, assumed insider context, or academic register. Define terms the first time they appear.

### Reference samples to emulate

These two drafts set the tone, pacing, and voice target. Read them before drafting:

- [04-developing-a-relationship-with-god/drafts/V1.md](firesides/04-developing-a-relationship-with-god/drafts/V1.md)
- [09-the-bahai-faith-and-christianity/drafts/V1.md](firesides/09-the-bahai-faith-and-christianity/drafts/V1.md)

## Phases

Each fireside is tagged with a seeker phase: `discovery`, `investigation`, or `consolidation`. See `brief/audience.md` for persona definitions.

## Context routing

- Starting or resuming work on a fireside → read that fireside's `metadata.yaml` and `research/` folder in `firesides/`
- Writing or drafting a fireside → read `brief/audience.md` and `brief/style.md`, review the reference samples above, then use the `bahai-module` skill followed by the `humanizer` skill
- Grading or evaluating a fireside → use the `grade-module` skill (generates `report.html` in the fireside folder)
- Understanding the process and lifecycle → read `brief/process.md`
- Understanding who the firesides are for → read `brief/audience.md`
- Calibrating writing tone and style → read `brief/style.md`, `brief/voice.md`, and examples in `brief/samples/`
- Understanding the fireside format → read `.claude/skills/bahai-module/SKILL.md`
- Checking fireside status → read `metadata.yaml` in the relevant fireside folder under `firesides/`
- Reviewing cross-fireside analysis → read files in `analysis/`
