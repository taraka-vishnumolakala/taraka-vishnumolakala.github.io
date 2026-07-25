# taraka-vishnumolakala.github.io

Personal website, blog, and knowledge base built with
[Astro](https://astro.build).

## Development

```sh
npm install
npm run dev       # Start dev server at localhost:4321
npm run build     # Build for production
npm run preview   # Preview production build locally
```

## Structure

```
src/
├── components/   # Reusable UI components
├── content/blog/ # Blog posts (Markdown / MDX)
├── content/knowledge/ # Knowledge Base notes (Markdown / MDX)
├── layouts/      # Page layouts
├── pages/        # Routes
└── styles/       # Global CSS
public/           # Static assets (images, favicon)
```

## Publish a blog post

Create one folder under `src/content/blog/` and add an `index.mdx` file. Any
images used by the post can live beside it:

```text
src/content/blog/my-post/
├── index.mdx
└── diagrams/
    └── cover.png
```

Start the post with this frontmatter:

```mdx
---
title: "Post title"
description: "One-sentence summary used by post cards and metadata."
pubDate: 2026-07-24
coverImage: ./diagrams/cover.png
coverAlt: "A concise description of the cover image"
tags:
  - agent-and-ml-security
  - system-design
series: "Optional series name"
---

Write the article here.
```

The supported tags are maintained in `src/content/taxonomy.ts`. The writing
index, tag pages, reading time, RSS feed, Markdown endpoint, and `llms.txt`
are generated automatically from MDX content.

Shared MDX components are registered once in `src/components/mdx.ts`, so they
can be used in a post without adding import statements. For example:

```mdx
<Collapsible title="Additional detail">
  Content that should be expandable.
</Collapsible>
```

Use `heroImage` only when an image should also appear at the top of the full
article. `coverImage` controls the writing-index card without changing the
article layout.

## Add a Knowledge Base note

Create a note under its learning domain:

```text
src/content/knowledge/
├── ml-engineering/
├── web-application-security/
└── security-payloads/
```

Each note is an `index.mdx` file:

```mdx
---
title: "Concept name"
description: "What this note helps explain."
category: ml-engineering
pubDate: 2026-07-25
topics:
  - evaluation
  - model development
order: 10
---

Write the note here.
```

The left navigation, overview cards, reading time, plain-Markdown endpoint,
and `llms.txt` entry are generated automatically. Supported domains and their
display order are maintained in `src/content/knowledge-taxonomy.ts`.

For a concept that benefits from interaction, use the registered canvas
component directly in MDX:

```mdx
<InteractiveCanvas
  title="Explore the split proportions"
  description="Adjust the controls to compare training, validation, and test data."
/>
```

Additional interactive explanations can be added to
`src/components/InteractiveCanvas.astro` or registered alongside it in
`src/components/mdx.ts`.
