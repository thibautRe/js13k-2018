/* eslint-env node */
const fs = require('fs-extra')

const fileName = 'stats.log'
const fileNameBak = 'stats.bak.log'

let backupCounter = 0

const getStats = () => {
  try {
    return fs.readJsonSync(fileName)
  } catch (e) {
    // File doesnt exist is gracefully handled
    if (e.code === 'ENOENT') {
      return []
    }

    throw e
  }
}

const saveStats = stats => {
  fs.writeFileSync(fileName, JSON.stringify(stats))
  backupCounter++

  if (backupCounter >= 100) {
    backupCounter = 0
    fs.writeFileSync(fileNameBak, JSON.stringify(stats))
  }
}

const addStat = stat => {
  const stats = getStats()

  // Only save if the previous one is different
  if (!stats.length || stats[stats.length - 1] !== stat) {
    saveStats([...stats, stat])
  }
}

module.exports = {
  getStats,
  saveStats,
  addStat,
}
