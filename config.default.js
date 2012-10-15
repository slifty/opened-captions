var constants = require('./constants'),
var config = {}

config.stream = {}
config.web = {};

config.stream.type = constants.STREAM_TYPE_SERIAL; // Can also be STREAM_TYPE_SOCKET
config.stream.location = "";
config.web.port = process.env.WEB_PORT || 3000;

module.exports = config;