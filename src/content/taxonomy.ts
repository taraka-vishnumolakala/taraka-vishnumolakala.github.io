export const BLOG_TAGS = [
	'ml-engineering',
	'web-application-security',
	'security-architecture-and-system-design',
	'agent-and-ml-security',
] as const;

export type BlogTag = (typeof BLOG_TAGS)[number];

export const TAG_LABELS: Record<BlogTag, string> = {
	'ml-engineering': 'ML Engineering',
	'web-application-security': 'Web Application Security',
	'security-architecture-and-system-design': 'Security Architecture and System Design',
	'agent-and-ml-security': 'Agent and ML Security',
};

export const TAG_DESCRIPTIONS: Record<BlogTag, string> = {
	'ml-engineering':
		'Models, data pipelines, evaluation, deployment, and production ML systems.',
	'web-application-security':
		'Browser and server trust boundaries, application controls, and secure web development.',
	'security-architecture-and-system-design':
		'Secure architecture, system design, trust boundaries, and engineering tradeoffs.',
	'agent-and-ml-security':
		'Security architecture and controls for models, agents, and AI-enabled systems.',
};
