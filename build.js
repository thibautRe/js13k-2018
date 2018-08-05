/* eslint-env node */
/* eslint-disable no-console */
const fs = require('fs')
const chalk = require('chalk')
const minify = require('babel-minify')
const babel = require('babel-core')
const { execSync } = require('child_process')

const MAX = 13 * 1024 // 13kb

const previousSize = () => {
  if (fs.existsSync('dist/build.zip')) {
    return parseInt(execSync(`wc -c < dist/build.zip`).toString())
  }
}

// Build a zip from a source file, return the size in Bytes.
const buildZip = (source, dest) => {
  console.log(chalk.gray('Building zip...'))
  execSync(`advzip -4 -a ${dest} ${source}`)
  return parseInt(execSync(`wc -c < ${dest}`).toString())
}

// Show user-friendly bytes count
const checkResult = (bytes, prev = 0) => {
  let color = 'green'

  if (bytes > MAX) {
    color = 'red'
    console.error(chalk.red('⛔  Size overflow ⛔'))
  } else if (bytes > MAX * 0.9) {
    color = 'yellow'
    console.warn(chalk.yellow('⚠️  Approaching maximum size'))
  }

  const percent = `${Math.round((bytes * 100) / MAX)}%`
  const allBytes = `${bytes.toString()}/${MAX}`
  console.log(chalk[color](`${allBytes} total bytes (${chalk.bold(percent)})`))

  if (prev) {
    const diff = Math.round(((bytes - prev) / prev) * 10000) / 100
    const signedDiff = (diff > 0 ? '+' : '') + diff
    if (prev === bytes) {
      console.log(chalk.gray('➡️  Same size as before'))
    } else if (bytes > prev) {
      console.log(
        chalk.gray(
          `↗️  Bundle bigger by ${bytes - prev} bytes (${signedDiff}%)`,
        ),
      )
    } else {
      console.log(
        chalk.gray(
          `↘️  Bundle smaller by ${prev - bytes} bytes (${signedDiff}%)`,
        ),
      )
    }
  }

  if (bytes > MAX) {
    process.exit(1)
  }
}

const buildJs = jsSource => {
  console.log(chalk.gray('Building JS...'))
  const { code } = babel.transformFileSync(jsSource)

  console.log(chalk.gray('Minify JS...'))
  return minify(code).code
}

const buildHtml = (js, dest) => {
  console.log(chalk.gray('Building HTML...'))
  fs.writeFileSync(
    dest,
    `<!doctype html><style id="s" /></style><div id="a"><script>${js}</script>`,
  )
}

const prev = previousSize()
const js = buildJs('dist/tmp-concat.js')
buildHtml(js, 'dist/index.html')
checkResult(buildZip('dist/index.html', 'dist/build.zip'), prev)
