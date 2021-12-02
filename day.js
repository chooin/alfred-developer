import alfy from "alfy";
import dayjs from "dayjs";

let items = [
  {
    title: "Invalid Date",
  },
];

const parse = alfy.input ? dayjs(alfy.input) : dayjs();

if (parse.isValid()) {
  items = [
    {
      title: `Asia/Shanghai: ${parse.format("YYYY-MM-DD HH:mm:ss")}`,
      arg: parse.format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: `UTC: ${parse.add(-8, "hour").format("YYYY-MM-DD HH:mm:ss")}`,
      arg: parse.add(-8, "hour").format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: `ISO: ${parse.toISOString()}`,
      arg: parse.toISOString(),
    },
    {
      title: `Unix(ms): ${parse.valueOf()}`,
      arg: parse.valueOf(),
    },
    {
      title: `Unix(s): ${parse.unix()}`,
      arg: parse.valueOf(),
    },
    {
      title: `Year: ${parse.format("YYYY")}`,
      arg: parse.format("YYYY"),
    },
    {
      title: `Month: ${parse.format("MM")}`,
      arg: parse.format("MM"),
    },
    {
      title: `Day: ${parse.format("DD")}`,
      arg: parse.format("DD"),
    },
  ].map((item) => ({
    ...item,
    subtitle: `Copy to clipboard`,
  }));
}

alfy.output(items);
