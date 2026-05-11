# Module Development Process

A module moves through seven phases from idea to publication. Each phase has a distinct purpose, a responsible party, and a gate that must be cleared before advancing. The cardinal rule: **never ask a single prompt or a single session to research, draft, and polish.** Separate the thinking from the writing from the judging.

---

## Phase 1 — Planning & Research (Group + Writer)

**Purpose:** Decide what to build and gather everything needed to build it.

**Who:** The planning group selects the topic; the assigned writer gathers source material.

### Steps

1. **Select the topic.** The group identifies modules for the next cycle based on the pipeline of seekers in their community. For each module, agree on:
   - The seeker phase (`discovery`, `investigation`, or `consolidation`)
   - 2 sections, 500–750 words each
   - Bullet points sketching what each section should cover
   - Questions from people at the grassroots ("What do seekers actually ask about this?")
   - A timeline, a paid professional writer, and a volunteer editor with grassroots contacts

2. **Gather source material.** The writer (with help from the editor and group) collects:
   - Authoritative Baha'i texts on the topic (books, letters, compilations)
   - Specific quotations from the Writings to weave into the reading passages
   - Any supplementary context (historical background, explanatory texts by Shoghi Effendi or the Universal House of Justice)
   - All source material goes in the module's `research/` folder

3. **Create the module folder.** Set up the folder structure and `metadata.yaml` with status `planning`.

### Gate
A module cannot advance to Phase 2 until:
- Source material is assembled in `research/`
- The group has agreed on 2 sections with bullet points
- Grassroots questions are documented
- `metadata.yaml` exists with correct phase and status

---

## Phase 2 — Interview & Architecture (Writer + AI)

**Purpose:** Establish the narrative structure before any prose is written. This is a conversation, not a drafting session.

**Who:** The writer runs the interview with Claude. No drafting happens here.

### Steps

1. **Run the interview.** Open a fresh context. Load the `bahai-module` skill. Answer its four interview questions:
   - What is the topic/theme?
   - Paste in the source material
   - Any specific quotations to include?
   - How many sections? (default 2)

2. **Review section divisions.** Claude proposes how to divide the material into sections (what each covers, why that arc makes sense). Adjust until the division feels right.

3. **Choose narrative arcs.** For each section, Claude proposes 3 candidate arcs (2–3 sentence summaries each). The writer picks one per section or combines elements. The arc is the spine of the reading passage; it determines what gets emphasized, what order ideas appear in, and where the passage lands emotionally.

4. **Sketch the question space.** Before any prose, briefly discuss what territory the opening reflection questions and closing discussion questions should cover. This is directional, not final. The actual questions come later (Phase 3, Step 3).

### Gate
A module cannot advance to Phase 3 until:
- Section divisions are confirmed
- One narrative arc per section is chosen
- The writer has a clear mental picture of what each section will argue or explore

### Why this phase is separate
The interview is a research and synthesis task. It requires divergent thinking (exploring options, weighing tradeoffs). Drafting requires convergent thinking (committing to sentences). Mixing them produces muddled prose and shallow structure. Keep them apart.

---

## Phase 3 — AI Drafting (Writer + AI)

**Purpose:** Produce a complete first draft: reading passages, questions, and citations.

**Who:** The writer directs Claude through drafting in a dedicated context. Each component is drafted and reviewed separately.

### Setup
Open a **fresh context** (not the interview context). Load:
- The chosen narrative arcs from Phase 2
- `brief/audience.md` (for the correct seeker phase persona)
- `brief/style.md` (voice rules, anti-AI-tell checklist, quotation formatting)
- `brief/voice.md` and `brief/samples/` (Voice DNA, if available)
- The source material from `research/`

### Steps

1. **Draft Section 1 reading passage.** Claude writes only the reading passage for Section 1 (no questions yet). The writer reviews, iterates, adjusts until the passage:
   - Follows the chosen narrative arc
   - Stays within 500–750 words
   - Integrates quotations naturally (inline + 3–4 block quotes across the full module)
   - Meets the style guide checklist (no em dashes, no AI-tell words, 10th-grade reading level, analogies from nature)

2. **Draft Section 2 reading passage.** Same process. Do not draft both sections in a single prompt; the second benefits from seeing how the first landed.

3. **Draft questions.** Once both passages are approved, Claude proposes:
   - 10 candidate opening reflection questions
   - 10 candidate closing discussion questions
   
   The writer selects 3 opening + 3 closing per section (12 total from the pool of 20). Questions must meet the criteria in the skill:
   - Opening: universal human experience, no Baha'i vocabulary, genuinely curious
   - Closing: hold tension, require real reflection, at least one per section connects principle to lived experience

4. **Assemble citations.** Claude compiles all quotations used across both sections into a numbered citations list with full source attribution.

