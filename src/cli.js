const cac = require('cac')
const { name, version } = require('../package.json')
const { init } = require('.')
const alert = require('./helpers/alert')

const cli = cac(name)

cli
  .command('<template> [project]', 'Create new project from a template')
  .example('  # with an official template')
  .example(`  $ ${name} <template> [project]`)
  .example('  # with a custom github repo')
  .example(`  $ ${name} <owner>/<repo> [project]`)
  .action(init)

cli
  .command('list [owner]', 'Show all available templates')
  .alias('ls')
  .action(() => console.log('  - manager'))

cli.help().version(version).parse()

// https://github.com/cacjs/cac#error-handling
/* istanbul ignore next */
const onError = (err) => {
  alert.error(err.message)
  process.exit(1)
}

process.on('uncaughtException', onError)
process.on('unhandledRejection', onError)
