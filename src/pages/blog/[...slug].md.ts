import type { CollectionEntry } from 'astro:content';
import type { APIContext } from 'astro';
import { getBlogEntries } from '../../lib/blog';
import { mdxBodyToMarkdown } from '../../lib/mdx-to-md';

export async function getStaticPaths() {
	const posts = await getBlogEntries();
	return posts.map((post) => ({
		params: { slug: post.id },
		props: { post },
	}));
}

type Props = { post: CollectionEntry<'blog'> };

export async function GET({
	props,
}: APIContext<Props>): Promise<Response> {
	const { post } = props;
	const fm = renderFrontmatter(post);
	const body = mdxBodyToMarkdown(post.body ?? '');
	return new Response(fm + body, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
}

function renderFrontmatter(post: CollectionEntry<'blog'>): string {
	const lines: string[] = ['---'];
	lines.push(`title: ${JSON.stringify(post.data.title)}`);
	lines.push(`description: ${JSON.stringify(post.data.description)}`);
	lines.push(`pubDate: ${isoDate(post.data.pubDate)}`);
	if (post.data.updatedDate) {
		lines.push(`updatedDate: ${isoDate(post.data.updatedDate)}`);
	}
	if (post.data.series) {
		lines.push(`series: ${JSON.stringify(post.data.series)}`);
	}
	if (post.data.tags && post.data.tags.length > 0) {
		lines.push('tags:');
		for (const tag of post.data.tags) lines.push(`  - ${tag}`);
	}
	lines.push('---', '', '');
	return lines.join('\n');
}

function isoDate(d: Date): string {
	return d.toISOString().slice(0, 10);
}
