import alfy from "alfy";
import { Base64 } from "js-base64";

alfy.output([
  {
    title: encodeURIComponent(alfy.input),
    subtitle: "URI",
    arg: encodeURIComponent(alfy.input),
  },
  {
    title: Base64.encode(alfy.input),
    subtitle: "Base64",
    arg: Base64.decode(alfy.input),
  },
]);
