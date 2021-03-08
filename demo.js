/**
 * @author oldj
 * @blog http://oldj.net
 */

'use strict'
console.log('begin demo...')
console.log('using registry')
require('./index').getFonts({disableQuoting: true})
  .then(fonts => {
    console.log(fonts)
    console.log(fonts.join('\n'))
  })
  .catch(err => {
    console.log(err)
  })

/*
console.log('*** using power shell...')
require('./index').getFonts({disableQuoting: true, usePowerShell: true})
    .then(fonts => {
        console.log(fonts)
        console.log(fonts.join('\n'))
    })
    .catch(err => {
        console.log(err)
    })

*/