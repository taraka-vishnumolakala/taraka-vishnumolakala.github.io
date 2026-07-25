import { getCollection, type CollectionEntry } from 'astro:content';
import {
	KNOWLEDGE_CATEGORIES,
	type KnowledgeCategoryId,
} from '../content/knowledge-taxonomy';
import { getReadingTime } from './reading-time';

export type KnowledgeEntry = CollectionEntry<'knowledge'>;
export type KnowledgeNote = KnowledgeEntry & { readingTime: number };

const categoryOrder = new Map(
	KNOWLEDGE_CATEGORIES.map((category, index) => [category.id, index]),
);

export const sortKnowledgeEntries = (entries: KnowledgeEntry[]) =>
	[...entries].sort((a, b) => {
		const categoryDifference =
			(categoryOrder.get(a.data.category) ?? 0) -
			(categoryOrder.get(b.data.category) ?? 0);

		if (categoryDifference !== 0) return categoryDifference;
		if (a.data.order !== b.data.order) return a.data.order - b.data.order;
		return a.data.title.localeCompare(b.data.title);
	});

export const addKnowledgeReadingTime = (
	entries: KnowledgeEntry[],
): KnowledgeNote[] =>
	entries.map((entry) => ({
		...entry,
		readingTime: getReadingTime(entry.body ?? ''),
	}));

export const getKnowledgeEntries = async () =>
	sortKnowledgeEntries(await getCollection('knowledge'));

export const getKnowledgeNotes = async () =>
	addKnowledgeReadingTime(await getKnowledgeEntries());

export const groupKnowledgeNotes = (notes: KnowledgeNote[]) =>
	KNOWLEDGE_CATEGORIES.map((category) => ({
		...category,
		notes: notes.filter((note) => note.data.category === category.id),
	}));

export const getKnowledgeCategoryCount = (
	notes: KnowledgeNote[],
	category: KnowledgeCategoryId,
) => notes.filter((note) => note.data.category === category).length;
