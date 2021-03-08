/**
 * getByPowerShell
 * @author: oldj
 * @homepage: https://oldj.net
 */



/*
@see https://superuser.com/questions/760627/how-to-list-installed-font-families

  [System.Reflection.Assembly]::LoadWithPartialName("System.Drawing")
  (New-Object System.Drawing.Text.InstalledFontCollection).Families
*/
module.exports = () => new Promise((resolve, reject) => {


  const parse = (str) => {
    let fonts = []
    str.split('\n').map(ln => {
      ln = ln.trim()
      if (!ln || !ln.includes(':')) return

      ln = ln.split(':')
      if (ln.length !== 2 || ln[0].trim() !== 'Name') return

      fonts.push(ln[1].trim())
    })

    return fonts
  }

  let cmd = `powershell -command "chcp 65001;[System.Reflection.Assembly]::LoadWithPartialName('System.Drawing');(New-Object System.Drawing.Text.InstalledFontCollection).Families"`
  const exec = require('child_process').exec
  exec(cmd, { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
    if (err) {
      reject(err)
      return
    }

    resolve(parse(stdout))
  })
})
