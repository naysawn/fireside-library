# Module Grading Rubric

The audit run on a module draft. **Gates** are pass/fail. **Advisories** are reported, not scored. There is no aggregate number, by design — see `Sites/pulse/docs/writing-with-ai.html` for why.

The grader's job is to check what is structurally missing or off-spec. Voice, tone, and prose-level judgment belong to the writer. AI never edits a writer's revision; if a gate fails, the grader produces a punch list and returns it to the writer.

---

## At a glance

- **5 gates** (pass/fail): Spec Coverage, Opening Questions, Closing Questions, Quotations, Mechanical
- **2 advisories** (counted, not scored): AI-pattern occurrences, Narrative-arc observations
- **1 writer self-check** (the writer answers, not the grader): "Do I recognize my own voice in this draft?"
- All five gates must pass for a draft to advance
- Run the grader in a fresh context. Never grade in the same conversation that drafted.

---

## How to use this rubric

1. **Fresh context.** Open a new conversation. The judge must not be the drafter.
2. **Spec-first.** If the module has no `spec:` block in its `metadata.yaml`, stop and tell the writer to write one. Without a spec, Coverage cannot be meaningfully audited.
3. **Run the gates.** For each gate, report pass / fail with the specific evidence. Failures are returned to the writer as a punch list. The grader never rewrites the writer's prose.
4. **Run the advisories.** Count and report the AI-pattern occurrences and the narrative-arc observations. The writer decides what to do with them.
5. **Write the report** to the module's `grades/` folder as `<draft-name>-<YYYY-MM-DD>.json`.

---

## The module spec

Every module declares what it intends to deliver in its `metadata.yaml` under `spec:`. The grader checks the draft against this declaration. Without a spec, Coverage falls back to generic checks and the grader is mostly useless.

```yaml
spec:
  brief: |
    One paragraph: who this module is for and what it teaches them.
  arc: |
    The intended journey. Where the reading opens, what it builds
    through, and where it lands. Captured during the bahai-module
    skill's arc-selection step.
  must_cover:
    - Concrete sub-topics, distinctions, or facts the module must include.
    - One per line, written so a reader can verify presence in the text.
  key_quotes:
    - source: Baha'u'llah
      reference: Prayers and Meditations
      gist: "Brief description of what the quote conveys."
  key_terms:
    - terms a newcomer wouldn't know that the module is responsible for defining
```

---

## The 5 gates

Each gate is **pass** or **fail**. There are no partial credits and no scores. A gate passes only if every check below it passes.

### Gate 1 — Spec Coverage

- [ ] Module has a `spec:` block in `metadata.yaml` (if not, this gate fails — write the spec first)
- [ ] Every item in `spec.must_cover` is substantively addressed in the reading
- [ ] The module follows the arc described in `spec.arc`
- [ ] Every term in `spec.key_terms` is defined the first time it appears

### Gate 2 — Opening Reflection Questions

Mirrors `bahai-module/SKILL.md:78`.

- [ ] Each section has an opening reflection block before the reading
- [ ] 2–3 questions per section
- [ ] Drawn from universal human experience — answerable regardless of faith background
- [ ] No Baha'i concepts introduced in the question stem (reader arrives from their own life first)
- [ ] Genuinely curious, not leading; no question telegraphs a "right" answer

### Gate 3 — Closing Discussion Questions

Mirrors `bahai-module/SKILL.md:93`.

- [ ] Each section has a closing discussion block after the reading
- [ ] 2–3 questions per section
- [ ] Require genuine reflection (not answerable in one sentence)
- [ ] Push into implications, tensions, or personal application
- [ ] At least one question per section connects the principle to lived experience
- [ ] No leading questions ("Don't you think…?" / "Wouldn't it be true that…?")

### Gate 4 — Quotations

- [ ] Quotes are from primary Baha'i sources (Baha'u'llah, Abdu'l-Baha, Shoghi Effendi, Universal House of Justice)
- [ ] At least 3–4 block quotes from source material (per `style.md:29`)
- [ ] Quotes distributed across the module, not clustered in one section
- [ ] Every quote in `spec.key_quotes` is included, or a clearly equivalent substitute is
- [ ] No paraphrase presented as a direct quote
- [ ] Each quote is integrated with prose (introduced or followed up, not orphaned)

