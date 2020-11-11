module.exports = (ctx) => {
  const regexp = /{(.*?)}/g

  ctx.files.forEach((file) => {
    if (regexp.test(file.path)) {
      file.path = file.path.replace(regexp, (_, key) => ctx.answers[key])
    }
  })

  return ctx
}
