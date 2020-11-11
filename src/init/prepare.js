const path = require('path')
const fg = require('fast-glob')
const file = require('../helpers/file')

module.exports = async (ctx) => {
  // 获取模版所在路径
  const cwd = path.join(ctx.src, ctx.config.source || 'template')
  const filters = ctx.config.filters || {}
  const ignore = Object.keys(filters).filter((key) => !filters[key])

  const entries = await fg('**', { cwd, ignore, dot: true })

  const promises = entries.map(async (entry) => {
    const content = await file.read(path.join(cwd, entry))

    ctx.files.push({ path: entry, content })
  })

  await Promise.all(promises)

  return ctx
}
