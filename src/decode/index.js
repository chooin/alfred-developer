import alfy from "alfy";
import { Base64 } from "js-base64";

alfy.output([
  {
    title: decodeURIComponent(alfy.input),
    subtitle: "URI",
    arg: decodeURIComponent(alfy.input),
  },
  {
    title: Base64.decode(alfy.input),
    subtitle: "Base64",
    arg: Base64.decode(alfy.input),
  },
]);
