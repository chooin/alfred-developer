import alfy from 'alfy';
import queryString from 'query-string';

alfy.output(
  [600, 800, 1200].map(size => ({
    title: alfy.input,
    subtitle: `${size} px`,
    arg: queryString.stringifyUrl({
      url: 'https://alfred-developer-chooin.vercel.app/qrcode',
      query: {
        text: encodeURIComponent(alfy.input),
        size,
      },
    }),
  })),
);