5. **Collate.** Claude assembles the complete module in the standard output format and saves it as `drafts/ai-draft.md`. Update `metadata.yaml` status to `drafting`.

### Gate
A module cannot advance to Phase 4 until `drafts/ai-draft.md` exists with all components:
- 2 sections, each with 3 opening questions, a reading passage, and 3 closing questions
- All quotations cited with numbered references
- A complete citations section at the end

### Why this phase is separate
Drafting with Voice DNA loaded and style rules active is a different cognitive mode than the architectural thinking in Phase 2. A fresh context prevents the drafting prompt from being cluttered with rejected arcs, abandoned directions, and interview back-and-forth. The draft is better because the prompt is focused.

---

## Phase 4 — Score & Humanize (Writer + AI)

**Purpose:** Objectively evaluate the AI draft against the rubric and remove AI artifacts before human review.

**Who:** The writer runs the grading and humanization tools. This must happen in a **fresh context**, separate from the drafting context, so the judge has no memory of the drafting rationale and evaluates the text on its own merits.

### Steps

1. **Grade the draft.** Run `/grade-module <NN>` against `drafts/ai-draft.md`. A subagent scores the draft in fresh context on 8 dimensions (5 points each, 40 total):
   - Topical Coverage / Depth (categorical gate, must score ≥ 4/5)
   - Opening Reflection Questions
   - Closing Discussion Questions
   - Quotations
   - Length
   - AI Tells (negative check)
   - Voice & Tone (positive check)
   - Narrative Arc & Flow

   The output is a timestamped JSON in `grades/` (e.g. `grades/ai-draft-2026-05-10.json`). See `brief/rubric.md` for the full rubric.

2. **Check the gate score.** The draft must score **32/40 or higher** AND Topical Coverage ≥ 4/5 to proceed. If it scores below 32 or Coverage fails:
   - Read the report's dimension-level feedback
   - Return to Phase 3 with specific revision targets
   - Re-draft only the failing components (not the whole module)
   - Re-grade until 28+ is achieved

3. **Run the humanizer.** Apply the humanizer tool to the draft. This pass specifically targets:
   - AI rhythmic patterns (overly parallel constructions, predictable cadence)
   - Residual AI-tell words or phrases missed during drafting
   - Sentence variety (break up monotonous structures)
   - Natural imperfections that make prose feel human-written
   
   Save the humanized version as `drafts/v1.md`.

4. **Read aloud.** The writer (a human) reads the humanized draft aloud. If any sentence sounds robotic, flat, or predictable, flag it for the editor. This is a human step that no AI tool replaces.

### Gate
A module cannot advance to Phase 5 until:
- The latest grade in `grades/` shows a total of 32/40 or higher AND Topical Coverage ≥ 4/5
- `drafts/v1.md` exists (humanized version)
- The writer has read it aloud and is satisfied it sounds natural

### Why this phase is separate
The judge must not be the drafter. When a model grades its own output in the same context, it is biased toward leniency (it remembers why it made each choice). A fresh context with only the rubric and the text produces honest scores. Similarly, humanization is an editing task, not a drafting task; it works better when the humanizer can see the patterns without the drafting intent coloring its perception.

---

## Phase 5 — Editorial Review (Editor)

**Purpose:** A human editor with grassroots experience evaluates the draft for substance, not style.

**Who:** The volunteer editor. This is an entirely human phase.

### What the editor evaluates

- **Arc:** Does the narrative arc of each section land? Does it build toward something meaningful, or does it meander?
- **Source material:** Is there better source material the writer should leverage? Are the chosen quotations the strongest available for this topic?
- **Emphasis:** What overall principles should be better emphasized given the seeker phase and audience?
- **Grassroots relevance:** Does the module address the actual questions seekers are asking? Does it speak to their real concerns, doubts, and interests?
- **Hard questions:** For investigation-phase modules especially, does the module surface the difficult questions a thoughtful skeptic would raise? Or does it dodge them?
- **Tone check:** Does it feel warm and inviting, or does it slip into preaching, lecturing, or recruiting?

### What the editor delivers
A written set of feedback notes. These are directional ("Section 2 needs to address X more directly," "The closing question about Y feels leading"), not line-edits. The editor is shaping the module, not copyediting it.

### Gate
A module cannot advance to Phase 6 until the editor has provided written feedback and the writer has acknowledged it.

---

## Phase 6 — Rewrite (Writer)

**Purpose:** The writer produces the real module. AI may assist, but the finished product should read as if a human wrote every sentence.

**Who:** The writer, with optional AI assistance for specific tasks.

### Steps

1. **Internalize the feedback.** Read the editor's notes. Understand not just what to change but why.

