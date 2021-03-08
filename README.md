# font-list

`font-list` is a Node.js package for listing the fonts available on your system.

Current version supports **MacOS**, **Windows**, and **Linux**.
### Powershell has been found to not return on all windows platforms
### Moved call to registry.  Leave powershell option as needed
```
//using registry
require('./index').getFonts({disableQuoting: true})
  .then(fonts => {
    console.log(fonts)
    console.log(fonts.join('\n'))
  })
  .catch(err => {
    console.log(err)
  })
```

```
console.log('*** using power shell...')
require('./index').getFonts({disableQuoting: true, usePowerShell: true})
    .then(fonts => {
        console.log(fonts)
        console.log(fonts.join('\n'))
    })
    .catch(err => {
        console.log(err)
    })
```

## Install

```bash
npm install font-list
```

## Usage

```js
const fontList = require('font-list')

fontList.getFonts()
  .then(fonts => {
    console.log(fonts)
  })
  .catch(err => {
    console.log(err)
  })
```

The return value `fonts` is an Array, looks like:

```
[ '"Adobe Arabic"',
  '"Adobe Caslon Pro"',
  '"Adobe Devanagari"',
  '"Adobe Fan Heiti Std"',
  '"Adobe Fangsong Std"',
  'Arial',
  ...
  ]
```

If the font name contains spaces, the name will be wrapped in double quotes, otherwise there will be no double quotes, for example: `'"Adobe Arabic"'`, `'Arial'`.

If you don't want font names that contains spaces to be wrapped in double quotes, pass the options object with `disableQuoting` set to true when calling the method `getFonts`:

```js
const fontList = require('font-list')

fontList.getFonts({ disableQuoting: true })
  .then(fonts => {
    console.log(fonts)
  })
  .catch(err => {
    console.log(err)
  })
```