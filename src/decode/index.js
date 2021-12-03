import alfy from "alfy";

alfy.output([
  {
    title: decodeURIComponent(alfy.input),
    subtitle: `Copy to clipboard`,
    arg: decodeURIComponent(alfy.input),
  },
]);
