import alfy from 'alfy';

let items = [];

if (alfy.input) {
  items = [
    {
      title: alfy.input,
      arg: alfy.input,
    },
  ];
}

alfy.output(items);
