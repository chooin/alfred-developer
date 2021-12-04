import alfy from "alfy";
import queryString from "query-string";

alfy.output(
  [1200, 800, 600].map((size) => ({
    title: `${size}: ${alfy.input}`,
    subtitle: "Open in browser",
    arg: queryString.stringifyUrl({
      url: "https://alfred-developer-chooin.vercel.app/qrcode",
      query: {
        text: encodeURIComponent(alfy.input),
        size,
      },
    }),
  }))
);