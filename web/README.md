# Fireside Library — web

The publishing site for Fireside Library, built with [Astro](https://astro.build). It renders the firesides authored in [`../content`](../content) into a static site.

## 🚀 Project structure

```text
web/
├── public/
│   ├── favicon.svg      # browser-tab mark (the hearth tile)
│   └── mask-icon.svg    # Safari pinned-tab silhouette
├── src/
│   ├── components/
│   │   └── PageCharacter.astro   # the flame mark, used in the nav and hero
│   ├── layouts/
│   │   └── Layout.astro          # shell: nav, footer, <head>, icons
│   └── pages/
│       ├── index.astro           # firesides listing (homepage)
│       ├── about.astro
│       ├── contribute.astro
│       ├── brand.astro           # living brand reference — see below
│       └── firesides/            # generated fireside pages
└── package.json
```

Astro exposes each `.astro`/`.md` file in `src/pages/` as a route based on its file name. Static assets live in `public/`.

## 🧞 Commands

All commands are run from `web/`:

| Command            | Action                                       |
| :----------------- | :------------------------------------------- |
| `npm install`      | Install dependencies                         |
| `npm run dev`      | Start the dev server at `localhost:4321`     |
| `npm run build`    | Build the production site to `./dist/`       |
| `npm run preview`  | Preview the build locally before deploying   |

## 🔥 Brand

The whole identity is one flame — a clean fire glyph with a small inner lick — rendered in warm oranges. The live reference (palette swatches, the mark on light and dark, tab previews) is the [`/brand`](src/pages/brand.astro) page; view it with `npm run dev`.

### The mark

There is **one shape**, used two ways:

- **Bare flame** — the in-product mark. Used in the nav and on hero sections via `PageCharacter.astro`. On the orange accent it renders cream (`#fff7ed`) with the inner lick knocked back to the accent color so it reads as a hard, confident silhouette.
- **Hearth tile** — the flame on a cream rounded-square tile (`public/favicon.svg`). This is the favicon / "app icon": the cream tile gives a hard edge so the mark survives on any browser-tab color. Safari's pinned tab uses `public/mask-icon.svg`, the bare silhouette in a single color.

Use the **bare flame** anywhere the background is known and on-brand (the orange nav, hero blocks). Use the **tile** wherever the background is out of our control (browser tabs, OS launchers, link unfurls).

`PageCharacter.astro` takes `size` (`nav` | `inline` | `hero`) and `inverted` (cream flame for dark/accent backgrounds; warm gradient for light).

### Palette

| Token     | Hex       | Use                                  |
| :-------- | :-------- | :----------------------------------- |
| Flame top | `#ff7a2f` | top of the flame gradient            |
| Accent    | `#e04e1a` | brand color — nav, links, buttons    |
| Ember     | `#9a3410` | base of the flame gradient           |
| Core      | `#ffb02e` | inner lick (mid)                     |
| Spark     | `#ffd24a` | inner lick (highlight)               |
| Cream     | `#fff7ed` | the flame on accent, the tile ground |

The accent (`#e04e1a`) is exposed to Tailwind as `bg-accent` / `text-accent`.

### Rules of thumb

- Keep the flame on a high-contrast ground — never the bare two-tone flame directly on orange (it disappears; that's what the tile solves).
- One flame per view. It's a punctuation mark, not a pattern.
- When in doubt, open `/brand` and match what's there.

## 👀 Learn more

[Astro documentation](https://docs.astro.build) · [Discord](https://astro.build/chat)
