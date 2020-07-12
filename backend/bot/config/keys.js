if (process.env.ENV === 'production') {
  module.exports = require('./prod');
} else {
  module.exports = require('./dev');
}
