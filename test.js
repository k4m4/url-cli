import test from 'ava';
import execa from 'execa';

test('url encoding', async t => {
	const {stdout} = await execa('./cli.js', ['just 4n0ther $tr1ng']);
	t.is(stdout, (`✔ ` + encodeURIComponent('just 4n0ther $tr1ng')));
});

test('url decoding', async t => {
	const {stdout} = await execa('./cli.js', ['-d', 'url%E2%80%93encoded%20string']);
	t.is(stdout, (`✔ ` + decodeURIComponent('url%E2%80%93encoded%20string')));
});