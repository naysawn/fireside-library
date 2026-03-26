# TODO

## Port Existing Modules from Google Docs

Convert each module from Google Docs to markdown and place in the correct folder.

- [x] 01 - Overview of the Baha'i Faith
- [x] 02 - Baha'i Spiritual Principles
- [x] 03 - Baha'i Social Teachings
- [x] 04 - Developing a Relationship with God
- [x] 05 - The Bab and Baha'u'llah
- [x] 06 - The Centers of the Covenant
- [x] 07 - Making Sense of a Turbulent World
- [x] 08 - Prayer (furthest along — multiple AI drafts + v1 + v2)
- [x] 09 - The Baha'i Faith and Christianity
- [x] 10 - The Baha'i Administrative Order
- [x] 11 - Suffering and Justice
- [x] 12 - Non Involvement in Partisan Politics

## Editorial Cleanup (per module, during revision)

- [ ] Convert longer quotations to block quotes (Google Docs export does not use `>` syntax)
- [ ] Apply style guide (em dashes, AI tells, citations, acceptance criteria)

## Populate Brief & Samples

- [ ] Drop 2-3 strongest existing modules into `brief/samples/` as tone references
- [ ] Review and refine `brief/audience.md`
- [ ] Review and refine `brief/process.md`
- [ ] Define the purpose each module by seeker stage & what also can be assumed about the audience in terms of knowledge

## Build Skills

- [ ] Research skill — help gather and organize source material into a module's `research/` folder
- [ ] Revision skill — help writers refine AI drafts into their own voice
- [ ] Review existing `bahai-module` skill against actual ported modules and adjust if needed

## Design Decisions

- [x] Web interface for editing — plan drafted in `research/app-plan.md` (Next.js app with version viewer, comments, AI-assisted editing)
- [ ] Publishing website — separate project or integrated with this repo?
- [ ] PDF generation pipeline — build as a Vercel API route using Puppeteer, rendering the same styled HTML to PDF so one layout serves both web and print
- [ ] Google Drive library of source materials — how to reference/link from module `research/` folders

## Project Setup

- [ ] Identify modules for the current cycle
- [ ] Assign writers and editors to modules
- [ ] Set timelines per module
- [ ] Collect grassroots questions to inform module content
