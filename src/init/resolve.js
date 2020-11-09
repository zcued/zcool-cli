const ora = require('ora')
const config = require('../helpers/config')
const http = require('../helpers/http')
const file = require('../helpers/file')

/**
 * 获取完整的 template 地址
 *
 * @param {string} template
 * @returns {string}
 */
const getTemplateUrl = (template) => {
  if (/^http/.test(template)) return template

  template = template.includes('/')
    ? template
    : `${config.owner}/template-${template}`
  template = template.includes('#') ? template : `${template}#${config.branch}`

  const [owner, name, branch] = template.split(/\/|#/)
  const record = { owner, name, branch }

  return config.registry.replace(/{(.*?)}/g, (_, key) => record[key])
}

module.exports = async (ctx) => {
  // 本地模版
  if (/^[./]/.test(ctx.template)) return (ctx.src = ctx.template)

  // 远程模版
  const url = getTemplateUrl(ctx.template)

  const spinner = ora('Downloading template...').start()

  try {
    // 下载远程模版 zip
    const zip = await http.download(url)
    console.log(zip)

    // 解压远程模版
    await file.extract(zip, ctx.dest, 1)
    // 删除临时文件
    await file.remove(zip)

    spinner.succeed('Download template complete.')
  } catch (err) {
    spinner.stop()

    throw new Error(
      `[ERROR] Failed to pull \`${ctx.template}\` template: ${err.message}.`
    )
  }

  return ctx
}
