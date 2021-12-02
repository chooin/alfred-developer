import alfy from "alfy";

alfy.output([
  {
    title: encodeURIComponent(alfy.input),
    subtitle: `Copy to clipboard`,
    arg: encodeURIComponent(alfy.input),
  },
]);
