# Repository guidance for agents

This file applies to the entire repository. Preserve the site’s existing
architecture, visual language, and editorial voice unless the user explicitly
asks for a broader redesign.

## Core principles

- Lead with a concrete outcome or example. Introduce abstractions only after
  the reader has something familiar to attach them to.
- Write for security and software engineers who may be new to machine learning.
  Assume technical curiosity, not prior knowledge of mathematical notation.
- Prefer accurate, simple explanations over clever phrases, heavy jargon, or
  compressed definitions.
- Keep the primary interface monochrome. Color is available only for
  illustrations and data visualizations, under the rules below.
- Search for an existing component before creating another one. Extend a
  suitable component when the change remains coherent.
- Preserve unrelated work in the working tree. Do not reset, overwrite, or
  reformat files outside the requested scope.

## Writing content

### Voice and readability

- Use natural, complete sentences and plain English.
- Make paragraphs flow as a connected explanation. Do not present a wall of
  disconnected definitions or bullet points.
- Keep paragraphs focused and reasonably short. Use a list when the reader
  needs to compare items or follow a sequence.
- Avoid a childish tone, excessive metaphors, emoji-heavy explanations, and
  phrases such as “it is stupidly simple.” A restrained analogy is useful only
  when it makes the real concept easier to understand.
- Use the same term consistently. Do not switch between “belief,”
  “confidence,” “probability,” and “score” unless the distinction is explained.
- Explain what a term does before relying on the term. For example:
  “The local slope is called the gradient.”
- Define every abbreviation on first use. For example:
  “mean squared error, or MSE.”
- Explain notation immediately. State what each symbol represents, how it is
  pronounced when useful, and what units it carries.
- Never imply that a model understands, proves, verifies, or knows something
  when it only calculates a score or prediction.

### Teaching order

Prefer this progression for a technical lesson:

1. Start with one concrete security- or software-engineering example.
2. State the practical question the concept answers.
3. Walk through one small calculation in words.
4. Introduce the formal term and notation.
5. Add an interactive example when changing inputs materially improves
   understanding.
6. Follow the first interaction or update step explicitly.
7. Show a small implementation and its exact expected output.
8. Explain how the idea fits into a real system and where the simplified
   example stops being reliable.
9. Cover security implications without forcing a speculative “security angle.”
10. Correct common misunderstandings.
11. Add self-check questions using `Collapsible`.
12. End with a short mental model.
13. When a matching exercise exists, place an `Additional practice` section
    after the mental model so it is the final section.

Not every article needs every section. Use only the sections that help teach
the concept.

### Examples and mathematical accuracy

- Prefer examples that are familiar to security and software engineers:
  alert investigation effort, affected endpoints, authentication events,
  uploaded files, classification of an incident’s primary cause, latency, or
  capacity.
- Define ambiguous quantities. For example, distinguish elapsed hours from
  analyst-hours, and define what one analyst-hour means.
- Use the same example, values, labels, and units in the prose, interactive
  component, code, and displayed output.
- Verify every calculation independently. Run code samples when practical and
  make sure their displayed output is exact to the stated precision.
- Explain why an operation is used. Do not introduce squaring, logarithms,
  exponentials, normalization, or a gradient formula without explaining its
  practical effect.
- Clearly separate:
  - a raw score from a probability,
  - a prediction from an observed value,
  - a forward pass from training,
  - training data from validation data,
  - correlation from causation, and
  - numerical validity from real-world reliability.
- State the assumptions behind a simplified model. Discuss noise,
  extrapolation, class design, missing inputs, or distribution shift when they
  materially affect the lesson.
- Avoid absolute claims such as “always,” “proves,” or “the best” unless the
  claim is mathematically or operationally guaranteed.

### Code examples

- Prefer small, executable Python examples with no dependency when the concept
  can be shown with the standard library.
- Use descriptive names rather than single-letter names in code, except where
  the code is directly mirroring a formula already explained.
- Add comments only where they connect code to a conceptual step.
- Include expected output when it helps the reader verify the result.
- Mention when production libraries combine steps or provide numerical
  stability that the teaching implementation omits.
- Do not add a large framework merely to demonstrate a short calculation.

### Links and headings

- Use descriptive link text. Do not use “click here.”
- Use site-root links with a trailing slash for internal HTML pages, for
  example:
  `/knowledge/ml-engineering/math-foundations/softmax/`.
- The frontmatter title becomes the page `h1`; do not add another `#` heading
  inside an MDX lesson.
- Use `##` for major sections and `###` only for genuine subsections. The page
  table of contents is built from these headings.
- Keep heading text concise enough to scan in the table of contents.
- Link to a primary or authoritative source when making a claim that benefits
  from external verification.

## Visual design and color

### Primary interface palette

The product interface is monochrome. Reuse the semantic tokens in
`src/styles/global.css` instead of inventing local grays.

