# Brainstorm: Website Direction for Hosting Modules

## What is this site?

A publishing platform for the Baha'i educational modules. The audience is Baha'is who want to leverage written materials to share the Faith with seekers.

## Why this project exists

### The spiritual imperative

At all times in our history, the Central Figures and Institutions of the Faith have described teaching as of paramount importance. Baha'u'llah instructs His followers: "Teach ye the Cause of God, O people of Baha, for God hath prescribed unto every one the duty of proclaiming His Message, and regardeth it as the most meritorious of all deeds." He declared, "To assist Me is to teach My Cause. This is a theme with which whole Tablets are laden. This is the changeless commandment of God, eternal in the past, eternal in the future." All His followers are called upon to "Open, O people, the city of the human heart with the key of your utterance."

Shoghi Effendi, in impressing upon the American believers the urgency of sharing the message, called on them: "Let us arise to teach His Cause with righteousness, conviction, understanding and vigor. Let this be the paramount and most urgent duty of every Baha'i. Let us make it the dominating passion of our life." Teaching, he shared, should not be one activity among many, but "the most essential, the most urgent of all our obligations."

The Universal House of Justice describes teaching as the "sacred act of assisting a soul to recognize and obey his Lord. It is a spiritual process, involving spiritual forces, spiritual preparation, and spiritual action."

### The urgency

The world's desperate need for the Baha'i teachings cannot be overstated. The Universal House of Justice writes:

> "... this Body of humanity's material civilization calls aloud, yearns more desperately with each passing day, for its Soul. As with every great civilization in history, until it is so animated, and its spiritual faculties awakened, it will find neither peace, nor justice, nor a unity that rises above the level of negotiation and compromise."

Addressing the "elected representatives of the people in every land", Baha'u'llah wrote: "That which the Lord hath ordained as the sovereign remedy and mightiest instrument for the healing of all the world is the union of all its peoples in one universal Cause, one common Faith."

The Universal House of Justice continues:

> "It is not, therefore, in providing support, nor encouragement, nor even example that the work of the Cause chiefly lies. The Baha'i community will go on contributing in every way possible to efforts toward global unification and social betterment, but such contributions are secondary to its purpose. Its purpose is to assist the people of the world to open their minds and hearts to the one Power that can fulfill their ultimate longing. There are none, except those who have themselves awakened to the Revelation of God, who can bring this help."

### The practical insight

Experience has shown that having written material to read together helps sustain meaningful conversation and keeps the focus on subjects of depth. This is not a new insight. In Colombia, during the growth that eventually led to the creation of the Ruhi materials, seekers were taught using a booklet called Conozcamos La Fe Baha'i, which walks through the basics of the Faith on a one-on-one basis. The most rapid rise of enrollments in the United States occurred when the community leveraged the "Red Teaching Book" as material for people to look at while travel teachers answered questions.

To this end, we have produced a series of written texts called "modules" on subjects of interest to seekers, which we recommend for your teaching efforts. Each module is designed for a single session of two to three hours, combining readings with discussion prompts that draw participants into conversation. The text matters, but what makes these modules effective is that they get people talking and sharing, which is the key to genuine connection and real learning. In practice, they have sparked three-hour discussions on deep questions of meaning, purpose, and faith.

For seekers who are investigating the basics of the Faith, we have found that texts that help them to study and reflect upon the foundation concepts in the Faith work best. Covering such subjects like man's need for an educator, the life of Baha'u'llah, and spiritual solutions to economic problems help seekers to examine the validity of the Baha'i teachings. Once a seeker has declared, Ruhi Book 1 becomes an excellent next step.

## Chosen direction

After exploring 10 mockups across 4 tonal directions (playful, fun, serious/Apple-like, index), the following elements emerged as the right combination:

### Tone: Respectfully playful
Warm and approachable but not flippant. A slight smile behind the words. The kind of site that makes you feel welcomed without being talked down to. Think: a thoughtful friend who happens to be a great designer. Serious enough to trust, distinctive enough to remember.

### Character/mascot
A simple, memorable character (like the lantern from variant E) tied to a bold accent color. The character gives the site personality and instant brand recognition without making it silly. Appears in the nav, hero, and footer. Inspired by how Panda CSS uses its panda to make a technical tool feel approachable.

### Page structure
1. **Hero with accent color background**: bold headline, character, honest subtitle. The accent-colored hero section is the signature visual moment (like Panda CSS's yellow). This is not a generic corporate landing page.
2. **Explanatory section**: a second section that goes deeper into the why behind the modules. Why written materials matter. Why exploring together beats reading alone. The open source / experimental nature of the project. Honest, first-person-plural voice.
3. **Module listing**: all published modules listed below, filterable by seeker phase. The landing page IS the directory. No separate /modules page needed.

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

## Look and Feel

### Color
- Black, gray, white as the foundation
- A single strong, opinionated accent color (orange, purple, or red; not blue, not muted, not safe)
- The accent color is used boldly: as a hero background, in the character, in interactive elements
- The accent should feel like a brand decision, not a default
- Reference sites: Panda CSS (yellow), The Index, React.GG

### Typography
- Sans-serif throughout (Inter)
- Bold, opinionated typographic hierarchy
- Large headings, confident use of whitespace

### Visual approach
- Text-forward with a character/mascot as the main illustrative element
- The character should feel intentional and tied to the brand, not decorative filler
- Minimal UI chrome; let the content breathe

### Explored directions (for reference)
Mockups in `web/brainstorms/`:
- `direction-1-playful.html` through `direction-4-index.html` (initial explorations)
- `serious-a.html` through `serious-f-accent-bg.html` (refinements)

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

- [x] Pick a direction (respectfully playful + character + accent hero + explanatory section + module listing)
- [x] Look at reference sites for inspiration
- [ ] Design the module reading view (`/modules/[slug]`) as a prototype
- [ ] Decide on tech stack (Next.js is the likely candidate)
- [ ] Build the site reading from `content/` markdown at build time
- [ ] PDF generation pipeline
