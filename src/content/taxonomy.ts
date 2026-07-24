export const BLOG_TAGS = [
	'agent-and-ml-security',
	'agent-identity',
	'model-lifecycle-controls',
	'system-design',
	'secure-integration',
] as const;

export type BlogTag = (typeof BLOG_TAGS)[number];

export const TAG_DESCRIPTIONS: Record<BlogTag, string> = {
	'agent-and-ml-security':
		'Security architecture and controls for models, agents, and AI-enabled systems.',
	'agent-identity':
		'Identity, authorization, permissions, and trust boundaries for agents.',
	'model-lifecycle-controls':
		'Security controls across model development, deployment, inference, and monitoring.',
	'system-design':
		'Secure architecture, trust boundaries, failure modes, and design decisions.',
	'secure-integration':
		'Secure connections between agents, protocols, tools, and external services.',
};
