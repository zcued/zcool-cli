const envPaths = require('env-paths')
const { name } = require('../../package.json')

module.exports = {
  registry: 'https://github.com/{owner}/{name}/archive/{branch}.zip',
  owner: 'zcued',
  branch: 'main',
  commitMessage: 'feat: initial commit',
  get paths() {
    return envPaths(name, { suffix: undefined })
  },
}
