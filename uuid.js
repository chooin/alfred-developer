import alfy from 'alfy';
import * as uuid from 'uuid';

const v1 = uuid.v1();
const v4 = uuid.v4();

alfy.output([
	{
		title: `v4: ${v4}`,
		subtitle: `Copy to clipboard`,
		arg: v4,
	},
	{
		title: `v1: ${v1}`,
		subtitle: `Copy to clipboard`,
		arg: v1,
	},
]);
