export const KNOWLEDGE_CATEGORIES = [
	{
		id: 'ml-engineering',
		label: 'ML Engineering',
		description:
			'Models, data pipelines, evaluation, deployment, and production ML systems.',
	},
	{
		id: 'web-application-security',
		label: 'Web Application Security',
		description:
			'Browser and server trust boundaries, application controls, and failure modes.',
	},
	{
		id: 'security-payloads',
		label: 'Security Payloads',
		description:
			'Context-aware test inputs, encoding behavior, and safe verification techniques.',
	},
] as const;

export type KnowledgeCategoryId =
	(typeof KNOWLEDGE_CATEGORIES)[number]['id'];

export const KNOWLEDGE_SECTIONS = [
	{
		id: 'math-foundations',
		label: 'Math Foundations',
		category: 'ml-engineering',
		description:
			'Visual, interactive introductions to the math that powers model inference and training.',
	},
] as const;

export type KnowledgeSectionId =
	(typeof KNOWLEDGE_SECTIONS)[number]['id'];

export const KNOWLEDGE_CATEGORY_IDS = KNOWLEDGE_CATEGORIES.map(
	(category) => category.id,
) as [KnowledgeCategoryId, ...KnowledgeCategoryId[]];

export const KNOWLEDGE_SECTION_IDS = KNOWLEDGE_SECTIONS.map(
	(section) => section.id,
) as [KnowledgeSectionId, ...KnowledgeSectionId[]];

export const getKnowledgeCategory = (id: KnowledgeCategoryId) =>
	KNOWLEDGE_CATEGORIES.find((category) => category.id === id) ??
	KNOWLEDGE_CATEGORIES[0];

export const getKnowledgeSection = (id: KnowledgeSectionId) =>
	KNOWLEDGE_SECTIONS.find((section) => section.id === id) ??
	KNOWLEDGE_SECTIONS[0];
