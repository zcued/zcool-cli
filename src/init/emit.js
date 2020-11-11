const path = require('path')
const file = require('../helpers/file')

module.exports = async (ctx) => {
  const promises = ctx.files.map(async (item) => {
    const target = path.join(ctx.dest, item.path)

    await file.write(target, item.content)
  })

  await Promise.all(promises)

  return ctx
}
