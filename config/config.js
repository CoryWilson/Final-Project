//File Name: ./config/config.js

module.exports = require('./env/' + process.env.NODE_ENV + '.js');
