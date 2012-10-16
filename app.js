
/**
 * Module dependencies.
 */

var express = require('express')
  , http = require('http')
  , path = require('path');

var config = require('./config'),
	constants = require('./constants'),
	payloads = require('./payloads');

var communication = require('./server/communication');

var app = express(),
	fs = require('fs'),
	io = require('socket.io'),
	ioClient = require('socket.io-client')

app.configure(function(){
  app.set('port', config.web.port);
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var server = http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});

io = io.listen(server);

// Shared Content
app.get("/constants.js", function(req, res) { res.sendfile('./constants.js'); });
app.get("/payloads.js", function(req, res) { res.sendfile('./payloads.js'); });
app.get("/locales.js", function(req, res) { res.sendfile('./locales.js'); });
app.get("/locales/:language", function(req, res) {
	var language = req.param('language').replace(/[^a-zA-Z\-]/g, '');
	fs.stat('./locales/' + language + '.js', function(err, stats) {
		if(err == null) {
			res.sendfile('./locales/' + req.param('language') + '.js');
		} else {
			res.sendfile('./locales/default.js');
		}
	});
});

// Proxy 
exports.verifiedProxyIds = [];

// Socket.IO Server
io.set('log level', 1);
io.sockets.on('connection', function (socket) {
	socket.locale = constants.LOCALE_DEFAULT;

	socket.on('locale', function (locale) {
		socket.locale = locale;
	});
	
	socket.on('message', function (payload) {
		communication.receiveMessage(payload, socket);
	});
	
	socket.on('proxy', function (secret) {
		if(config.stream.secret != secret) {
			console.log("Failed proxy attempt.");
			return;
		}
		
		console.log("New proxy connected");
		exports.verifiedProxyIds.push(socket.id);
	});
});


// Transcript Stream
if(config.stream.type == constants.STREAM_TYPE_SERIAL) {
	// Serial Port
	var SerialPort = require("serialport").SerialPort
	var textGrabber = new SerialPort(config.stream.location, {
		baudrate: 9600,
		databits: 8,
		stopbits: 1
	});
	
	textGrabber.on("data", function (data) {
		data = data.toString();
		var contentIn = new payloads.TranscriptContentInPayload(data);
		communication.routeMessage(
			constants.COMMUNICATION_TARGET_TRANSCRIPT,
			contentIn.getPayload(),
			constants.COMMUNICATION_SOCKET_SERVER);
	});
} else if(config.stream.type == constants.STREAM_TYPE_SERVER) {
	ioClient = ioClient.connect(config.stream.location, {
		port: config.stream.port
	});
	ioClient.on('connect', function() {
		console.log("Connected to stream");
	});
	ioClient.on('message', function(message) {
		if(message.payload.type == constants.COMMUNICATION_TRANSCRIPT_PAYLOAD_CONTENT) {
			var contentIn = new payloads.TranscriptContentInPayload(message.payload.data.body);
			communication.routeMessage(
				constants.COMMUNICATION_TARGET_TRANSCRIPT,
				contentIn.getPayload(),
				constants.COMMUNICATION_SOCKET_SERVER);
		}
	});
}

// Proxy Mode
if(config.proxy.mode == constants.PROXY_MODE_ENABLED) {
	ioProxy = ioClient.connect(config.proxy.location, {
		port: config.proxy.port
	});
	ioProxy.on('connect', function() {
		console.log("Connected to proxy");
		ioProxy.emit('proxy', config.proxy.secret); // Let the server know you are legitimate
	})
	exports.ioProxy = ioProxy;
}


// Exports
exports.io = io;