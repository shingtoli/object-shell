# EXPERIMENTAL JS Plain Object to Shell Command Library #

This library aims to provide an interface using Plain Objects to define Shell Commands. The motivation is to provide a sanitised way to call CLI programs that allows for parameterisation of the options of the CLI program as well as the ability to unit test Applications that require communication with these CLI programs.

Example scenario, when handling specialised CLI tools that take in parameters such as Input and Output paths. Such values might be part of a user facing application and using this CLI tool may be the only way to achieve a desired outcome.

Through the use of this Object-Shell interface, it is hoped that these CLI calls will become predictable and testable.

## Usage Instructions ##

Not ready for use, testing or production

```Shell
# Clone this repository
cd object-shell
yarn build
yarn link

cd <your project directory>
yarn link object-shell
```

### Syntax ###

```Javascript
import exec from 'child_process';
import { commandify } from 'object-shell'
const command = {
  echo: 'hello', // Keys of the object are commands and all string properties are quoted
  node: Param('--version'), // Param prevents quotation of values
  yarn: {
    add: {
      '-D': ['@babel/core', 'jest']
    },
  },
  npm: { config: Param('list') },
};

const rawScript = commandify(command);
console.log(rawScript);
// Output: echo 'hello' && node --version && yarn add '@babel/core' 'jest' && npm config list
exec(rawScript, { shell: 'bash' });
```

## Development Guide ##

### Run Unit Tests ###

```Shell
yarn test
```
