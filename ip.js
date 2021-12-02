import alfy from 'alfy';
import { v4 } from 'public-ip';
import { internalIpV4 } from 'internal-ip';

const publicIP = await v4();
const internalIP = await internalIpV4();

alfy.output([
	{
		title: `Public IP: ${publicIP}`,
		subtitle: `Copy to clipboard`,
		arg: publicIP,
	},
	{
		title: `Internal IP: ${internalIP}`,
		subtitle: `Copy to clipboard`,
		arg: internalIP,
	},
]);
