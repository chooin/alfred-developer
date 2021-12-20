import alfy from "alfy";
import moment from "moment";

let items = [
  {
    title: "Invalid Date",
  },
];

const parse = alfy.input ? moment(alfy.input) : moment();

if (parse.isValid()) {
  items = [
    {
      title: parse.format("YYYY-MM-DD HH:mm:ss"),
      subtitle: "UTC+0800",
      arg: parse.format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      title: parse.utc().format("YYYY-MM-DD HH:mm:ss"),
      subtitle: "UTC",
      arg: parse.utc().format("YYYY-MM-DD HH:mm:ss"),
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
