/* eslint-env node */
const fs = require('fs-extra')
const path = require('path')
const chokidar = require('chokidar')
const babel = require('babel-core')
const logUpdate = require('log-update')
const chalk = require('chalk')

const build = require('./build')
const prepareMessage = require('./prepare-message')
const { addErrorStat, addZipStat } = require('./stats')

// Keep track of if the initial scan has been performed already
let isReady = false
let hasInitErrored = false

const devZipBuild = () => {
  logUpdate(chalk.gray('Rebuilding zip file...'))
  // Rebuild the zip file
  const { bytes, prev, sess } = build()
  logUpdate(prepareMessage(bytes, prev, sess))
  addZipStat(bytes)
  logUpdate.done()
}

// Compiles files in src/app to src/app-build/
const devRebuild = file => {
  logUpdate(chalk.gray('Compiling files for DEV...'))
  try {
    const { code } = babel.transformFileSync(file, { ast: false })

    // Create dirs recursively
    const buildFile = file.replace('src/app', 'src/app-build')
    fs.ensureDirSync(path.dirname(buildFile))
    fs.writeFileSync(buildFile, code)

    // Do not perform full rebuild on the initial scan
    if (!isReady) return
    devZipBuild()
  } catch (e) {
    // Babel compilation error
    if (e._babel) {
      hasInitErrored = true

      // Show Babel frame error
      /* eslint-disable no-console */
      console.error(e.message)
      console.error(e.codeFrame)
      /* eslint-enable no-console */

      addErrorStat()
      return
    }

    throw e
  }
}

module.exports = () => {
  const devWatcher = chokidar.watch('src/app/', {})
  devWatcher.on('add', devRebuild)
  devWatcher.on('change', devRebuild)
  devWatcher.on('unlink', devZipBuild)
  devWatcher.on('ready', () => {
    if (!hasInitErrored) devZipBuild()
    isReady = true
  })
}
