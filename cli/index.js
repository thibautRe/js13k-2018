/* eslint-env node */
const build = require('./build')
const watch = require('./watch')
const prepareMessage = require('./prepare-message')
const { addStat } = require('./stats')

const dev = process.argv[2] === 'dev'

// Production mode
if (!dev) {
  const { bytes, prev } = build()

  // eslint-disable-next-line no-console
  console.log(prepareMessage(bytes, prev))

  // Save the stats
  addStat(bytes)
} else {
  watch()
}