2. **Rewrite in your own voice.** This is the most important step in the entire process. The AI draft was a starting point, not a finished product. The writer should:
   - Restructure passages where the editor flagged arc problems
   - Swap in stronger quotations where the editor suggested better sources
   - Rewrite sentences in their own natural voice (not just edit the AI's sentences)
   - Address grassroots questions the editor raised
   - Surface hard questions for investigation-phase modules

3. **Use AI selectively.** AI can help with:
   - Finding specific quotations in source material
   - Checking citation formatting
   - Suggesting alternative phrasings for a sentence the writer is stuck on
   - Verifying reading level
   
   AI should **not** be asked to rewrite whole sections. That defeats the purpose of this phase.

4. **Save as next version.** Save the rewrite as `drafts/v2.md` (or the next version number). Update `metadata.yaml` status to `rewrite`.

### Gate
A module cannot advance to Phase 7 until `drafts/v2.md` (or later) exists and the writer considers it ready for final scoring.

---

## Phase 7 — Final Score, Beta & Ship (Writer + AI + Group)

**Purpose:** Validate the rewrite meets publication quality, then test it in the field.

**Who:** The writer runs the final grade; the group manages beta testing and publication.

### Steps

1. **Final grade.** Run `/grade-module <NN>` against the rewrite (`drafts/v2.md` or latest) in a fresh context. The rewrite must score **36/40 or higher** AND Topical Coverage ≥ 4/5 to proceed to beta.
   - If below 36: return to Phase 6 with the report's feedback. Rewrite and re-grade.
   - If the score is stuck between 32–35 after multiple rewrites, the editor and writer should discuss whether the module needs a structural rethink (back to Phase 2) or targeted fixes.

2. **Beta publication.** Publish the module on the website with a beta label. Update `metadata.yaml` status to `beta`.

3. **Field testing.** The module must be used in at least 2 group study sessions. After each session, collect feedback:
   - Did the opening questions land? Did people engage?
   - Were the reading passages clear? Did anything confuse people?
   - Did the discussion questions generate real conversation, or did they fall flat?
   - Was the module too long, too short, or about right?
   - What did seekers specifically respond to? What did they push back on?
   
   Written feedback goes back to the writer. Update `metadata.yaml` status to `testing`.

4. **Incorporate feedback.** The writer produces a final version incorporating field feedback. Save as the next draft version.

5. **Publish as v1.** Copy the approved draft to `final.md`. Update `metadata.yaml` status to `v1`. Remove the beta label on the website.

### Gate
A module reaches v1 status when:
- Final grade is 36/40 or higher AND Topical Coverage ≥ 4/5
- It has been tested in at least 2 group sessions
- Field feedback has been incorporated
- `final.md` exists

---

## Summary

| Phase | Who | Purpose | Gate |
|-------|-----|---------|------|
| 1. Planning & Research | Group + Writer | Decide what to build, gather sources | Source material assembled, sections agreed |
| 2. Interview & Architecture | Writer + AI | Establish structure, choose arcs | Arcs confirmed, no prose yet |
| 3. AI Drafting | Writer + AI | Produce complete first draft | `ai-draft.md` with all components |
| 4. Score & Humanize | Writer + AI | Grade against rubric, remove AI tells | 32/40+ & Coverage ≥ 4, `v1.md` exists, read aloud |
| 5. Editorial Review | Editor | Substance review from grassroots perspective | Written feedback delivered |
| 6. Rewrite | Writer | Human-voiced final draft | `v2.md` exists, writer satisfied |
| 7. Final Score, Beta & Ship | Writer + AI + Group | Validate quality, field test, publish | 36/40+ & Coverage ≥ 4, 2 field tests, `final.md` |

## Key Principles

**Separate thinking from writing from judging.** The interview (Phase 2) is for exploring. The draft (Phase 3) is for committing. The grade (Phase 4) is for evaluating. Never combine them in a single prompt or context.

**Fresh contexts are not optional.** Phase 2 (interview), Phase 3 (drafting), and Phase 4 (grading) each require their own context. A model that drafts and then judges its own work in the same session is biased. A model that interviews and then drafts in the same session carries rejected ideas as dead weight.

**The AI draft is a starting point.** Phase 6 exists because no AI draft, however well-prompted, sounds like a human wrote it. The writer's job is to make the module theirs. If the published module reads like "AI text with human edits," the process has failed.

**Gates protect quality.** Skipping the 32/40 gate sends a weak draft to an editor who wastes time on problems the rubric would have caught. Skipping field testing publishes untested assumptions about what seekers need. Every gate exists because someone learned the hard way what happens without it.

**The module is a scaffold, not a monologue.** The reading passage is 500–1000 words because the real learning happens in the discussion around it. Two Baha'is and two seekers in a room, talking honestly about questions that matter. The module's job is to set that conversation up well.

## Complementary Resources

- A library of source materials (digital e-books) is collected on a Google Drive
- A website to publish modules is maintained in the `web/` directory of this repo
