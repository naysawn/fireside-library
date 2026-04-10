# Implementation Spec: bahaimodules.com

## Tech Stack

- **Framework**: Astro (static site generation)
- **Styling**: Tailwind CSS
- **Content**: Markdown files from `content/` folder, read at build time
- **Deployment**: Vercel
- **Domain**: bahaimodules.com (assumed)

## Content Rules

- Publish the latest `v*.md` file from each module's `drafts/` folder (v2 takes priority over v1, etc.)
- If `final.md` exists, publish that instead
- Read `metadata.yaml` from each module folder for title, phase, topics, status, and ID
- No authentication, no user accounts

## Design System

- **Font**: Inter (Google Fonts)
- **Colors**: Black, gray, white foundation. Orange accent (#e04e1a)
- **Character**: Page-with-spark SVG mascot. Appears in nav wordmark and homepage hero (collection of fanned pages). Static version for print/favicon.
- **Tone**: Respectfully playful. See `messaging.md` for full voice guide.
- **Typography**: Bold, opinionated hierarchy. Editorial spacing. Thin rules between sections.

## URL Structure

- `/` — Homepage
- `/[slug]` — Module reading view (e.g. `/overview-of-the-bahai-faith`). No `/modules/` prefix.
- `/about` — About page
- `/modules` — Module listing/directory

## Pages

### Nav (global)

- Page-with-spark character + "Baha'i Modules" wordmark (links to `/`)
- Links: Modules, About
- GitHub icon linking to repo

### Homepage (`/`)

**Hero**
- Character collection (fanned pages) on the right
- Headline: "Written materials for exploring the Faith together."
- Subtitle: "Bite-sized written explorations. Built for small groups and real conversations."
- CTA buttons: "Browse modules" (links to /modules), "About this project" (links to /about)
- Orange accent background

**Section: Why these exist**
- Rewrite of the "Texts to make it easier to teach" copy from copy-i-like.md
- Core argument: written material anchors conversation, questions cause people to think, in practice this has sparked three-hour discussions
- Follow messaging.md voice rules strictly
- Include connective icons or illustrations

**Section: Every stage of interest**
- Describe the phases without mapping specific modules to them
- Four items with icons:
  - **Discovery**: For people encountering the Faith for the first time. Modules introduce core ideas and invite curiosity.
  - **Investigation**: For people actively exploring. Modules go deeper into specific subjects and engage with harder questions.
  - **Consolidation**: For people who identify as Baha'is and want to understand community life, institutions, and service.
  - **Service**: These modules lead naturally into the institute materials. Groups can continue with Ruhi and other resources according to their interests in service.
- Rewrite descriptions per messaging.md voice (not the rough copy from copy-i-like.md)

**Section: Open source**
- "Open Source. Come Help."
- This started in Boston, still an experiment, need other communities
- GitHub link

**Footer**

### Modules page (`/modules`)

**Default view: Flat listing**
- Data grid/table showing all modules
- Columns: #, Title, Phase, Topics, Status (beta/v1/draft)
- Each row links to the module reading page
- Sortable/filterable by phase

**Toggle view: Kanban by phase**
- Same modules grouped into columns: Discovery, Investigation, Consolidation
- Cards show module number, title, status
- Toggle button to switch between flat and kanban views
- Default is flat

### Module reading page (`/[slug]`)

**Module header**
- Back link: "← All modules" (links to /modules)
- Module number and title
- Phase badge
- Print icon (triggers browser print)

**Reading area**
- Max-width 680-720px for comfortable reading
- 17-18px body text, line-height 1.7-1.8
- Subheaders (h4) for content sections (Origins, One God, etc.)
- Questions numbered with accent-colored numbers
- Block quotes with left accent border and pale background tint
- Inline italic quotes visually distinct
- Clear section dividers between major parts

**Print styles**
- Hide nav, footer, print button
- Clean typography optimized for paper
- No background colors on block quotes (save ink)
- Page breaks that avoid splitting quotes or questions

**No sticky section nav** (deferred)

### About page (`/about`)

Content from copy-i-like.md about page section, rewritten per messaging.md:

**Section: Text to sustain deep discussions**
- What a module is: single subject, single session, 2-3 hours
- Group size: 4-8 people, large enough for multiple perspectives, small enough for everyone to speak

**Section: Two sections**
- Each module has two (sometimes three) sections
- First introduces, second goes deeper
- Can stop after the first if the group runs long
- Each section stands on its own

**Section: Opening questions**
- Invitations to think out loud and share
- Examples of real questions
- We learn from hearing everyone

**Section: Readings**
- Draws on scripture from Baha'u'llah, Abdu'l-Baha, Shoghi Effendi, Universal House of Justice
- Text provides context and explanation
- Assumes participants have working knowledge but do not subscribe to the teachings

**Section: Discussion questions**
- Questions to consider the topic from other angles
- Less about the text, more about what the group thinks
- The part where people forget what time it is

**Section: Open source**
- How modules are made (the process)
- How to get involved
- GitHub link

## Content Schema (metadata.yaml)

```yaml
title: "Overview of the Baha'i Faith"    # required
id: 1                                     # required, unique
phase: discovery                          # required: discovery | investigation | consolidation
topics:                                   # required, array of strings
  - history
  - core beliefs
status: draft                             # required: draft | beta | v1
```

## Build Process

1. Astro reads all module folders from `content/`
2. For each folder, reads `metadata.yaml` and finds the latest draft file (highest `v*.md` number, or `final.md` if it exists)
3. Parses markdown, renders to HTML with the reading page template
4. Generates the modules listing page from all metadata
5. Generates homepage and about page from Astro components
6. Static output deployed to Vercel

## Content TODO

- Update module markdown to use structural label convention: h3 for structural labels ("Questions for Reflection", "Reading", "Questions for Discussion") and h4 for content headings ("Origins", "One God"). This distinction drives the CSS: h3 renders as small uppercase accent-colored labels, h4 renders as bold same-size-as-body content headings.

## Deferred

- PDF generation pipeline (Puppeteer on Vercel)
- Sticky section nav on reading page
- Feedback forms
- Facilitator guide page
- Multi-language support
- User accounts
- Search