### Gate 5 — Mechanical

- [ ] Each reading passage is 500–1000 words (per `bahai-module/SKILL.md:27`)
- [ ] Numbered references in text (e.g. `[1]`, `[2]`) for every quote
- [ ] Citations section exists at the end with full references
- [ ] Inline quotes are italicized (per `style.md:23`); block quotes are not
- [ ] `metadata.yaml` has `phase` set to discovery / investigation / consolidation

---

## The 2 advisories

The grader counts and reports these. **It does not subtract points or block advancement.** The writer reads the readout and decides what (if anything) to act on. These exist because surface patterns can be informative, but the published research is clear that optimizing prose against them is harmful (see `Sites/pulse/docs/writing-with-ai.html`).

### Advisory A — AI-pattern occurrences

The grader reports a **count and location** of each, not a score.

- Banned vocabulary occurrences (see list below)
- Em dashes
- Copula avoidance ("serves as," "stands as," "represents" where "is" would work)
- Rule-of-three lists (parallel triplets)
- Summary conclusions (final paragraphs that restate the opening)

**Banned vocabulary** (the writer decides whether each occurrence is earned):

```
delve, tapestry, multifaceted, landscape, journey, beacon, cornerstone,
moreover, furthermore, indeed, notably, it is worth noting, in essence,
at its core, transformative, foster, fostering, navigate, navigating,
underscore, underscores, paramount, pivotal, profound, profoundly,
realm, realm of, robust, robustly, seamless, seamlessly, holistic,
synergy, synergize, leverage, leveraging
```

### Advisory B — Narrative-arc observations

The grader names what it noticed; the writer decides if it matters.

- Paragraphs that appear to repeat ground covered elsewhere
- Sections where transitions feel abrupt
- Sections where the arc described in `spec.arc` and the actual flow diverge

---

## The writer self-check

This is not graded by the AI. The writer answers it at the end of revision.

- [ ] **I recognize my own voice in this draft.** If you do not, neither the grader nor the AI should be making prose decisions for you. Generate options, then choose. Never accept a wholesale revision.

---

## Judge prompt template

The `grade-module` slash command issues a prompt like this in a fresh context. Substitute the placeholders.

```
You are auditing a Baha'i study module draft against a rubric. Your role
is structural audit only. You do NOT rewrite, suggest rewrites, or score
voice/tone/style. You return a pass/fail verdict per gate plus an
advisory readout.

For each of the 5 gates:
  - Mark pass or fail
  - For every sub-item, quote 1–3 lines of text evidence from the draft
    that supports your verdict
  - If failing, write a one-line punch-list entry the writer can act on

For each of the 2 advisories:
  - List every occurrence with quoted location text
  - Do NOT recommend a fix. Just report.

Output JSON in the schema below.

--- RUBRIC ---
[full rubric inserted here]

--- SPEC (from metadata.yaml) ---
[spec block, or "MISSING — Gate 1 fails"]

--- DRAFT TO GRADE ---
[draft text]

--- OUTPUT SCHEMA ---
{
  "module_id": "13",
  "draft_version": "ai-draft-6",
  "graded_at": "2026-05-10T...",
  "rubric_version": 2,
  "gates": [
    {
      "name": "Spec Coverage",
      "passed": true,
      "sub_items": [
        { "text": "...", "passed": true, "evidence": "..." }
      ],
      "punch_list": []
    }
  ],
  "advisories": {
    "ai_patterns": [
      { "pattern": "banned_word", "match": "journey", "location": "..." }
    ],
    "narrative_arc": [
      { "observation": "...", "location": "..." }
    ]
  },
  "spec_missing": false,
  "all_gates_passed": true
}
```

---

## Versioning

This is **rubric version 2** — replaces the dimensional-scoring rubric (v1). When dimensions or gates change, bump the version. Old grades remain in `grades/` for history; the dashboard surfaces a "graded under old rubric" warning when versions diverge.

The change from v1 → v2 is documented in `Sites/pulse/docs/writing-with-ai.html`. Short version: v1 aggregated substantive and surface dimensions into a single 40-point score that could be (and was) gamed by AI iteration. v2 separates substantive gates from surface advisories and removes the aggregate number entirely.
