import { getCollection, type CollectionEntry } from 'astro:content';
import { TAG_DESCRIPTIONS } from '../content/taxonomy';
import { getReadingTime } from './reading-time';

export type BlogEntry = CollectionEntry<'blog'>;
export type BlogPost = BlogEntry & { readingTime: number };

const SPECIAL_WORDS: Record<string, string> = {
	ai: 'AI',
	api: 'API',
	mcp: 'MCP',
	ml: 'ML',
};

export const sortBlogPosts = (posts: BlogEntry[]) =>
	[...posts].sort(
		(a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
	);

export const addReadingTime = (posts: BlogEntry[]): BlogPost[] =>
	posts.map((post) => ({
		...post,
		readingTime: getReadingTime(post.body ?? ''),
	}));

export const getBlogEntries = async () =>
	sortBlogPosts(await getCollection('blog'));

export const getBlogPosts = async () =>
	addReadingTime(await getBlogEntries());

export const getTagCounts = (posts: BlogEntry[]) => {
	const tagCounts = new Map<string, number>();

	for (const post of posts) {
		for (const tag of post.data.tags ?? []) {
			tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
		}
	}

	return [...tagCounts.entries()].sort((a, b) => a[0].localeCompare(b[0]));
};

export const getTags = (posts: BlogEntry[]) =>
	getTagCounts(posts).map(([tag]) => tag);

export const formatTag = (tag: string) =>
	tag
		.split('-')
		.map((word, index) => {
			const normalized = word.toLowerCase();
			if (SPECIAL_WORDS[normalized]) return SPECIAL_WORDS[normalized];
			if (index > 0 && normalized === 'and') return 'and';
			return word[0]?.toUpperCase() + word.slice(1);
		})
		.join(' ');

export const getTagDescription = (tag: string) =>
	TAG_DESCRIPTIONS[tag as keyof typeof TAG_DESCRIPTIONS] ??
	`Research and field notes about ${formatTag(tag)}.`;
