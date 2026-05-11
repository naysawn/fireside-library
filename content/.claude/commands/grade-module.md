---
description: Audit a module draft against the rubric. Returns pass/fail per gate plus advisory readout. No aggregate score.
argument-hint: <module-number>
allowed-tools: Read, Write, Bash, Glob, Task
---

Audit module **$ARGUMENTS** against the rubric at `content/brief/rubric.md`.

**Important:** The audit is structural. The grader checks what is missing or off-spec. It does **not** rewrite the writer's prose, score voice, or aggregate dimensions into a number. If gates fail, the output is a punch list the writer addresses.

The audit must run in a **fresh context** — use the Task tool to launch a `general-purpose` subagent with the prompt below.

## Subagent prompt

> You are auditing a Baha'i study module draft. Your role is **structural audit only**. You do NOT rewrite, suggest wholesale rewrites, or score voice/tone/style. You return pass/fail per gate plus an advisory readout.
>
> ### Inputs to read
> 1. The rubric: `content/brief/rubric.md` — read in full. Note this is rubric v2 (gates + advisories, no aggregate score).
> 2. The module folder: find with `ls content/modules/ | grep "^$ARGUMENTS-"`
> 3. The module's `metadata.yaml` — especially the `spec:` block. **If there is no spec, Gate 1 fails automatically and the audit reports this clearly.**
> 4. The latest draft in `drafts/`. Prefer in this order: `v3.md`, `v2.md`, `v1.md`, `V1.md`, `ai-draft.md`, then any `ai-draft-N.md` (highest N).
>
> ### Steps
> 1. **Spec check first.** If `metadata.yaml` has no `spec:` block, write a report with `spec_missing: true` and `all_gates_passed: false`. Tell the writer to write a spec before re-auditing. Stop here.
> 2. **Run each of the 5 gates** (Spec Coverage, Opening Questions, Closing Questions, Quotations, Mechanical). For each sub-item: mark pass or fail and quote 1–3 lines of text evidence from the draft. If the gate fails, write one-line punch-list entries the writer can act on directly.
> 3. **Run the 2 advisories** (AI-pattern occurrences, Narrative-arc observations). For each, list every occurrence with quoted location text. Do not recommend fixes. Do not score. Just report.
> 4. **Write the report** to `content/modules/<module-folder>/grades/<draft-name>-<YYYY-MM-DD>.json` (create `grades/` if needed). If a file with that name exists, append `-1`, `-2`, etc. Use the JSON schema at the end of the rubric.
>
> ### What you do not do
> - Do not assign scores to individual gates. Pass or fail only.
> - Do not aggregate into a total. There is no number.
> - Do not score voice, tone, or style. The writer owns those judgments.
> - Do not recommend rewrites of the writer's prose. If a gate fails, write what is missing; the writer fixes it.
> - Do not suggest "how to" replace banned words. Report the count and location; the writer decides.
>
> ### Output
>
> JSON only, valid syntax, matching the schema in the rubric.
>
> Then return a brief plaintext summary:
> - Gates passed: N of 5 (list the failing ones if any)
> - Spec present: yes/no
> - AI-pattern occurrences: count
> - Narrative-arc observations: count
> - The file path you wrote
>
> Keep the plaintext summary under 200 words. The JSON file is canonical.

After the subagent finishes, relay its summary back so the user sees the gate verdicts and counts.
