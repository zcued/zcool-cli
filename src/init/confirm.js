const path = require('path')
const prompts = require('prompts')
const file = require('../helpers/file')

module.exports = async (ctx) => {
  ctx.dest = path.resolve(ctx.project)

  const exists = await file.exists(ctx.dest)

  // dest 不存在
  if (exists === false) return ctx

  // dest 不是文件夹
  if (exists !== 'dir')
    throw new Error(`[ERROR] Cannot create ${ctx.project}: File exists.`)

  // dest 是空文件夹
  if (await file.isEmpty(ctx.dest)) return ctx

  // 判断是否为当前文件夹（project: '.'）
  const isCurrent = ctx.dest === process.cwd()

  // 用户选择后续操作
  const { choose } = await prompts([
    {
      name: 'sure',
      type: 'confirm',
      message: isCurrent
        ? 'Create in current directory?'
        : 'Target directory already exists. Continue?',
    },
    {
      name: 'choose',
      type: (prev) => (prev ? 'select' : null),
      message: `${
        isCurrent ? 'Current' : 'Target'
      } directory is not empty. How to continue?`,
      hint: ' ',
      choices: [
        { title: 'Merge', value: 'merge' },
        { title: 'Overwrite', value: 'overwrite' },
        { title: 'Cancel', value: 'cancel' },
      ],
    },
  ])

  // 取消操作
  if (choose == null || choose === 'cancel')
    throw new Error('[ERROR] You have cancelled this task.')

  // 覆盖操作
  if (choose === 'overwrite') await file.remove(ctx.dest)

  return ctx
}
