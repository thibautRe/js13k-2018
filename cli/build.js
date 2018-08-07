/* eslint-env node */
const fs = require('fs')
const minify = require('babel-minify')
const babel = require('babel-core')
const { execSync } = require('child_process')

const prepareMessage = require('./prepare-message')

let previousSize = (() => {
  if (fs.existsSync('dist/build.zip')) {
    return parseInt(execSync(`wc -c < dist/build.zip`).toString())
  }
})()

let sessionStart = previousSize

const concatJs = dest => {
  execSync(
    `concat-cli -f node_modules/hyperapp/dist/hyperapp.js --f src/app/*.js -o ${dest} -f src/app/**/*.js`,
  )
}

// Build a zip from a source file, return the size in Bytes.
const buildZip = (source, dest) => {
  execSync(`advzip -4 -a ${dest} ${source}`)
  return parseInt(execSync(`wc -c < ${dest}`).toString())
}

const buildJs = jsSource => {
  const { code } = babel.transformFileSync(jsSource)
  return minify(code).code
}

const buildHtml = (js, dest) => {
  fs.writeFileSync(dest, `<!doctype html><div id="a"><script>${js}</script>`)
}

module.exports = () => {
  concatJs('dist/tmp-concat.js')
  const js = buildJs('dist/tmp-concat.js')
  buildHtml(js, 'dist/index.html')
  const bytes = buildZip('dist/index.html', 'dist/build.zip')

  const returnObject = { bytes, prev: previousSize, sess: sessionStart }

  // Keep the value for next iteration
  previousSize = bytes

  // If the previous session start didn't exist, save it now
  if (!sessionStart) {
    sessionStart = bytes
  }

  return returnObject
}
