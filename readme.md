# url-cli [![Build Status](https://travis-ci.org/k4m4/url-cli.svg?branch=master)](https://travis-ci.org/k4m4/url-cli)

> URL encode & decode a string, right from your terminal.

---

## Install

```
~ ❯❯❯ npm install -g url-cli
```


## Usage

```
  URL encode & decode a string, right from your terminal.

  Usage
    ~ ❯❯❯ url [string]
    ~ ❯❯❯ echo [string] | url
  Options
        -d, --decode  Decode URL encoded string
  Examples
    ~ ❯❯❯ url "just 4n0ther URL enc0d3d $tr1ng"  
    ✔ just%204n0ther%20URL%20enc0d3d
    ~ ❯❯❯ url -d url%E2%80%93encoded%20string
    ✔ url–encoded string
```


## License

MIT © [Nikolaos Kamarinakis](https://nikolaskama.me)