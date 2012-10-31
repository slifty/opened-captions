
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


// Prepare Proxy
exports.verifiedProxies = {};


// Start Socket.IO
io = io.listen(server);
io.sockets.on('connection', function (socket) {
	socket.on('message', function (payload) {
		communication.receiveMessage(payload, socket);
	});
	
	socket.on('proxy', function (secret) {
		// Check if this is an expected proxy
		for(var x in config.streams) {
			var stream = config.streams[x];
			if(stream.type == constants.STREAM_TYPE_PROXY) {
				if(stream.secret != secret) {
					console.log("Failed proxy attempt.");
				} else {
					console.log("New proxy connected");
					exports.verifiedProxies[socket.id] = socket;
				}
			}
		}
	});
});


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


// Set up the content streams
for(var x in config.streams) {
	var stream = config.streams[x];
	switch(stream.type) {
		case constants.STREAM_TYPE_SERIAL:
			// Serial Port
			var SerialPort = require("serialport").SerialPort
			var textGrabber = new SerialPort(stream.location, {
				baudrate: 9600,
				databits: 8,
				stopbits: 1
			});
			
			textGrabber.on("data", function (data) {
				data = data.toString();
				var contentIn = new payloads.TranscriptContentPayload(data);
				communication.routeMessage(
					constants.COMMUNICATION_TARGET_TRANSCRIPT,
					contentIn.getPayload(),
					constants.COMMUNICATION_SOCKET_SERVER);
			});
			break;
		
		case constants.STREAM_TYPE_SERVER:
			client = ioClient.connect(stream.location, {
				port: stream.port,
				reconnect: true,
				'reconnection delay': 500,
				'max reconnection attempts': Infinity
			});
			client.on('connect', function() {
				console.log("Connected to stream");
			});
			client.on('message', function(message) {
				if(message.payload.type == constants.COMMUNICATION_TRANSCRIPT_PAYLOAD_CONTENT) {
					var contentIn = new payloads.TranscriptContentPayload(message.payload.data.body);
					communication.routeMessage(
						constants.COMMUNICATION_TARGET_TRANSCRIPT,
						contentIn.getPayload(),
						constants.COMMUNICATION_SOCKET_SERVER);
				}
			});
			break;
		
		case constants.STREAM_TYPE_PROXY:
			console.log("Waiting for a proxy...");
			break;
		
		default:
			console.log("No stream type detected")
	}
}


// Proxy Mode
exports.proxies = {};
for(x in config.proxies) {
	var proxy = config.proxies[x];
	ioProxy = ioClient.connect(proxy.location, {
		port: proxy.port,
		'reconnect': true,
		'reconnection delay': 500,
		'max reconnection attempts': Infinity
	});
	
	ioProxy.on('connect', function() {
		console.log("Connected to proxy: " + proxy.location + ":" + proxy.port);
		ioProxy.emit('proxy', proxy.secret); // Let the server know you are a proxy
		exports.proxies[proxy.location + ":" + proxy.port] = ioProxy;
	})
	
	ioProxy.on('disconnect', function() {
		console.log("Disconnected from a proxy: " + proxy.location + ":" + proxy.port);
	})
}


// Last resort error handler
process.on('uncaughtException', function (err) {
	console.error('An uncaught error occurred...');
	console.error(err.stack);
});


// Exports
exports.io = io;