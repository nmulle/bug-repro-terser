# terser-error-repro
Reproduction case for `terser` error.

## Scripts

There are 3 yarn scripts available from anywhere in the project:
* `yarn resolve:terser <desired terser version>`
* `yarn build-run:dev`
* `yarn build-run:prod`


### `yarn resolve:terser <desired terser version>`

Set the resolved terser version to `<desired terser version>`.

### `yarn build-run:dev`

Build and then run a non-minified (i.e. no terser used) bundle of `@repro/main-package` with `node`.
This is the control that the original code is not faulty, and that dependencies other than terser are not causing the error.

### `yarn build-run:prod`

Build and then run a minified (by terser) bundle of `@repro/main-package` with `node`.
If the error occurs, the build is successful, but the run ends in a `ReferenceError: BaseClass is not defined` runtime error.

## Tested versions
The latest terser version that does not reproduce the error, is `5.15.0`. From `5.15.1` to `5.17.4` the error does happen.
Monorepo:
* Yarn 2 (berry) workspaces
* TypeScript, babel
* No build frameworks (lerna, nx, etc.)

## Yarn 2 workspaces

This repo uses yarn plug-n-play.

Repo structure distinguishes
* main-package
* dependency-package

package.json in the top-level root directory:

```json
{
  ...
  "private": true,
  "workspaces": [
    "main-package",
    "dependency-package"
  ],
  ...
}
```

### Adding dependencies with their types

To add a dependency to a workspace, and automatically adding its types to devDependencies, run `yarn add <dep-name>` in
that workspace. Yarn's TypeScript plugin finds the dependency's `@types` package, if it exists, and adds it to dev
dependencies automatically.

### Unplugging dependencies

Some packages may not work with yarn's plug-n-play mode. To make them work, *unplugging* those packages can help.
This means that yarn will keep an unzipped version of a package, which comes closer to the `node_modules` linker.
The base command is `yarn unplug <package>`.

* The option `-R` will also unplug the package's dependencies recursively.
* The option `-A` will unplug the package in every workspace that it's used in.

### Notes on some dependencies.

* Some eslint-related packages need to be unplugged for eslint to work on Windows.

### TypeScript

* Use for type checking.
* Target ESNext in all configurations (code and module format).
* JavaScript code generation.
* Use babel to transpile for a specific target. -> by using webpack

#### Scripts

```json
{
  ...
  "scripts": {
    "type-check": "yarn run -T tsc --noEmit"
  },
  ...
}
```

##### yarn type-check

* Available from package `main-package`. 
* Type-checks all project code used directly or indirectly by said package.
