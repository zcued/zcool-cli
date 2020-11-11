const Middleware = require('../helpers/middleware')
const confirm = require('./confirm')
const resolve = require('./resolve')
const load = require('./load')
const inquire = require('./inquire')
const prepare = require('./prepare')
const rename = require('./rename')
const render = require('./render')
const emit = require('./emit')
const complete = require('./complete')

const middleware = new Middleware()

// 判断目标路径类型，执行对应操作
middleware.use(confirm)
// 处理模版文件
middleware.use(resolve)
// 加载模版中的配置
middleware.use(load)
// 执行模版中的命令行交互
middleware.use(inquire)
// 模版初始化配置
// middleware.use(setup)
// 准备需要处理的文件
middleware.use(prepare)
// 替换文件名中的模版字符串
middleware.use(rename)
// 替换文件中的模版字符串
middleware.use(render)
// 输出文件
middleware.use(emit)
// npm install
// creator.use(install)
// git init
// creator.use(init)
// 完成
middleware.use(complete)

module.exports = (template, project, options) => {
  const context = {
    template,
    project,
    options,
    src: '', // 模版地址
    dest: '', // 目标地址
    config: Object.create(null),
    answers: Object.create(null),
    files: [],
  }

  middleware.run(context)
}
