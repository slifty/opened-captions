var constants = require('./constants'),
var config = {}

config.stream = {}
config.web = {};

config.stream.type = constants.STREAM_TYPE_SERIAL; // STREAM_TYPE_SERIAL || STREAM_TYPE_SOCKET
config.stream.location = ""; // e.g. "/dev/tty.usbserial-FTBZ0DJP" or "http://localhost"
config.stream.port = 0;
config.web.port = process.env.WEB_PORT || 3000;

module.exports = config;