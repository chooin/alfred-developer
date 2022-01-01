import alfy from 'alfy';
import { Base64 } from 'js-base64';
import md5 from 'md5';
import sha1 from 'sha1';

alfy.output([
  {
    title: encodeURIComponent(alfy.input),
    subtitle: 'URL encode',
    arg: encodeURIComponent(alfy.input),
  },
  {
    title: Base64.encode(alfy.input),
    subtitle: 'Base64',
    arg: Base64.encode(alfy.input),
  },
  {
    title: md5(alfy.input),
    subtitle: 'MD5',
    arg: md5(alfy.input),
  },
  {
    title: sha1(alfy.input),
    subtitle: 'SHA-1',
    arg: sha1(alfy.input),
  },
]);
