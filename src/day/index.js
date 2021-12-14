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
      subtitle: "Asia/Shanghai",
      arg: parse.format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: parse.add(-8, "hour").format("YYYY-MM-DD HH:mm:ss"),
      subtitle: "UTC",
      arg: parse.add(-8, "hour").format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: parse.toISOString(),
      subtitle: "ISO",
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
    {
      title: parse.format("YYYY"),
      subtitle: "Year",
      arg: parse.format("YYYY"),
    },
    {
      title: parse.format("MM"),
      subtitle: "Month",
      arg: parse.format("MM"),
    },
    {
      title: parse.format("DD"),
      subtitle: "Day",
      arg: parse.format("DD"),
    },
  ];
}

alfy.output(items);
