# Brainstorm: Website Direction for Hosting Modules

## What is this site?

A publishing platform for the Baha'i educational modules. The audience is Baha'is who want to leverage written materials to share the Faith with seekers.

## Why these modules exist

Experience has shown that having written material to read together helps sustain meaningful conversation and keeps the focus on subjects of depth. This is not a new insight. In Colombia, during the growth that eventually led to the creation of the Ruhi materials, seekers were taught using a booklet called Conozcamos La Fe Baha'i, which walks through the basics of the Faith on a one-on-one basis. The most rapid rise of enrollments in the United States occurred when the community leveraged the "Red Teaching Book" as material for people to look at while travel teachers answered questions.

To this end, we have produced a series of written texts called "modules" on subjects of interest to seekers, which we recommend for your teaching efforts. Each module is designed for a single session of two to three hours, combining readings with discussion prompts that draw participants into conversation. The text matters, but what makes these modules effective is that they get people talking and sharing, which is the key to genuine connection and real learning. In practice, they have sparked three-hour discussions on deep questions of meaning, purpose, and faith.

For seekers who are investigating the basics of the Faith, we have found that texts that help them to study and reflect upon the foundation concepts in the Faith work best. Covering such subjects like man's need for an educator, the life of Baha'u'llah, and spiritual solutions to economic problems help seekers to examine the validity of the Baha'i teachings. Once a seeker has declared, Ruhi Book 1 becomes an excellent next step.

## Chosen direction: Serious (Apple-like)

Clean, precise, elevated. Every pixel earns its place. The design communicates authority and care. Restrained color, perfect spacing, cinematic pacing.

## Core questions to answer

1. **Who visits the site?**
   - Baha'is looking up the concept of modules 
   - Editors/writers checking the current state of a module?

2. **What do they need to do?**
   - Browse available modules
   - Read a module on screen (phone, tablet, laptop)
   - Download/print a module as PDF
   - See what phase a module is in (beta, v1, etc.)
   - Provide feedback after using a module in a session
   - See the topics covered 

3. **What is the minimum viable site?**
   - A homepage that explains what they are & why they were created
   - A list of published modules
   - A clean reading view for each module
   - A way to download as PDF
   - No accounts, listing of topics by stage
   - See beautiful reading experience for the modules themselves 

## Design directions to explore

### Direction A: Digital bookshelf
A simple, curated collection. Landing page shows the modules as cards or a list. Click one, read it. Clean, focused, no distractions. Think: a small press publisher's website. The emphasis is on the quality of the reading experience.

### Direction B: Progressive web app
A PWA. Writers leverage the app itself to write, editors make comments, AI updates it, all of it is sync'd by markdown files to the serve for storage.


## Look and Feel

### Color
- Black and white foundation with a single accent color
- Reference sites: Panda CSS, The Index, React.GG

### Typography
- Sans-serif throughout
- Bold, opinionated typographic hierarchy
- Large headings, confident use of whitespace

### Visual approach
- Text-forward with illustrative elements (not photographic)
- Illustrations should feel intentional, not decorative filler
- Minimal UI chrome; let the content breathe

### Tone explorations (try all three)

**Attempt 1: Respectfully playful**
Warm and approachable but not flippant. A slight smile behind the words. Illustrations with personality. The kind of site that makes you feel welcomed without being talked down to. Think: a thoughtful friend who happens to be a great designer.

**Attempt 2: Just fun**
Bold, energetic, unapologetic. Big type, unexpected layout choices, playful interactions. Does not take itself too seriously even though the content is serious. Think: a zine made by people who genuinely love what they are sharing.

**Attempt 3: Serious (Apple-like)**
Clean, precise, elevated. Every pixel earns its place. The design communicates authority and care. Restrained color, perfect spacing, cinematic pacing. Think: a product launch page for something that matters.

## Sitemap

### Pages

**/** — Homepage
- Hero: what these modules are and why they were created
- How they work (small group, 2 sections, reflection + discussion)
- Module listing below: all published modules as cards
- Filterable by seeker phase (discovery, investigation, consolidation)
- Each card shows: title, phase, topics, status badge (beta/v1)
- Similar to The Index: the landing page IS the directory

**/modules/[slug]** — Module reading view
- The star of the site; this page needs to be beautiful
- Clean reading experience optimized for screen and print
- Section navigation (jump to Section 1, Section 2)
- Download as PDF button
- Metadata sidebar or header (phase, topics, version)

**/about** — About the project
- Who is behind this, the Boston Baha'i community connection
- The process: how modules are written, reviewed, tested
- How to get involved (as a writer, editor, facilitator, or participant)

### Maybe later
- **/feedback** — Form for facilitators to submit session feedback
- **/facilitator-guide** — How to run a module session
- **/topics** — Browse by topic across all modules

## Constraints

- Content lives in markdown in the `content/` folder of this repo
- The site reads from those files at build time (no separate CMS)
- Must look good on mobile (groups often sit around a phone or tablet)
- Must be printable (clean PDF export per module)
- Should feel warm and inviting, not institutional or corporate

## Open questions

- Should all modules be public, or should some be behind a "beta" gate?
- Is there a role for user accounts (facilitator dashboard, feedback tracking)?
- How does this relate to the Boston Baha'i community specifically vs. being a general resource?
- Should the site support multiple languages eventually?
- What is the relationship between this site and the Google Drive library of source materials?

## Next steps

- Pick a direction (or combine elements)
- Look at reference sites for inspiration
- Decide on tech stack (Next.js is the likely candidate)
- Design the reading experience for one module as a prototype
