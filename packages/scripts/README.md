# `@wpackio/scripts`

Stub README

// TODO

> Intro

## Installation

If using `yarn`

```bash
yarn add @wpackio/scripts
```

or with `npm`

```bash
npm i @wpackio/scripts
```

## Usage

// TODO

> Usage instruction

## Configuration

// TODO

> Configuration instruction

## Development

This package has the same `npm scripts` as this monorepo. These should be run
using `lerna run <script>`. More information can be found under [CONTRIBUTION.md](../../CONTRIBUTION.md).

-   `build`: Use babel to build for nodejs 8.6+. Files inside `src` are compiled and put under `lib`.
-   `prepare`: Run `build` after `yarn` and before `publish`.
-   `watch`: Watch for changes in `src` and build in `lib`.