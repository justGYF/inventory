const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  MOCK_URL:'"http://10.8.0.24:8083/mockjsdata/1"'
})
