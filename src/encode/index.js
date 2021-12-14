import alfy from "alfy";

alfy.output([
  {
    title: encodeURIComponent(alfy.input),
    arg: encodeURIComponent(alfy.input),
  },
]);
