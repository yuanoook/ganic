if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/[name].production.min.js');
} else {
  module.exports = require('./cjs/[name].development.js');
}
