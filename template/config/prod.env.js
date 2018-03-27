'use strict'
module.exports = {
  NODE_ENV: '"production"',
  API_HOST: '""',
  SYSTEM_NAME: '"{{name}}"',
  VERSION_TAG: '"' + process.env.npm_package_version + '"'
}
