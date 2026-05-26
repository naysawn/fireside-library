# TODO

Shared tracking across content and web. Updated May 2026.

See `content/analysis/process-upgrade-proposal.html` for full implementation plan with details.

---

## Current: Implementation Plan

### Phase 1: Restructure Folders
- [x] Create `content/firesides/` and move all 12 numbered fireside folders into it
- [x] Rename `content/research/` to `content/analysis/`
- [x] Move `app-plan.md` and architecture PNG to `web/research/`
- [x] Move `project-kickoff` skill to repo-level `.claude/skills/`
- [x] Move `TODO.md` to repo root as shared tracker
- [x] Update root `CLAUDE.md` routing
- [x] Update `content/CLAUDE.md` routing
- [x] Update `README.md`

### Phase 2: Skills
- [ ] Update `bahai-module` SKILL.md — add voice.md reference, phase-aware audience question, anti-pattern block
- [ ] Create `content/.claude/skills/grade-module/` — reads rubric, scores draft, generates `report.html` per fireside
- [ ] Install `humanizer` at `.claude/skills/` — adapt from blader/humanizer, configure with voice samples

### Phase 3: Brief Files
- [ ] Create `content/brief/rubric.md` — 7-dimension grading rubric with calibration examples and judge prompt
- [ ] Create `content/brief/samples/08-prayer-v2.md` — copy Fireside 08 v2 as benchmark
- [ ] Create `content/brief/voice.md` — Voice DNA document (exemplar paragraphs, rhythm, analogy style, how to handle difficulty)
- [ ] Update `content/brief/style.md` — add structural tells, rhythm requirements, permitted imperfections, expanded banned words
- [ ] Update `content/brief/process.md` — add Phase 2.5 (humanize + grade), Phase 4.5 (final grade), skeptic's checklist to Phase 3

### Phase 4: Proof of Concept
- [ ] Grade Fireside 08 (Prayer) — should score 32+/35, validates rubric calibration
- [ ] Grade Fireside 04 (Relationship with God) — should score below 28, validates rubric discriminates
- [ ] Run humanizer on a passage from Fireside 07 — test voice matching
- [ ] Adjust rubric/skills based on results

### Phase 5: Roll Out
- [ ] Grade all 12 firesides, generate `report.html` for each
- [ ] Update this TODO with revision priorities based on grading results

### Phase 6: Separate Writer/Editor Repo
- [ ] Create `fireside-library-content` repo on GitHub — just the numbered fireside folders + a contributor README
- [ ] Write `content/firesides/README.md` — writer-facing guide (fireside folder structure, draft versioning, where to put source material)
- [ ] Push current `content/firesides/` content to the new repo
- [ ] Create a sync script (`scripts/sync-firesides.sh`) to pull writer's changes into this monorepo
- [ ] Invite writer and editor as collaborators on the content repo only
- [ ] Set up branch protection on the content repo (require PR, at least 1 review)

---

## Fireside Revisions (priority order from critical review)

### Tier 1 — Rewrite
- [ ] Fireside 11: Suffering and Justice — not a fireside (pasted letter). Rewrite using letter as source material.
- [ ] Fireside 12: Non-Involvement in Partisan Politics — not a fireside (pasted letter, 11 comprehension Qs). Rewrite.

### Tier 2 — Significant Revision
- [ ] Fireside 07: Making Sense of a Turbulent World — claims-as-fact, too long, labels atheism as "dark force"
- [ ] Fireside 04: Developing a Relationship with God — underdeveloped, 0 block quotes, no citations, Section 2 is a quote list

### Tier 3 — Moderate Revision
- [ ] Fireside 02: Baha'i Spiritual Principles — afterlife stated as flat fact, practices section reads as onboarding
- [ ] Fireside 05: The Bab and Baha'u'llah — hagiographic tone, 0 block quotes, no citations
- [ ] Fireside 06: Centers of the Covenant — no opening questions, UHJ gender issue dismissed

### Tier 4 — Polish
- [ ] Fireside 01: Overview of the Baha'i Faith — style guide cleanup, add citations
- [ ] Fireside 03: Baha'i Social Teachings — too long (~4200 words), consider splitting
- [ ] Fireside 09: The Baha'i Faith and Christianity — too long (~4600 words), consider splitting
- [ ] Fireside 10: The Baha'i Administrative Order — add block quotes, add citations

### Benchmark
- [ ] Fireside 08: Prayer — resolve writer's %%FLAG%%, otherwise the model fireside

---

## Editorial Cleanup (applies to all firesides during revision)

- [ ] Convert longer quotations to block quotes
- [ ] Apply expanded style guide (em dashes, AI tells, structural patterns, citations, acceptance criteria)
- [ ] Ensure 3+3 question format per section
- [ ] Add citations sections to all firesides

---

## Web App

- [ ] Publishing website for firesides
- [ ] PDF generation pipeline
- [ ] Fireside dashboard (reads per-fireside report.html, shows collection health at a glance)

---

## Project Setup (next cycle)

- [ ] Identify firesides for the current cycle
- [ ] Assign writers and editors
- [ ] Set timelines per fireside
- [ ] Collect grassroots questions to inform content
- [ ] Google Drive library of source materials
