import alfy from 'alfy';
import chroma from 'chroma-js';

let items = [
	{
		title: 'Invalid Color',
	}
];

if (chroma.valid(alfy.input)) {
	items = [
		{
			title: chroma(alfy.input).name(),
			arg: chroma(alfy.input).name(),
		},
		{
			title: chroma(alfy.input).css(),
			arg: chroma(alfy.input).css(),
		}
	].map((item) => ({
		...item,
		subtitle: `Copy to clipboard`,
	}))
}

alfy.output(items);
