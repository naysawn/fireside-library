# Editing firesides through Pages CMS

This repo is wired for [Pages CMS](https://pagescms.org) so non-technical writers can
add and improve firesides from a visual editor — no Git, no terminal, no GitHub account.
Config lives in [`.pages.yml`](.pages.yml).

## One-time setup (admin)

1. Sign in to [app.pagescms.org](https://app.pagescms.org) with GitHub and pick this repo.
2. Create a `content` branch (writers work here; the site builds from `main`).
3. Invite each writer by **email** under Collaborators. They get a magic-link login —
   no GitHub account needed.
4. Make sure `.pages.yml` exists on **both** `main` and `content` (Pages CMS reads it per branch).

## How a writer works

1. Open the email invite → land in a clean editor pointed at the `content` branch.
2. **Fireside details** — edit a fireside's title, status, phase, and topics (a simple form).
3. **Fireside text (drafts)** — open a fireside folder → `drafts/` → edit the draft markdown.
   Each save is one commit, stamped with the writer's own name.
4. Move `status` to `review` when it's ready for an editor.

## How an editor works

1. Skim the change on the `content` branch (GitHub diff or the in-app history).
2. When good, promote the chosen draft to `final.md` (the build prefers it) and merge
   `content` → `main`. Vercel rebuilds. Writers never touch `main` or see a pull request.

Per-writer attribution and commit messages are configured in `.pages.yml`
(`settings.commit.identity: user`), so history shows exactly who changed what.
Writers and editors can also leave inline comments in Pages CMS, GitHub review
comments on the diff, or `%%…%%` notes in the draft (stripped at build).

## Known seams (Option A — fit the CMS to the current model)

We kept the existing folder model (`NN-slug/metadata.yaml` + `drafts/*.md`) and the
build untouched, which costs a little CMS polish:

- **Two collections, not one entry.** Metadata and body live in separate files, so a
  fireside is edited in two places ("Fireside details" + "Fireside text"). Pages CMS
  shows one file per entry, so they can't be merged into a single form without a migration.
- **Drafts list shows every variant.** `v1.md`, `v2.md`, `ai-draft-*.md` etc. all appear
  under each fireside's `drafts/` folder. Writers pick the right one — it mirrors the repo.
- **Cleaner option later (Option B):** migrate each fireside to a single markdown file with
  frontmatter and simplify `web/src/lib/firesides.ts`. That gives one tidy entry per fireside
  in the CMS. It's a one-time content migration + loader change — worth doing if the two-file
  seam annoys writers.

## ⚠️ Needs a human decision

There's a stray `content/firesides/metadata.yaml` at the top level (a duplicate of
fireside 11, "Suffering and Justice") that sits outside any fireside folder. It will show
up as a loose entry in the "Fireside details" list. It looks misplaced, but I didn't
delete it — confirm whether it should be removed or relocated.

## Roadmap

- **Self-host the CMS (fork on Vercel).** Pages CMS is MIT; owning the instance unlocks
  two things the hosted `app.pagescms.org` doesn't:
  - **Theme the editor.** It's TipTap + Tailwind — restyle
    `fields/core/rich-text/edit-component.css` (editor typography) and `app/globals.css`
    (brand tokens) so the WYSIWYG **previews the published page** (serif, sizing, quote
    styling) and writers see near-final output.
  - **Contributor governance.** Control the auth/invite flow and the collaborator DB.
    The `collaborator` table already carries a nullable **`branch`** column, so writers
    can be **locked to a specific branch** (e.g. each contributor on their own, or all on
    `content`). There's no role column upstream, so **custom roles/permissions** would be
    a fork addition. This is the path if contributor count or access control grows beyond
    a few trusted people.

  Trade-off: owning the fork means keeping it in sync with upstream. *Long-term; not urgent.*

- **Sections-as-blocks + thought progression** (deferred design idea). Model a fireside
  body as a list of section blocks, each with a structured "thought progression" field —
  moving the `<!-- ARC -->` planning out of prose (also fixes WYSIWYG round-trip fidelity)
  and giving writers a guided template. Pairs with collapsing to one file per fireside.
  Would require reworking `firesides.ts` to assemble blocks → HTML and a manual content
  split. *Prototype on one fireside before committing.*

- **One file per fireside (Option B).** If the two-collection seam or the draft-title
  duplication starts to grate, collapse each fireside to a single frontmatter file
  (title = the canonical meta title, versioning → Git history). Resolves the
  title/versioning tension cleanly. *Bigger migration; revisit if the seam bites.*
