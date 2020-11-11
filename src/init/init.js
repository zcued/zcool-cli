const { spawn } = require('child_process')
const config = require('../helpers/config')

/**
 * 执行 git 命令
 *
 * @param {string[]} args
 * @param {string} cwd
 */
const git = (args, cwd) =>
  new Promise((resolve, reject) => {
    const child = spawn('git', args, { cwd, stdio: 'inherit' })

    child.on('error', reject).on('exit', (code) => {
      if (code === 0) return resolve()

      reject(new Error('Initial repository failed.'))
    })
  })

module.exports = async (ctx) => {
  if (ctx.files.find((item) => item.path === '.gitignore')) {
    await git(['init'], ctx.dest)
    await git(['add', '.'], ctx.dest)
    await git(['commit', '-m', config.commitMessage], ctx.dest)
  }

  return ctx
}
