module.exports = (ctx) => {
  try {
    // 获取 template 中 index.js 导出的对象
    const config = require(ctx.src)

    if (Object.prototype.toString.call(config) !== '[object Object]') {
      throw new TypeError('Template needs to expose an object.')
    }

    Object.assign(ctx.config, config)

    return ctx
  } catch (err) {
    err.message = `[ERROR] Invalid template: ${err.message}`

    throw err
  }
}
