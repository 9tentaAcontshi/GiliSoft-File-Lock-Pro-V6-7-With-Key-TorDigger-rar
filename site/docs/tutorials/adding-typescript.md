---
title: Adding Typescript to your project
order: 3
shortTitle: Adding Typescript
---

`@wpackio/scripts` has first-class support for both
[typescript](https://www.typescriptlang.org/) and
[flow type](https://flow.org/). While flow works right out of the box there are
some configuration needed for typescript.

## Provided tooling

`@wpackio/scripts` comes with the build tooling for typescript, not typescript
and webpack plugins. Also note that, we use
[babel 7](https://babeljs.io/docs/en/babel-preset-typescript) to compile
typescript and
[Fork TS Checked Webpack Plugin](https://github.com/Realytics/fork-ts-checker-webpack-plugin)
to show type-errors during build/development time. So there are some gotchas.

## What doesn't work

As
[explained in microsoft blog](https://blogs.msdn.microsoft.com/typescript/2018/08/27/typescript-and-babel-7/)
the following doesn't work when using babel to compile typescript.

- namespaces.
- bracket style type-assertion/cast syntax regardless of when JSX is enabled
  (i.e. writing `<Foo>x` won’t work even in `.ts` files if JSX support is turned
  on, but you can instead write `x as Foo`).
- enums that span multiple declarations (i.e. enum merging).
- legacy-style import/export syntax (i.e. `import foo = require(...)` and
  `export = foo`).

So keep these in mind.

## Installing dependencies

First we need to install `typescript` itself.

```bash
npm i -D typescript fork-ts-checker-webpack-plugin
```

Now create `tsconfig.json` at the root according to your need. Here's a sample.

```json
{
	"compilerOptions": {
		/* Basic Options */
		"target": "esnext", // we would be compiling with babel, so we can target esnext
		"module": "esnext", // for import() and es5 import/export
		"lib": ["esnext", "dom"], // include all libraries you need
		"jsx": "preserve", // because babel will transform it

		/* Strict Type-Checking Options */
		"strict": true, // suggested

		/* Module Resolution Options */
		"moduleResolution": "node", // because of webpack
		"allowSyntheticDefaultImports": true, // to make it compatible with babel
		"esModuleInterop": true, // to make it compatible with babel
		"isolatedModules": true // to limit implementation
	}
}
```

Having `moduleResolution` and `isolatedModules` is a good idea, cause you won't
accidentally use something that isn't supported.

## Usage

Now simply define `.ts` or `.tsx` file in your `wpackio.project.js` file as
entry-point.

```js
module.exports = {
	// ...
	files: {
		name: 'tsapp',
		entry: {
			main: ['./src/tsapp/main.ts'],
		},
	},
};
```

Now you are good to go. The compiler will also show any `ts` error you might
have.

> **NOTE** - Internally wpack.io depends on
> [`fork-ts-checker-webpack-plugin`](https://github.com/Realytics/fork-ts-checker-webpack-plugin)
> to show type errors during build time. So make sure you install it, otherwise
> it will not work.

## Optimization

By default `@wpackio/scripts` will create an instance of
`fork-ts-checker-webpack-plugin` if a `tsconfig.json` is found in the current
project root.

The same plugin would go into all multi-entry compiler instances and would
enable typechecking for all entries.

Sometimes, this could not be the desired feature. For instance, you might have a
plain JS app, alongside a TS app and you don't want the typechecker for the JS
app. Luckily it is not possible to explicitly disable typechecking for
individual file entry using `hasTypeScript`.

Furthermore, due to the nature of TypeScript, you might notice duplicate error
reports across multiple files entry. This can also be remedied using
`typeWatchFiles` config variable.

Under your [`FileConfig`](/apis/project-configuration/#files-array) add the
`hasTypeScript` option. Below is an example of two apps, one explicitly
disabling the typecheck.

**wpackio.project.js**

```js
module.exports = {
	// ...
	files: [
		// Only JavaScript App
		{
			name: 'jsapp',
			entry: {
				main: './src/jsapp/index.js',
			},
			// disable typechecking for this
			hasTypeScript: false,
		},
		// TypeScript App
		{
			name: 'tsapp',
			entry: {
				main: './src/tsapp/index.ts',
			},
			// (optional) enable typechecking for this
			hasTypeScript: true,
			// (optional but recommended) mention files to report
			// through glob pattern
			typeWatchFiles: ['src/tsapp/*.{ts,tsx}', 'src/tsapp/**/*.{ts,tsx}'],
		},
	],
};
```
