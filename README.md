# babel-plugin-s2s-axios-api-manager

> manage axios api

## Install

```
$ yarn add --dev babel-plugin-s2s-axios-api-manager
```

## Dependency

This plugin is dependent on babel-plugin-s2s-action-builders, babel-plugin-s2s-axios-api and babel-plugin-s2s-axios-api-root.

Please prepare these plugins before using this plugin.

[https://github.com/cndlhvn/babel-plugin-s2s-action-builders](https://github.com/cndlhvn/babel-plugin-s2s-action-builders)

[https://github.com/cndlhvn/babel-plugin-s2s-axios-api](https://github.com/cndlhvn/babel-plugin-s2s-axios-api)

[https://github.com/cndlhvn/babel-plugin-s2s-axios-api-root](https://github.com/cndlhvn/babel-plugin-s2s-axios-api-root)

## s2s.config.js

s2s-axios-api-manager plugin watch the `src/builders/*.js` files.


```js
module.exports = {
  watch: './**/*.js',
  plugins: [
    {
    test: /src\/api\/(?!.*index).*\.js/,
    plugin: ['s2s-axios-api']
    },
    {
      test: /src\/api\/(?!.*index).*\.js/,
      output: "index.js",
      plugin: ['s2s-axios-api-root',
      { input: 'src/api/*.js', output: "src/api/index.js" }]
    },
    {
      test: /src\/builders\/.*\.js/,
      plugin: ['s2s-axios-api-manager',
      { input: 'src/builders/*.js', output: "src/api/*.js" }]
    }
  ],
  templates: [
    {
      test: /src\/api\/.*\.js/, input: 'axios-api .js'
    }
  ]
}
```
## Start s2s

Start the s2s with yarn command

```
yarn run s2s
```

## Usage

#### When create a action builder file

When you create a `src/builders/*.js`, s2s creates `src/api/*.js` as a same name. \
For example, you create a `src/builders/user.js`, then s2s creates a `src/api/user.js`

#### Write action name

This plugin manages only a action name whose name end is "Request". \
If you create an action name that does not contain "Request", This plugin ignores it  

#### In:

In the action builder file, write action name with camelcase such as `getPokemonRequest` and save it.

`src/builders/pokemon.js`
```js
getPokemonRequest
```

It will be expanded like this.

#### Out:

`src/builders/pokemon.js`
```js
let getPokemonRequest;
let getPokemonSuccess;
let getPokemonFailure;
```

`src/api/pokemon.js`
```js
import axios from "../axiosConfig";
export const getPokemonRequest = config => axios.get(``, config);

```

#### Remove action name

If you remove the "action name" written in the `src/builders/*.js` file, "action name" is removed from the file with the same name in `src/api/`.

# Test

This plugin has two test files. \
First is babel plugin main test file named `test.js` on root directory. \
Next is a `test/index.js` that will be transformed by the plugin.

Run this command.

` npm run test`

Test will run and you can see what happen.

If you modify the target javascript source code, please change the `test/index.js`.
