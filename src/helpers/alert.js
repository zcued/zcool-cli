const chalk = require('chalk')

exports.log = (str) => {
  console.log(str)
}

exports.info = (str) => {
  console.log(chalk.cyan(str))
}

exports.success = (str) => {
  console.log(chalk.green(str))
}

exports.warning = (str) => {
  console.log(`${chalk.bgYellowBright('[WARNING]')} ${chalk.yellow(str)}`)
}

exports.error = (str) => {
  console.log(`${chalk.bgRedBright('[ERROR]')} ${chalk.red(str)}`)
}
