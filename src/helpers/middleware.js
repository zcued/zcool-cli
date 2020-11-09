module.exports = class Middleware {
  middlewares = []

  use(middleware) {
    this.middlewares.push(middleware)

    return this
  }

  run(context) {
    return this.middlewares.reduce(
      (prev, curr) => prev.then((res) => curr(res)),
      Promise.resolve(context)
    )
  }
}
