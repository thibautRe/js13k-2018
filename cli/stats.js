/* eslint-env node */
const fs = require('fs-extra')

const fileName = 'stats.log'
const fileNameBak = 'stats.bak.log'

let backupCounter = 0
let previousBytes = -1

const addStat = stat => {
  fs.appendFileSync(fileName, JSON.stringify(stat) + '\n')

  backupCounter++

  if (backupCounter >= 100) {
    backupCounter = 0
    fs.createReadStream(fileName).pipe(fs.createWriteStream(fileNameBak))
  }
}

const addDevSize = (bytes, prev, sess) => {
  fs.writeFileSync(
    'src/stats.js',
    `
    window.ZIP_SIZE = ${bytes};
    window.PREV_SIZE = ${prev};
    window.SESS_SIZE = ${sess};
  `,
  )
}

const clearDevSize = () => {
  try {
    fs.unlinkSync('src/stats.js')
  } catch (e) {
    if (e.code === 'ENOENT') return
    throw e
  }
}

const addZipStat = bytes => {
  // No dupes
  if (bytes === previousBytes) return
  previousBytes = bytes
  addStat({ type: 'ZIP_SIZE', content: bytes, timestamp: +new Date() })
}

const addErrorStat = () => {
  addStat({ type: 'BUILD_ERROR', timestamp: +new Date() })
}

module.exports = {
  addStat,
  addZipStat,
  addDevSize,
  addErrorStat,
  clearDevSize,
}
