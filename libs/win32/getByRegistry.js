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
module.exports = () => new Promise(async (resolve, reject) => {
  const exec = require('child_process').exec

  try {
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
    //replace with powershell with a registry call as on some systems power shell not returning.
    const getSystemFonts = function () {
      return new Promise(function (res, rej) {
        exec("reg query \"HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts\" /s", {maxBuffer: 1024 * 1024 * 10}, (err, stdout, stderr) => {
          if (err) {
            rej(err)
            return
          }
          res(stdout);
        })
      })
    }
    //get windows 10 user installed fonts.
    const getUserFonts = function () {
      return new Promise(function (res, rej) {
        exec("reg query \"HKCU\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts\" /s", {maxBuffer: 1024 * 1024 * 10}, (err, stdout, stderr) => {
          if (err) {
            if (err.message.includes('The system was unable to find the specified registry key or value.')) {
              //you must be windows 7 or earlier
              res("");
              return
            } else {
              //don't know what went wrong.
              rej(err)
              return;
            }
          }
          res(stdout)
        })
      })
    }

    //add check to combine system and user fonts (WIN10)
    var list1 = await getSystemFonts();
    var list2 = await getUserFonts();
    var list = list1 + list2;
    resolve(parse(list));
  } catch(ex) {
    reject(ex)
  }
})
