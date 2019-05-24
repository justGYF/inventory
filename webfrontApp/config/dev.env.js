const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // MOCK_URL:'"http://127.0.0.1:8083/mockjsdata/2/"',
  MOCK_URL:'"http://127.0.0.1:8000"',
})
