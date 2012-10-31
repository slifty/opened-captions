
/**
 * Module dependencies.
 */
var config = require('./config'),
	constants = require('./constants'),
	payloads = require('./payloads');

var express = require('express'),
	http = require('http'),
	path = require('path');

var communication = require('./server/communication');

var app = express(),
	fs = require('fs'),
	io = require('socket.io'),
	ioClient = require('socket.io-client')

// Configure Express
app.configure(function(){
	app.set('port', config.web.port);
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.logger(config.web.logger));
	app.use(express.errorHandler());
});

app.configure('production', function(){
	app.use(express.compress());
});


// Start Express
var server = http.createServer(app).listen(app.get('port'), function() {
	console.log("Express server listening on port " + app.get('port'));
});


// Start Socket.IO
io = io.listen(server);
io.sockets.on('connection', function (socket) {
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


// Proxy
exports.verifiedProxyIds = [];


// Configure Socket.IO
io.configure(function() {
});

io.configure('development', function() {
	io.set('log level', 3);
});

io.configure('production', function() {
	io.enable('browser client etag');
	io.enable('browser client gzip');
	io.set('log level', 1);
	io.set('transports', [
		'websocket',
		'flashsocket',
		'htmlfile',
		'xhr-polling',
		'jsonp-polling'
	]);
});


// Set up the content stream
switch(config.stream.type) {
	case constants.STREAM_TYPE_SERIAL:
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
		break;
		
	case constants.STREAM_TYPE_SERVER:
		ioClient = ioClient.connect(config.stream.location, {
			port: config.stream.port,
			reconnect: true,
			'reconnection delay': 10000,
			'max reconnection attempts': Infinity
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
		break;
		
	case constants.STREAM_TYPE_PROXY:
		console.log("Waiting for a proxy");
		break;
		
	default:
		console.log("No stream type detected")
}


// Proxy Mode
exports.proxies = [];
for(x in config.proxy.targets) {
	var proxy = config.proxy.targets[x];
	ioProxy = ioClient.connect(config.proxy.location, {
		port: config.proxy.port,
		'reconnect': true,
		'reconnection delay': 5000,
		'max reconnection attempts': Infinity
	});
	
	ioProxy.on('connect', function() {
		console.log("Connected to proxy");
		ioProxy.emit('proxy', config.proxy.secret); // Let the server know you are a proxy
	})
	exports.proxies.push(ioProxy);
}


// Last resort error handler
process.on('uncaughtException', function (err) {
	console.error('An uncaught error occurred...');
	console.error(err.stack);
});


// Exports
exports.io = io;