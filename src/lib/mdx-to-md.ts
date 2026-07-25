type ComponentTransform = (
	attrs: Record<string, string>,
	children: string,
) => string;

const TRANSFORMS: Record<string, ComponentTransform> = {
	Collapsible: (attrs, children) =>
		`#### ${attrs.title ?? 'Details'}\n\n${children.trim()}\n`,
};

const SELF_CLOSING_TRANSFORMS: Record<
	string,
	(attrs: Record<string, string>) => string
> = {
	InteractiveCanvas: (attrs) =>
		`> Interactive visualization: ${attrs.title ?? 'Concept explorer'}\n`,
};

export function mdxBodyToMarkdown(body: string): string {
	let out = body;

	for (const [name, transform] of Object.entries(TRANSFORMS)) {
		const re = new RegExp(
			`<${name}\\s*([^>]*?)>([\\s\\S]*?)</${name}>`,
			'g',
		);
		out = out.replace(re, (_match, attrString: string, children: string) => {
			const attrs = parseAttrs(attrString);
			return transform(attrs, children);
		});
	}

	for (const [name, transform] of Object.entries(SELF_CLOSING_TRANSFORMS)) {
		const re = new RegExp(`<${name}\\s*([^>]*?)\\s*/>`, 'g');
		out = out.replace(re, (_match, attrString: string) => {
			const attrs = parseAttrs(attrString);
			return transform(attrs);
		});
	}

	const segments = splitOnFences(out);
	out = segments
		.map((seg) => (seg.fenced ? seg.text : stripProseOnly(seg.text)))
		.join('');

	return out.trim() + '\n';
}

function stripProseOnly(text: string): string {
	return text
		.replace(/^[ \t]*(?:import|export)\s+[^\n]*\n?/gm, '')
		.replace(/<\/?[A-Z][A-Za-z0-9]*[^>]*\/?>/g, '');
}

function parseAttrs(attrString: string): Record<string, string> {
	const attrs: Record<string, string> = {};
	const re = /([A-Za-z_][\w-]*)\s*=\s*(?:"([^"]*)"|'([^']*)'|\{([^}]*)\})/g;
	let m: RegExpExecArray | null;
	while ((m = re.exec(attrString)) !== null) {
		attrs[m[1]] = m[2] ?? m[3] ?? m[4] ?? '';
	}
	return attrs;
}

type Segment = { fenced: boolean; text: string };

function splitOnFences(body: string): Segment[] {
	const segments: Segment[] = [];
	const fenceRe = /^([ \t]*)(```|~~~)([^\n]*)\n([\s\S]*?)\n\1\2[ \t]*$/gm;
	let last = 0;
	let m: RegExpExecArray | null;
	while ((m = fenceRe.exec(body)) !== null) {
		if (m.index > last) {
			segments.push({ fenced: false, text: body.slice(last, m.index) });
		}
		segments.push({ fenced: true, text: m[0] });
		last = m.index + m[0].length;
	}
	if (last < body.length) {
		segments.push({ fenced: false, text: body.slice(last) });
	}
	return segments;
}
