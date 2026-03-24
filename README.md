# Baha'i Educational Modules

A collection of structured study modules designed for small group discussions exploring the Baha'i Faith. Each module is a standalone 2-section reading with reflection and discussion questions, written for a mixed group of Baha'is and seekers.

## Structure

Each numbered folder is a self-contained module:

```
01-overview-of-the-bahai-faith/
├── metadata.yaml       # Title, phase, topics, status
├── research/            # Source material (PDFs, excerpts, links)
├── drafts/
│   ├── ai-draft.md      # Claude-generated draft
│   └── v1.md, v2.md…    # Writer's revisions
└── final.md             # Approved module
```

Global project docs live in `brief/`:
- `process.md` — the full module lifecycle from planning to publication
- `audience.md` — who the modules are for
- `samples/` — example modules for tone reference

## Module Lifecycle

1. **Planning** — group selects modules and assigns writers/editors
2. **Drafting** — writer gathers research and produces a draft with Claude
3. **Review** — editor provides feedback on arc, sourcing, and emphasis
4. **Rewrite** — writer rewrites in their own voice
5. **Beta** — published for field testing
6. **Testing** — feedback collected from at least 2 group sessions
7. **v1** — feedback incorporated and module published as v1

## Contributing

Contributors work in this repo using Claude Code. See `CLAUDE.md` for routing and rules.
