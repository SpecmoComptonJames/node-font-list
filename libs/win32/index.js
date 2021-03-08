/**
 * index
 * @author oldj
 * @blog https://oldj.net
 */

'use strict'
module.exports = async (options) => {
  let methods = [];
  let fonts = [];
  if (!options) { options = {}; }
  if (options.usePowerShell) {
    methods.push(require('./getByPowerShell'));
  } else {
    methods.push(require('./getByRegistry'));
  }
  methods.push(require('./getByVBS'))

  for (let method of methods) {
    try {
      fonts = await method()
      break
    } catch (e) {
      console.log(e)
    }
  }

  return fonts
}
