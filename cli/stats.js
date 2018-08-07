/* eslint-env node */
const fs = require('fs-extra')
const chalk = require('chalk')

const fileName = 'stats.log'
const fileNameBak = 'stats.bak.log'

let backupCounter = 0

const getStats = () => {
  try {
    const content = fs.readFileSync(fileName)
    // If the file is empty, return empty array
    if (content.toString() === '') {
      return []
    }
    return JSON.parse(content)
  } catch (e) {
    // File doesnt exist is gracefully handled
    if (e.code === 'ENOENT') {
      return []
    }
    // eslint-disable-next-line no-console
    console.error(e.type)
    // eslint-disable-next-line no-console
    console.error(chalk.red('stats log file badly formed'))
    return null
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

  // Do not overwrite the stats file
  if (stats === null) return

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
