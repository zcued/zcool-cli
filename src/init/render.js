module.exports = (ctx) => {
  const regexp = /<%\s*(.+?)\s*%>/g

  ctx.files.forEach((file) => {
    if (regexp.test(file.content)) {
      const content = file.content
        .toString()
        .replace(regexp, (_, key) => ctx.answers[key])

      file.content = Buffer.from(content)
    }
  })

  return ctx
}