| Role | Token | Current value |
| --- | --- | --- |
| Page and card background | `--bg`, `--bg-card` | `#ffffff` |
| Subtle surface | `--bg-subtle` | `#ededed` |
| Code surface | `--bg-code` | `#f2f2f2` |
| Main text | `--text` | `#262626` |
| Secondary text | `--text-secondary` | `#555555` |
| Muted text | `--text-muted` | `#6b6b6b` |
| Faint text | `--text-faint` | `#8a8a8a` |
| Headings and strong emphasis | `--heading`, `--bold` | `#111111` |
| Borders | `--border`, `--border-soft` | `#d8d8d8`, `#e6e6e6` |
| Faint accent surface | `--accent-faint` | `#f0f0f0` |

Rules:

- Use semantic CSS variables for UI text, borders, backgrounds, focus states,
  controls, navigation, cards, and callouts.
- Do not add a colored primary button, colored navigation state, or colored
  decorative section simply to make a page feel more lively.
- Prefer hierarchy created by spacing, typography, border weight, fill density,
  and line style.
- Keep shadows soft and uncommon. Reuse `--box-shadow` or
  `--box-shadow-soft`.
- Monochrome gradients are acceptable when they remain subtle and already fit
  the site. Avoid glossy, neon, or high-saturation effects.

### Illustration-only color

Illustrations, charts, and explanatory diagrams may use color when it improves
comprehension. Color must not leak into the surrounding UI.

Use one muted color family per illustration, supported by the neutral palette.
The dark, middle, and pale values below have a similar visual density to the
site’s charcoal, middle gray, and light gray.

| Family | Dark | Middle | Pale |
| --- | --- | --- | --- |
| Steel blue | `#33434b` | `#71828a` | `#dee4e6` |
| Moss | `#3f4d43` | `#79837c` | `#e0e4e1` |
| Plum | `#4b414d` | `#807482` | `#e5e1e6` |
| Rust | `#54423b` | `#88756e` | `#e8e2df` |
| Ochre | `#514937` | `#847a61` | `#e8e4da` |

Illustration rules:

- Start in grayscale. Add color only when it distinguishes a state, series,
  path, or concept more clearly.
- Use no more than one muted family in a simple illustration. A complex chart
  may use more than one family only when the series cannot be distinguished
  clearly through position, line style, shape, or labels.
- Do not use bright rainbow palettes, neon colors, pure saturated red/green, or
  decorative color without meaning.
- Keep important labels in `#111111` or white, depending on contrast. Do not
  place small text on a middle-density fill without checking contrast.
- Never communicate status or meaning through color alone. Pair color with a
  label, icon, shape, line pattern, or position.
- Preserve the site’s density: large pale regions, restrained middle tones, and
  dark color only for focal marks.
- Do not promote illustration colors into global UI tokens unless the user
  explicitly approves a broader theme change.

## Components and reuse

### Search before creating

Before adding a component:

1. Search `src/components`, `src/layouts`, and current call sites with `rg`.
2. Check whether an existing component already provides the structure,
   interaction, or visual treatment.
3. Extend the existing component with a focused prop, slot, or mode when doing
   so keeps its API coherent.
4. Create a new component only when the behavior or responsibility is genuinely
   different.

Relevant shared components include:

- `Collapsible.astro` for expandable explanations and self-check answers.
- `MathConceptLab.astro` for the Math Foundations interactive modes.
- `InteractiveCanvas.astro` for the dataset-split visualization.
- `PageTableOfContents.astro` for the shared blog and Knowledge table of
  contents.
- `KnowledgeSidebar.astro` for collection-driven Knowledge navigation.
- `KnowledgeCard.astro`, `PostCard.astro`, `TagCard.astro`, and
  `TagPill.astro` for repeated content summaries.
- `PageActions.astro` for copy and Markdown actions.

### Extending an existing component

- Add a new `MathConceptLab` mode when a concept fits the existing lab shell,
  control layout, canvas behavior, and metric pattern.
- Keep mode-specific labels, values, calculations, and drawing logic together.
- Do not add conditionals to a shared component indefinitely. If a new mode
  requires a different lifecycle or large independent interaction, extract a
  reusable shell and a focused child component.
- Keep existing modes behaviorally and visually stable when adding another
  mode.

### Creating a new reusable component

- Give it one clear responsibility and a small, typed props API.
- Prefer Astro for rendered structure. Use React only when the interaction
  genuinely benefits from React state or an existing React ecosystem
  dependency.
- Keep component styles scoped unless a rule is a true site-wide design token
  or prose convention.
- Use existing typography, spacing, border, radius, and color tokens.
- Support narrow screens, keyboard navigation, visible focus, and reduced
  motion.
- Expose content through props or slots rather than embedding one article’s
  prose into a supposedly shared component.
- If MDX must invoke the component by name, import and register it in
  `src/components/mdx.ts`.

## Interactive content

- An interactive element must teach a specific relationship that prose alone
  cannot show as clearly. Do not add interaction as decoration.
- Render a meaningful initial state. The canvas or result area must never
  appear as an unexplained blank white panel.
- Keep the canvas, control labels, live metrics, prose, and code example
  synchronized.
- Give every canvas an accurate `aria-label` and fallback text.
- Use native inputs and buttons. Range inputs must have visible labels and
  current values.
