import type { CollectionEntry } from 'astro:content';
import type { APIContext } from 'astro';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';
import { getBlogEntries } from '../lib/blog';
import { getKnowledgeEntries } from '../lib/knowledge';

const FALLBACK_GROUP = 'Posts';

export async function GET(context: APIContext): Promise<Response> {
	const posts = (await getBlogEntries()).sort(
		(a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf(),
	);
	const knowledgeNotes = await getKnowledgeEntries();

	const groups = new Map<string, CollectionEntry<'blog'>[]>();
	for (const post of posts) {
		const key = post.data.series ?? FALLBACK_GROUP;
		const bucket = groups.get(key);
		if (bucket) bucket.push(post);
		else groups.set(key, [post]);
	}

	const sortedGroups = [...groups.entries()].sort(([, a], [, b]) => {
		const aMax = Math.max(...a.map((p) => p.data.pubDate.valueOf()));
		const bMax = Math.max(...b.map((p) => p.data.pubDate.valueOf()));
		return bMax - aMax;
	});

	const lines: string[] = [`# ${SITE_TITLE}`, '', `> ${SITE_DESCRIPTION}`, ''];

	for (const [name, entries] of sortedGroups) {
		lines.push(`## ${name}`, '');
		for (const post of entries) {
			const url = new URL(`/blog/${post.id}.md`, context.site).toString();
			lines.push(`- [${post.data.title}](${url}): ${post.data.description}`);
		}
		lines.push('');
	}

	if (knowledgeNotes.length > 0) {
		lines.push('## Knowledge Base', '');
		for (const note of knowledgeNotes) {
			const url = new URL(`/knowledge/${note.id}.md`, context.site).toString();
			lines.push(`- [${note.data.title}](${url}): ${note.data.description}`);
		}
		lines.push('');
	}

	return new Response(lines.join('\n'), {
		headers: { 'Content-Type': 'text/plain; charset=utf-8' },
	});
}
