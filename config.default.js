var constants = require('./constants'),
	config = {}


/* Proxy */
config.proxy = {};
config.proxy.targets = [];

//config.proxy.targets.push( {location: "", port: 0, secret: ""});


/* Streams */
config.streams = [];

// config.streams.push( { type: constants.STREAM_TYPE_SERIAL, location: "" } );
// config.streams.push( { type: constants.STREAM_TYPE_SERVER, location: "", port: 0 } );
// config.streams.push( { type: constants.STREAM_TYPE_PROXY, location: "", port: 0, secret: "" } );
config.streams.push( { type: constants.STREAM_TYPE_SERVER, location: "openedcaptions.com", port: 3000 } );


/* Web */
config.web = {};
config.web.port = 3000;

module.exports = config;