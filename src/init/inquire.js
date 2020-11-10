const path = require('path')
const prompts = require('prompts')

const processor = (ctx) => (prompt) => {
  switch (prompt.name) {
    case 'name':
      prompt.initial = prompt.initial || path.basename(ctx.dest)
      break

    default:
      break
  }
}

module.exports = async (ctx) => {
  // 空值时初始化 prompts
  if (!ctx.config.prompts) {
    ctx.config.prompts = [
      {
        name: 'name',
        type: 'text',
        message: 'project name',
      },
    ]
  }

  // 转换为数组
  if (!Array.isArray(ctx.config.prompts)) {
    ctx.config.prompts = [ctx.config.prompts]
  }

  // 处理 prompt 默认值
  ctx.config.prompts.forEach(processor(ctx))

  const onCancel = () => {
    throw new Error('You have cancelled this task.')
  }

  const answers = await prompts(ctx.config.prompts, { onCancel })

  Object.assign(ctx.answers, answers)

  return ctx
}
