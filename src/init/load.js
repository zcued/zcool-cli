module.exports = (ctx) => {
  try {
    const config = require(ctx.src)

    if (Object.prototype.toString.call(config) !== '[object Object]') {
      throw new TypeError('Template needs to expose an object.')
    }

    ctx.config = config

    return ctx
  } catch (err) {
    err.message = `[ERROR] Invalid template: ${err.message}`

    throw err
  }
}
