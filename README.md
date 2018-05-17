# quokka-plugin-scratch-imports


Small [quokka](https://quokkajs.com/) plugin for resolving node_module imports from subdirectories

## But why?
I am using quokka mostly in "scratch" mode to check/test small pieces of code that uses project node_modules.
In general it's not a problem until you have some kind of monorepo, so there is a lot of subdirectories with their own modules, even tho it's not a problem until you are doing this in scratch mode.

Scratch mode will relate on repo root directory, trying to load modules from `repo/node_modules`, in this case the only option is to write full relative path.


## Usage

Add plugin to [quokka config](https://quokkajs.com/docs/configuration.html):

```json
{
  "plugins": ["quokka-plugin-scratch-imports"],
}
```

Plugin can be used in two ways, let's say you have monorepo with 2 project:
```
my-monorepo-project
├── client
├── server
```

First way is to adding "subdir" into config:

```json
{
  "quokka": {
    "plugins": ["quokka-plugin-scratch-imports"],
    "subdir": "client"
  }
}
```

(can be added directly in quokka file, [see details](https://quokkajs.com/docs/configuration.html#inline-config))


With above configuration:

```js
const _ = require('lodash')
```

is equal to:

```js
const _ = require('./my-monorepo-project/client/node_modules/lodash')
```

Second way is to add tilda symbol before import:

```js
const koa = require('~server/koa')
```

is equal to:

```js
const _ = require('./my-monorepo-project/server/node_modules/koa')
```

By default imports prepended with `tilda` will have advantage over `subdir` config

## Install

You can install it as dev dependency for your package:

### Yarn

    yarn add --save --dev quokka-plugin-scratch-imports


### NPM

    npm install --save-dev quokka-plugin-scratch-imports
