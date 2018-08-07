/* eslint-env node */
const chalk = require('chalk')

const MAX = 13 * 1024

const makeSignedDiff = (next, prev) => {
  const diff = Math.round(((next - prev) / prev) * 10000) / 100
  return (diff > 0 ? '+' : '') + diff + '%'
}

module.exports = (bytes, prev, sess) => {
  const { color, icon } = (() => {
    if (bytes > MAX) {
      return { color: 'red', icon: '⛔' }
    } else if (bytes > MAX * 0.9) {
      return { color: 'yellow', icon: '⚠️' }
    }

    return { color: 'gray', icon: '✔️' }
  })()

  const percent = `${Math.round((bytes * 1000) / MAX) / 10}%`
  const allBytes = `${bytes.toString()}/${MAX}`

  const message = chalk.gray(
    `${icon}  ${chalk[color].bold(allBytes)} (${percent})`,
  )

  const compareMessage = (() => {
    if (!prev) return ''

    const signedDiff = makeSignedDiff(bytes, prev)
    if (prev === bytes) {
      return chalk.gray(' ➡️  Same size')
    } else if (bytes > prev) {
      return chalk.gray(` ↗️  ${bytes - prev} bytes (${signedDiff})`)
    }

    return chalk.gray(` ↘️  ${prev - bytes} bytes (${signedDiff})`)
  })()

  const sessionMessage = (() => {
    if (!sess) return ''

    const signedDiff = makeSignedDiff(bytes, sess)

    if (sess === bytes) return ''
    return chalk.gray(
      ` (${chalk[sess > bytes ? 'green' : 'red'](signedDiff)} during session)`,
    )
  })()

  return `${message}${compareMessage}${sessionMessage}`
}
