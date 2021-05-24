qr-svg
======

Lightweight SVG QR code generator in JavaScript, based on @kazuhikoarase's [qrcode-generator](https://github.com/kazuhikoarase/qrcode-generator).

## Installation

The `qr-svg` package is distributed as a module on [npm](https://www.npmjs.com/package/qr-svg).

```
yarn add qr-svg
# or
npm install --save qr-svg
```

## Usage

```ts
import {QR} from 'qr-svg'

QR('hello') // <svg ...
```

## Developing

You need [Make](https://www.gnu.org/software/make/), [node.js](https://nodejs.org/en/) and [yarn](https://classic.yarnpkg.com/en/docs/install) installed.

Clone the repository and run `make` to checkout all dependencies and build the project. See the [Makefile](./Makefile) for other useful targets. Before submitting a pull request make sure to run `make lint`.