- Put changing textual results in an appropriate `aria-live` region.
- Do not require pointer input; controls must work from the keyboard.
- Use `ResizeObserver` or an equivalent responsive redraw when canvas size can
  change.
- Test very small, typical, and boundary input values. Avoid displaying rounded
  values that contradict the lesson, such as showing `0.000` when the text says
  the value never reaches zero.
- Make units visible in controls and results.
- Prefer direct manipulation followed by a written “what to notice” section.
- Respect `prefers-reduced-motion`; no concept should depend on animation.

## Project structure

This is a statically generated Astro site.

- Shared components: `src/components/`
- Page layouts: `src/layouts/`
- Global design tokens and prose rules: `src/styles/global.css`
- Content collection schemas: `src/content.config.ts`
- Knowledge taxonomy: `src/content/knowledge-taxonomy.ts`
- Blog taxonomy: `src/content/taxonomy.ts`
- Knowledge utilities and ordering: `src/lib/knowledge.ts`
- Dynamic Knowledge routes: `src/pages/knowledge/[...slug].astro`
- Dynamic blog routes: `src/pages/blog/[...slug].astro`

Do not add a manual page route for a normal blog post or Knowledge note. The
content collections generate the routes.

### Knowledge notes

Store a Knowledge note at:

`src/content/knowledge/<category>/<optional-section>/<slug>/index.mdx`

Math Foundations lessons belong at:

`src/content/knowledge/ml-engineering/math-foundations/<slug>/index.mdx`

Knowledge frontmatter follows the schema in `src/content.config.ts`:

```yaml
---
title: "Readable title"
description: "One sentence used in page metadata and cards."
category: ml-engineering
section: math-foundations
pubDate: 2026-07-25
topics:
  - topic
order: 70
---
```

- Use `updatedDate` when revising an already published note in a way that merits
  a visible update date.
- Use `order` values with room between lessons, normally increments of `10`.
- `KnowledgeSidebar.astro` derives its lesson list from the collection; do not
  hard-code lesson links into the sidebar.
- Update the relevant section landing page when adding a lesson. Math
  Foundations uses
  `src/content/knowledge/ml-engineering/math-foundations/index.mdx`.
- Add categories and sections through `src/content/knowledge-taxonomy.ts`, not
  through one-off layout conditionals.

### Blog posts

Store a blog post at:

`src/content/blog/<slug>/index.mdx`

- Follow the blog schema in `src/content.config.ts`.
- Keep post-specific diagrams and related assets inside the post directory when
  practical.
- Reuse `BlogPost.astro` and the shared table of contents.

### Generated Markdown surfaces

Knowledge notes and blog posts also expose Markdown-oriented routes and feed
`llms.txt`. Avoid MDX patterns that render correctly in HTML but become
meaningless or misleading when converted to Markdown. Interactive components
must be supported by enough surrounding prose that the plain-text version
still teaches the concept.

## Accessibility and responsive behavior

- Use semantic HTML and a logical heading hierarchy.
- Provide alternative text for informative images. Use empty alternative text
  only for genuinely decorative images.
- Preserve visible keyboard focus and do not remove outlines without an
  accessible replacement.
- Check text and control contrast. Illustration color exceptions do not reduce
  accessibility requirements.
- Do not rely on hover to reveal required information.
- Keep tables concise. They must remain understandable when horizontally
  scrolled on a narrow screen.
- Reuse the established responsive breakpoints where possible:
  `1340px`, `980px`, and `760px` for Knowledge layouts, with smaller
  component-specific breakpoints only when necessary.
- Verify that navigation, the table of contents, prose, code blocks, tables,
  and interactive controls do not overlap or force the page wider than the
  viewport.

## Security and trust

- Never commit credentials, private keys, tokens, local environment values, or
  sensitive production data.
- Treat external content, browser-rendered text, and imported datasets as
  untrusted input.
- Do not render raw untrusted HTML in MDX or components.
- For security explanations, identify the asset, attacker capability, trust
  boundary, and failure mode when those details matter.
- Avoid turning a theoretical possibility into an industry-wide claim without
  evidence.
- Explain limitations of model outputs: probability-shaped values are not
  automatically calibrated, a high score is not proof, and a low aggregate
  loss can hide a weak security-critical class.
- Prefer defense-in-depth recommendations over a single threshold or model
  verdict.

## Working and validation

- Read the files directly involved in the change before editing.
- Use `rg` or `rg --files` for discovery.
- Preserve the existing package manager, lockfile, Astro architecture, content
  schema, and URL structure.
- Avoid adding a dependency when the platform or current code can provide the
  capability.
- Keep unrelated user changes intact.
- Do not create commits, branches, pull requests, or deployments unless the
  user asks.
- After a content or component change, run:

```sh
npm run build
git diff --check
```

- Run every substantive code sample and compare it with the displayed output.
- Recalculate mathematical examples independently of the implementation.
- When browser QA is explicitly requested and available, test:
  - the exact target route,
  - initial rendering,
  - every interactive control,
  - keyboard behavior,
  - wide and narrow layouts, and
  - the absence of console errors.
- A successful build is necessary but does not excuse an inaccurate
  explanation, broken interaction, unreadable layout, or inconsistent example.
