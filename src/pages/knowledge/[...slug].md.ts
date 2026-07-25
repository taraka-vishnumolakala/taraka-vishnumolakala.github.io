import type { CollectionEntry } from 'astro:content';
import type { APIContext } from 'astro';
import { getKnowledgeEntries } from '../../lib/knowledge';
import { mdxBodyToMarkdown } from '../../lib/mdx-to-md';

export async function getStaticPaths() {
	const notes = await getKnowledgeEntries();

	return notes.map((note) => ({
		params: { slug: note.id },
		props: { note },
	}));
}

type Props = { note: CollectionEntry<'knowledge'> };

export async function GET({
	props,
}: APIContext<Props>): Promise<Response> {
	const { note } = props;
	const frontmatter = renderFrontmatter(note);
	const body = mdxBodyToMarkdown(note.body ?? '');

	return new Response(frontmatter + body, {
		headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
	});
}

function renderFrontmatter(note: CollectionEntry<'knowledge'>): string {
	const lines: string[] = ['---'];
	lines.push(`title: ${JSON.stringify(note.data.title)}`);
	lines.push(`description: ${JSON.stringify(note.data.description)}`);
	lines.push(`category: ${note.data.category}`);
	if (note.data.section) lines.push(`section: ${note.data.section}`);
	if (note.data.sectionLanding) lines.push('sectionLanding: true');
	lines.push(`pubDate: ${isoDate(note.data.pubDate)}`);
	if (note.data.updatedDate) {
		lines.push(`updatedDate: ${isoDate(note.data.updatedDate)}`);
	}
	if (note.data.topics.length > 0) {
		lines.push('topics:');
		for (const topic of note.data.topics) lines.push(`  - ${topic}`);
	}
	lines.push('---', '', '');
	return lines.join('\n');
}

function isoDate(date: Date): string {
	return date.toISOString().slice(0, 10);
}
