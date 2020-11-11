const path = require('path')
const fs = require('fs')
const extractZip = require('extract-zip')

/**
 * 判断输入路径是否存在
 *
 * @param {string} dest
 * @returns {false | 'dir' | 'file' | 'other'}
 */
const exists = async (dest) => {
  try {
    const stats = await fs.promises.stat(dest)

    if (stats.isDirectory()) return 'dir'

    if (stats.isFile()) return 'file'

    return 'other'
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }

    return false
  }
}

/**
 * 判断输入路径是否为文件
 *
 * @param {string} dest
 * @returns {boolean}
 */
const isFile = async (dest) => {
  const result = await exists(dest)

  return result === 'file'
}

/**
 * 判断输入路径是否为文件夹
 *
 * @param {string} dest
 * @returns {boolean}
 */
const isDirectory = async (dest) => {
  const result = await exists(dest)

  return result === 'dir'
}

/**
 * 判断文件夹是否为空
 *
 * @param {string} dest
 * @returns {boolean}
 */
const isEmpty = async (dest) => {
  const files = await fs.promises.readdir(dest)

  return !files.length
}

/**
 * 创建文件夹
 *
 * @param {string} dest
 * @param {*} options
 */
const mkdir = async (dest, options) => {
  await fs.promises.mkdir(dest, { recursive: true, ...options })
}

/**
 * 删除文件夹以及内容
 *
 * @param {string} dest
 * @param {*} options
 * @returns
 */
const remove = async (dest, options) => {
  const result = await exists(dest)

  if (result === false) return

  if (result !== 'dir') {
    return await fs.promises.unlink(dest)
  }

  const files = await fs.promises.readdir(dest)

  await Promise.all(
    files.map(async (item) => await remove(path.join(dest, item), options))
  )

  await fs.promises.rmdir(dest, options)
}

/**
 * 解压 zip 文件
 *
 * @param {string} src
 * @param {string} dest
 * @param {number} strip
 */
const extract = async (src, dest, strip) => {
  await extractZip(src, {
    dir: dest,
    onEntry: (entry) => {
      if (strip === 0) return

      // strip 不为 0 时，去掉对应到路径
      const items = entry.fileName.split(/\//)
      const start = Math.min(strip, items.length - 1)

      entry.fileName = items.slice(start).join('/')
    },
  })
}

/**
 * 读取文件内容
 *
 * @param {string} src
 * @returns
 */
const read = async (src) => {
  return await fs.promises.readFile(src)
}

/**
 * 写入文件内容
 *
 * @param {string} dest
 * @param {*} data
 * @returns
 */
const write = async (dest, data) => {
  await mkdir(path.dirname(dest))
  await fs.promises.writeFile(dest, data)
}

module.exports = {
  exists,
  isFile,
  isDirectory,
  isEmpty,
  mkdir,
  remove,
  extract,
  read,
  write,
}
