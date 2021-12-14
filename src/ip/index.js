import alfy from "alfy";
import { v4 } from "public-ip";
import { internalIpV4 } from "internal-ip";

const publicIP = await v4();
const internalIP = await internalIpV4();

alfy.output([
  {
    title: publicIP,
    subtitle: "Public IP",
    arg: publicIP,
  },
  {
    title: internalIP,
    subtitle: "Internal IP",
    arg: internalIP,
  },
]);
