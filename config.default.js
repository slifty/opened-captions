var constants = require('./constants'),
	config = {}

config.proxy = {};
config.stream = {};
config.web = {};

config.stream.type = constants.STREAM_TYPE_SERVER; // enum(STREAM_TYPE_SERIAL, STREAM_TYPE_SERVER, STREAM_TYPE_CLIENT)
config.stream.location = "http://openedcaptions.com";
config.stream.port = 3000; // Used for STREAM_TYPE_SERVER
config.stream.secret = ""; // Used for STREAM_TYPE_CLIENT (a client is pushing the transcript to the server)

config.proxy.targets = [];
//config.proxy.targets.push( {location: "", port: 0, secret: ""});

config.web.logger = "dev"; // Leave empty for production logging
config.web.port = 3000;

module.exports = config;