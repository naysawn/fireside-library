# Module Editor App — Implementation Plan

## Overview

A lightweight Next.js app for editing, displaying, and reviewing Baha'i educational module text. The app sits alongside the content in the same repo but in a separate folder, keeping code and content cleanly separated.

## Folder Structure (Option A)

```
modules/
├── app/                          # Next.js application code
│   ├── package.json
│   ├── next.config.js
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx              # Module index / dashboard
│   │   └── modules/
│   │       └── [id]/
│   │           ├── page.tsx      # Module overview (reads metadata.yaml)
│   │           └── drafts/
│   │               └── [version]/
│   │                   └── page.tsx  # Render a specific draft version
│   ├── components/
│   │   ├── MarkdownRenderer.tsx  # Server Component — renders .md files
│   │   ├── VersionPicker.tsx     # Client Component — switch between drafts
│   │   ├── CommentSidebar.tsx    # Client Component — view/add comments
│   │   └── DiffView.tsx          # Client Component — compare two versions
│   └── lib/
│       ├── content.ts            # Read from ../content/ directory
│       ├── markdown.ts           # remark/rehype pipeline
│       └── comments.ts           # Read/write sidecar .comments.yaml files
│
├── content/                      # All module text (moved from current root)
│   ├── 01-overview-of-the-bahai-faith/
│   │   ├── metadata.yaml
│   │   ├── research/
│   │   └── drafts/
│   │       ├── ai-draft-1.md
│   │       ├── v1.md
│   │       ├── v1.comments.yaml  # Sidecar comment file
│   │       └── v2.md
│   ├── 02-bahai-spiritual-principles/
│   ├── ...
│   └── 11-suffering-and-justice/
│
├── brief/                        # Writing guidelines (stays at root)
├── research/                     # Architecture research (this folder)
├── CLAUDE.md
└── README.md
```

## Core Features

### 1. Module Dashboard
- Lists all modules with status from `metadata.yaml`
- Shows phase (discovery / investigation / consolidation)
- Color-coded by status (planning → drafting → review → ... → v1)

### 2. Version Viewer
- Dropdown/tabs to switch between draft versions (ai-draft-1, v1, v2, final)
- Server Components read markdown files directly from the filesystem
- Rendered with remark/rehype pipeline

### 3. Version Diff
- Side-by-side or inline diff between any two versions
- Useful for seeing what changed between an AI draft and a human revision

### 4. Comments
- Sidecar YAML files stored alongside each draft (e.g., `v1.comments.yaml`)
- Comments keyed by paragraph number or text anchor
- No database required — comments are plain files, git-tracked
- Example format:

```yaml
comments:
  - paragraph: 3
    author: "Naysawn"
    text: "This transition feels abrupt — can we add a bridging sentence?"
    resolved: false
    created: 2026-03-25
  - paragraph: 7
    author: "Naysawn"
    text: "Great quote placement here."
    resolved: true
    created: 2026-03-24
```

### 5. Auto-Versioning on Save
- Edits never overwrite existing files — each save creates the next version file (v1.md → v2.md → v3.md)
- The version history *is* the folder listing — no database, no git dependency for versioning
- Optional: auto-snapshot on significant edits (v1.1.md, v1.2.md)
- The full history of a module's evolution is always visible as plain files

### 6. AI-Assisted Editing (Claude API)
- Author highlights a paragraph and writes an instruction (e.g., "make this more accessible to newcomers")
- A Server Action calls the Claude API with the selected text + instruction + context from `brief/audience.md` and `brief/samples/` for tone calibration
- Claude returns a proposed revision shown as a diff (original vs suggested)
- Author accepts, rejects, or manually edits the suggestion
- Accepted edits get written into the next version file — never mutating the original
- AI suggestions stored in sidecar comments for audit trail:

```yaml
comments:
  - paragraph: 3
    author: "Naysawn"
    text: "Simplify this for someone new to the Faith"
    type: suggestion
    ai_proposed: "The Baha'i Faith teaches that humanity is one family..."
    ai_accepted: false
    created: 2026-03-25
```

#### Cost Considerations
- Uses the Anthropic API (usage-based billing, separate from Claude subscription)
- Haiku model recommended — cheapest option, handles paragraph-level rewrites well
- Costs would be minimal (cents/day) given small request sizes (paragraph + short instruction)
- `max_tokens` cap on responses keeps costs predictable
- Anthropic API has a free tier with rate limits that may suffice during development

### 7. Markdown Editor (future)
- In-browser editing with CodeMirror or Milkdown
- Server Actions write changes back to the content directory
- No database needed for basic editing

## Technology Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js (App Router) | Server Components read filesystem directly, no API layer |
| Rendering | Server Components | Read .md and .yaml files on the server, send HTML to browser |
| Interactivity | Client Components | Version picker, comment sidebar, editor — `'use client'` |
| Markdown | remark + rehype | Mature pipeline, extensible with plugins |
| YAML parsing | gray-matter | Parse metadata.yaml and frontmatter |
| Diffing | jsdiff or diff-match-patch | Compare draft versions |
| Editor (future) | CodeMirror or Milkdown | In-browser markdown editing |
| Database (if needed) | SQLite via better-sqlite3 | Only if comments outgrow sidecar files |
| AI editing | Claude API (Haiku) | Propose paragraph-level revisions from author comments |
| Styling | Tailwind CSS | Fast to build, good typography defaults |

## How It Works (Architecture)

The app uses Next.js Server Components to read directly from the `../content/` directory — no API layer, no separate backend. Each page is a function that reads files and renders HTML on the server.

```
Browser requests /modules/08-prayer/drafts/v1
        ↓
Server Component reads ../content/08-prayer/drafts/v1.md
Server Component reads ../content/08-prayer/metadata.yaml
Server Component reads ../content/08-prayer/drafts/v1.comments.yaml
        ↓
Renders HTML with markdown content + comment markers
        ↓
Browser receives HTML, Client Components hydrate
(VersionPicker, CommentSidebar become interactive)
```

See `research/nextjs-vs-traditional-architecture.png` for a visual comparison.

## Migration Steps

1. Create `app/` folder with `npx create-next-app`
2. Move all module folders (`01-*` through `11-*`) into `content/`
3. Update `CLAUDE.md` paths to reflect new `content/` location
4. Build the content reading layer (`app/lib/content.ts`)
5. Build module dashboard page
6. Build version viewer with markdown rendering
7. Add version diff view
8. Add comment sidecar support
9. Add auto-versioning (saves create new version files, never overwrite)
10. Integrate Claude API for AI-assisted editing (Server Action + accept/reject UI)
11. (Future) Add in-browser markdown editor

## Design Principles

- **Content is king** — the markdown and YAML files are the source of truth, always editable without the app
- **No database required** — everything is files, everything is git-tracked
- **Lightweight** — the app is a viewer/editor, not a CMS
- **Separation of concerns** — `app/` never writes to `content/` without explicit user action
