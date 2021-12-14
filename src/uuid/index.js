import alfy from "alfy";
import * as uuid from "uuid";

const v1 = uuid.v1();
const v4 = uuid.v4();

alfy.output([
  {
    title: v4,
    subtitle: "v4",
    arg: v4,
  },
  {
    title: v1,
    subtitle: "v1",
    arg: v1,
  },
]);
