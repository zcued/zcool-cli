const path = require('path')
const fs = require('fs')
const stream = require('stream')
const { promisify } = require('util')
const fetch = require('node-fetch')
const config = require('./config')

const pipeline = promisify(stream.pipeline)

/**
 * 请求模版地址
 *
 * @param {string} url
 * @param {*} init
 * @returns
 */
const request = async (url, init) => {
  const response = await fetch(url, init)

  if (response.ok) return response

  throw Error(`[ERROR] Unexpected response: ${response.statusText}`)
}

/**
 * 下载模版
 *
 * @param {string} url
 * @returns {string}
 */
const download = async (url) => {
  const response = await request(url)

  // 创建临时文件夹
  await fs.promises.mkdir(config.paths.temp, { recursive: true })

  const filename = path.join(config.paths.temp, `${Date.now().toString()}.tmp`)

  // 将请求内容写入到 filename
  await pipeline(response.body, fs.createWriteStream(filename))

  return filename
}

module.exports = {
  request,
  download,
}
