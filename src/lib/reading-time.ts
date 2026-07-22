export function getReadingTime(body: string): number {
	const plain = body
		.replace(/```[\s\S]*?```/g, ' ')
		.replace(/^\s*(?:import|export)\s+[^;]*;/gm, ' ')
		.replace(/<[^>]+>/g, ' ')
		.replace(/[#>*_`~\[\]()!-]/g, ' ');
	const words = plain.split(/\s+/).filter(Boolean).length;
	return Math.max(1, Math.round(words / 225));
}
