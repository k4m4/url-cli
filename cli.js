#!/usr/bin/env node
'use strict';
const meow       = require('meow');
const getStdin   = require('get-stdin');
const logSymbols = require('log-symbols');

const cli = meow(`
	Usage
	  ~ ❯❯❯ url [string]
	  ~ ❯❯❯ echo [string] | url
	Options
		-d, --decode  Decode URL encoded string
		-p, --plain   Display output without log symbols
	Examples
	  ~ ❯❯❯ url "just 4n0ther URL enc0d3d $tr1ng"
	  ${logSymbols.success} just%204n0ther%20URL%20enc0d3d
	  ~ ❯❯❯ url -d url%E2%80%93encoded%20string
	  ${logSymbols.success} url–encoded string
`, {
	flags: {
		decode: {
			type: 'boolean',
			alias: 'd',
			default: false
		},
		plain: {
			type: 'boolean',
			alias: 'p',
			default: false
		}
	}
});

const input = cli.input[0];

function URLEncode (text) {
	return encodeURIComponent(text);
}

function URLEncodedRegex (ciphertext) {
  const re = '(?:[^%]|%[0-9A-Fa-f]{2})+'
	if ((ciphertext ? new RegExp('(?:^' + re + '$)') : new RegExp(re, 'g')).test(ciphertext)) return true;
	else return false
}

function URLDecode (text) {
  if (URLEncodedRegex(text)) return decodeURIComponent(text);
  else return 'Ciphertext doesn\'t seem to be URL-encoded'
}

function display (plaintext) {
	if (plaintext != 'Ciphertext doesn\'t seem to be URL-encoded') {
		const leading = (cli.flags["plain"]) ? `` : `${logSymbols.success} `
		console.log(leading + plaintext)
	} else {
		const leading = (cli.flags["plain"]) ? `` : `${logSymbols.error} `
		console.log(leading + `Ciphertext doesn\'t seem to be URL-encoded`);
		process.exit(1);
	}
}

if (!input && process.stdin.isTTY) {
	console.log('Enter string to URL encode/decode');
	process.exit(1);
}
if (input) {
	if (cli.flags["decode"]) {
		display(URLDecode(input.trim()));
	} else {
		display(URLEncode(input.trim()));
	}
} else {
	getStdin().then(stdin => {
		if (cli.flags["decode"]) {
			display(URLDecode(stdin.trim()));
		} else {
			display(URLEncode(stdin.trim()));
		}
	})
}