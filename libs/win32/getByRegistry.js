/**
 * getByRegistry
 * @author: jc
 * @homepage: https://oldj.net
 */



/*
@see https://superuser.com/questions/760627/how-to-list-installed-font-families

  [System.Reflection.Assembly]::LoadWithPartialName("System.Drawing")
  (New-Object System.Drawing.Text.InstalledFontCollection).Families
*/
module.exports = () => new Promise((resolve, reject) => {
  const exec = require('child_process').exec

  const parse = (str) => {
    let fonts = []
    str.split('\n').map(ln => {
      ln = ln.trim()
      if (!ln || !ln.includes('(TrueType)')) return

      ln = ln.split('(TrueType')
      if (ln.length !== 2) return

      fonts.push(ln[0].trim())
    })

    return fonts
  }
  //let cmd = `powershell -command "chcp 65001;[System.Reflection.Assembly]::LoadWithPartialName('System.Drawing');(New-Object System.Drawing.Text.InstalledFontCollection).Families"`
  //replace with powershell with a registry call as on some systems power shell not returning.
  exec("reg query \"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts\" /s", { maxBuffer: 1024 * 1024 * 10 }, (err, stdout, stderr) => {
    if (err) {
      reject(err)
      return
    }

    resolve(parse(stdout))
  })
})
