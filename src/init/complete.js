const alert = require('../helpers/alert')

const fallback = (ctx) => {
  alert.success(
    `Created a new project in \`${ctx.project}\` by the \`${ctx.template}\` template.\n`
  )

  ctx.files
    .map((item) => item.path)
    .sort((a, b) => (a > b ? +1 : -1))
    .forEach((item) => alert.log('  - ' + item))

  alert.log('\nHappy hacking :)')
}

module.exports = async (ctx) => {
  if (!ctx.config.complete) {
    // 使用默认方法
    await fallback(ctx)

    return ctx
  }

  if (typeof ctx.config.complete !== 'function') {
  } else {
    alert.log(ctx.config.complete)
  }

  const result = await ctx.config.complete(ctx)

  if (result) alert.log(result)

  return ctx
}
