# Baha'i Educational Modules

A collection of structured study modules designed for small group discussions exploring the Baha'i Faith. Each module is a standalone 2-section reading with reflection and discussion questions, written for a mixed group of Baha'is and seekers.

## Repo Structure

```
├── content/
│   ├── brief/                  # Audience, process, style guide, voice, rubric, samples
│   ├── analysis/               # Cross-module reviews and proposals
│   ├── modules/                # All numbered module folders
│   │   ├── 01-overview-of-the-bahai-faith/
│   │   ├── 02-bahai-spiritual-principles/
│   │   ├── ...
│   │   └── 12-non-involvement-in-partisan-politics/
│   └── .claude/skills/         # Content-specific Claude Code skills
├── web/                        # Publishing website (Astro)
├── .claude/
│   ├── settings.json           # Project permissions
│   └── skills/                 # Repo-wide Claude Code skills
├── CLAUDE.md                   # Top-level routing
├── TODO.md                     # Shared tracking across content and web
└── README.md
```

Each numbered folder in `content/modules/` is a self-contained module:

```
08-prayer/
├── metadata.yaml       # Title, phase, topics, status
├── report.html         # Generated grading report (rubric scores, compliance)
├── research/           # Source material (PDFs, excerpts, links)
├── drafts/
│   ├── ai-draft.md     # Claude-generated draft
│   ├── v1.md, v2.md…   # Writer's revisions
└── final.md            # Approved module
```

## Module Lifecycle

1. **Planning** — group selects modules and assigns writers/editors
2. **Drafting** — writer gathers research and produces a draft with Claude
3. **Humanize + Grade** — run humanizer, score against rubric (must hit 28/35)
4. **Review** — editor reviews with skeptic's checklist and phase persona lens
5. **Rewrite** — writer rewrites in their own voice
6. **Final Grade** — score rewrite against rubric (must hit 32/35)
7. **Beta** — published for field testing
8. **Testing** — feedback collected from at least 2 group sessions
9. **v1** — feedback incorporated and module published as v1

## Seeker Phases

Each module targets a specific audience phase:

- **Discovery** — someone attending for the first time, no assumptions (Module 08)
- **Investigation** — someone actively exploring, knows the basics (Modules 01-07, 09, 11-12)
- **Consolidation** — someone who has committed, learning to participate (Module 10)

## Contributing

Contributors work in this repo using Claude Code. See `content/CLAUDE.md` for module writing rules and routing.
