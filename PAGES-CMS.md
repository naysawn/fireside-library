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
