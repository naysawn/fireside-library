# Fireside Library

Baha'i written materials to have firesides and the website that publishes them.

## Goals

Fireside Library is a collection of standalone written firesides for small groups of Baha'is and seekers exploring the Faith together. Each fireside is written for newcomers are a high-school reading level. 

The project aims to:

- **Make it easier to directly teach the Baha'i Faith.** Conversations are at the heart of growing the Baha'i community. These are tools to have direct convesations about topics of meaning. 

- **Build a vetted, repeatable library.** Every written text can be used from group to group and reduces the barrier to sitting with somebody to speak directly about the Baha'i Faith.

- **Keep authoring and publishing separate but connected.** Writers work in
  plain Markdown; the website renders whatever the writers ship without them
  needing to touch web code.

## The split: content vs. web

This is a monorepo with two areas that are deliberately decoupled.

| Area        | What it is                                                                 | 
| :---------- | :------------------------------------------------------------------------- | 
| `content/`  | The fireside materials themselves
| `web/`      | The publishing website (Astro) that turns those drafts into a static site. 

**How they connect:** the site reads the content folder directly at build time (`web/src/lib/firesides.ts`). For each fireside it picks the latest draft — preferring `final.md`, then the highest `v*.md`, then the highest `ai-draft-*.md` — strips `%%…%%` editorial comments, reads `metadata.yaml`, and skips any entry marked `hidden: true`. Writers never edit web code; publishing a new revision is just committing a new draft file.

```
fireside-library/
├── content/                 # AUTHORING — writers & editors live here
│   ├── brief/               # Audience, process, style guide, voice, samples
│   ├── analysis/            # Cross-fireside reviews and proposals
│   └── firesides/           # Numbered fireside folders (self-contained)
│       └── 08-prayer/
│           ├── metadata.yaml   # Title, phase, topics, status, hidden flag
│           ├── research/       # Source material (encrypted — see below)
│           ├── drafts/         # ai-draft-*.md, v1.md, v2.md…
│           ├── final.md        # Approved fireside (optional)
│           └── report.html     # Generated grading report
├── web/                     # PUBLISHING — Astro static site
├── CLAUDE.md                # Top-level routing
├── TODO.md                  # Shared tracking across content and web
└── README.md
```

## State of the firesides

13 firesides exist today. Status is tracked in each fireside's `metadata.yaml`
and follows the lifecycle stages above. Firesides 11 and 12 are pasted House
letters rather than true firesides; they're marked `hidden` (excluded from the
site) and queued for a full rewrite.

| #  | Fireside                              | Phase         | Status     | Notes                                  |
| :- | :------------------------------------ | :------------ | :--------- | :------------------------------------- |
| 01 | Overview of the Baha'i Faith          | investigation | beta       |                                        |
| 02 | Baha'i Spiritual Principles           | investigation | beta       |                                        |
| 03 | Baha'i Social Teachings               | investigation | beta       |                                        |
| 04 | Developing a Relationship with God    | investigation | beta       |                                        |
| 05 | The Bab and Baha'u'llah               | investigation | beta       |                                        |
| 06 | The Centers of the Covenant           | investigation | beta       |                                        |
| 07 | Making Sense of a Turbulent World     | investigation | beta       |                                        |
| 08 | Prayer                                | discovery     | beta       | Reference benchmark for voice & format |
| 09 | The Baha'i Faith and Christianity     | investigation | beta       |                                        |
| 10 | The Baha'i Administrative Order       | consolidation | beta       |                                        |
| 11 | Suffering and Justice                 | investigation | research   | `hidden` — needs rewrite from source   |
| 12 | Non-Involvement in Partisan Politics  | investigation | research   | `hidden` — needs rewrite from source   |
| 13 | Spiritual Development                  | investigation | beta       |                                        |

**Phases** mark the seeker the fireside is written for — `discovery` (first
visit), `investigation` (actively exploring), or `consolidation` (committed and
learning to participate). See `content/brief/audience.md` for the personas.

Revision priorities and the full implementation plan live in
[`TODO.md`](TODO.md).

## Where to go next

- Working on fireside content → [`content/CLAUDE.md`](content/CLAUDE.md)
- Working on the website → [`web/README.md`](web/README.md)
- Tracking work across both → [`TODO.md`](TODO.md)
- Repository structure and routing → [`CLAUDE.md`](CLAUDE.md)

## Research material (encrypted)

Per-fireside source material under `content/firesides/*/research/` (PDFs, transcripts, quote dumps) is third-party copyrighted material and is encrypted with [git-crypt](https://github.com/AGWA/git-crypt). Everything else in the repo is plaintext.

These files are committed as ciphertext and are not readable without the symmetric key. Maintainers with the key decrypt a clone once:

```sh
# install git-crypt (macOS)
brew install git-crypt

# unlock a fresh clone (run once per clone/machine)
git-crypt unlock ~/.config/git-crypt/fireside-library.key
```

After unlocking, encryption and decryption are automatic — files added to any
`research/` folder are encrypted on commit and readable in the working tree.

The key lives only in the maintainer's password manager and at
`~/.config/git-crypt/fireside-library.key`. It is never committed. **Without it,
the research material is unrecoverable** — back it up.
