import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import {
	KNOWLEDGE_CATEGORY_IDS,
	KNOWLEDGE_SECTION_IDS,
} from './content/knowledge-taxonomy';
import { BLOG_TAGS } from './content/taxonomy';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			author: z.string().default('Taraka Vishnumolakala'),
			updatedDate: z.coerce.date().optional(),
			heroImage: image().optional(),
			coverImage: image().optional(),
			coverAlt: z.string().optional(),
			presentation: z.boolean().default(false),
			showPageActions: z.boolean().default(true),
			tags: z.array(z.enum(BLOG_TAGS)).optional(),
			series: z.string().optional(),
		}),
});

const knowledge = defineCollection({
	loader: glob({ base: './src/content/knowledge', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		category: z.enum(KNOWLEDGE_CATEGORY_IDS),
		section: z.enum(KNOWLEDGE_SECTION_IDS).optional(),
		sectionLanding: z.boolean().default(false),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		topics: z.array(z.string()).default([]),
		order: z.number().int().nonnegative().default(100),
	}),
});

export const collections = { blog, knowledge };
