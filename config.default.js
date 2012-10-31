var constants = require('./constants'),
	config = {}

config.proxy = {};
config.stream = {};
config.web = {};

config.stream.type = constants.STREAM_TYPE_SERVER; // enum(STREAM_TYPE_SERIAL, STREAM_TYPE_SERVER, STREAM_TYPE_CLIENT)
config.stream.location = "http://openedcaptions.com";
config.stream.port = 3000; // Used for STREAM_TYPE_SERVER
config.stream.secret = ""; // Used for STREAM_TYPE_CLIENT (a client is pushing the transcript to the server)

config.proxy.mode = constants.PROXY_MODE_DISABLED; // enum(PROXY_MODE_ENABLED, PROXY_MODE_DISABLED);
config.proxy.location = "localhost";
config.proxy.port = 0;
config.proxy.secret = ""; // This should be kept private

config.web.logger = "dev"; // Leave empty for production logging
config.web.port = 3000;

module.exports = config;