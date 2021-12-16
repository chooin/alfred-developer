import alfy from "alfy";
import { Base64 } from "js-base64";

let items = [
  {
    title: decodeURIComponent(alfy.input),
    subtitle: "URL decode",
    arg: decodeURIComponent(alfy.input),
  },
];

if (Base64.isValid(alfy.input)) {
  items = [
    ...items,
    {
      title: Base64.decode(alfy.input),
      subtitle: "Base64",
      arg: Base64.decode(alfy.input),
    },
  ];
}

alfy.output(items);
