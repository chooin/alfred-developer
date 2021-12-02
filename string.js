import alfy from 'alfy';
import md5 from 'md5';
import sha1 from 'sha1';

let items = [];

if (alfy.input) {
	items = [
		{
			title: alfy.input.toLowerCase(),
			subtitle: 'To lower',
			arg: alfy.input.toLowerCase(),
		},
		{
			title: alfy.input.toUpperCase(),
			subtitle: 'To upper',
			arg: alfy.input.toUpperCase(),
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
	]
	if (alfy.input.length === 1) {
		items = [
			{
				title: alfy.input.charCodeAt(0),
				subtitle: 'Char code',
				arg: alfy.input.charCodeAt(0),
			},
			...items,
		]
	}
}

alfy.output(items);
