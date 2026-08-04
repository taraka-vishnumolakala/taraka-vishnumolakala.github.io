# Securing Agentic Architecture deck

This deliverable integrates a React + Reveal.js presentation into the existing Astro/Vite site at:

`/blog/securing-agentic-architecture/`

The presentation contains 9 horizontal parent risk stacks, 53 vertical child-risk slides, and opening/closing methodology, severity, synthesis, and source sections. Every visible risk citation links to the original PDF or, when material, a first-hop source linked from the Anthropic PDF.

## Website integration

The staged `src/` files in this deliverable map to the same paths inside `taraka-vishnumolakala.github.io`:

- `src/components/agentic-architecture/` — React presentation components, styles, and local risk data
- `src/content/blog/securing-agentic-architecture/index.mdx` — blog entry
- `src/layouts/BlogPost.astro` — presentation-width blog layout support
- `src/content.config.ts` — `presentation` frontmatter flag
- `src/lib/mdx-to-md.ts` — meaningful Markdown-route fallback for the interactive deck

The website retains Astro as the application framework. Astro uses Vite for development and production builds; React renders the deck; Reveal.js provides horizontal/vertical navigation, notes, overview, progress, slide numbers, keyboard/touch controls, and print mode.

## Setup and development

From the website repository:

```sh
npm install
npm run dev
```

Open the local URL printed by Astro, then visit `/blog/securing-agentic-architecture/`.

## Navigation

- `←` / `→`: parent risk families and major sections
- `↑` / `↓`: child risks inside a parent family
- `Esc`: Reveal.js overview
- `S`: speaker notes window
- Space: advance
- Toolbar button: enter or exit full-screen presentation mode

The route uses hash-based Reveal.js navigation, so slide positions can be bookmarked.

## Build and preview

```sh
npm run build
npm run preview
```

Use the preview URL printed by Astro and open `/blog/securing-agentic-architecture/`.

## Print to PDF

1. Open `/blog/securing-agentic-architecture/?print-pdf` in Chromium-based browser.
2. Wait for the deck to finish rendering.
3. Print with landscape orientation, background graphics enabled, no margins, and one page per sheet.

Reveal.js keeps fragments together and provides print-specific layout rules. Hyperlinks remain clickable in compatible PDF printers.

## Content and research files

- `research/source-notes.md` records the primary-source review and page map.
- `research/claude-link-review.md` records the 37 deduplicated destinations, redirect outcomes, access status, relevant findings, and whether each was used.
- `scripts/validate-content.mjs` verifies the exact 9-section / 53-risk hierarchy, baseline severities, required fields, mitigation counts, and citation presence.

## Baseline qualification

Severity ratings are synthesized for architectural review. They are not publisher-assigned ratings. Local severity can change with authority, data sensitivity, autonomy, execution and egress, propagation, reversibility, approval, detection, response, and blast radius.

## Verified handoff

- Content validator: 9 parent sections and 53 child risks; 23 Critical, 29 High, and 1 Medium baseline.
- Production build: successful with Astro/Vite.
- Local preview: `/blog/securing-agentic-architecture/` renders as the featured Writing entry.
- Reveal.js: horizontal, vertical, hash, keyboard, progress, overview, slide-number, notes, touch, and full-screen behavior verified.
- Render audit: 73 presentation pages, 53 risk slides, 9 parent overviews, 73 speaker-note blocks, no slide overflow, and no browser console warnings or errors.
- Responsive audit: wide and 760px layouts render without document-level horizontal overflow.
- Print audit: `?print-pdf` produces 73 deck-only pages and removes the surrounding blog chrome.
- Source-link audit: 137 clickable evidence links across the 53 risk slides; all use HTTPS original-source destinations. The final source section lists the 17 Claude-linked sources used materially.
