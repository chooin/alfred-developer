import alfy from 'alfy';
import ipify from 'ipify';
import { internalIpV4 } from 'internal-ip';

const ipv4 = await ipify({ useIPv6: false });
const internalIP = await internalIpV4();

alfy.output([
  {
    title: ipv4,
    subtitle: 'Public IP',
    arg: ipv4,
  },
  {
    title: internalIP,
    subtitle: 'Internal IP',
    arg: internalIP,
  },
]);
