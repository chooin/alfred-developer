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
      title: parse.format("YYYY-MM-DD HH:mm:ss"),
      subtitle: "UTC+0800",
      arg: parse.format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: parse.add(-8, "hour").format("YYYY-MM-DD HH:mm:ss"),
      subtitle: "UTC",
      arg: parse.add(-8, "hour").format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: parse.toISOString(),
      subtitle: "ISO-8601",
      arg: parse.toISOString(),
    },
    {
      title: parse.valueOf(),
      subtitle: "Unix(ms)",
      arg: parse.valueOf(),
    },
    {
      title: parse.unix(),
      subtitle: "Unix(s)",
      arg: parse.unix(),
    },
  ];
}

alfy.output(items);
