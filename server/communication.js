var app = require('../app'),
	transcript = require('./transcript');

var config = require('../config'),
	constants = require('../constants'),
	payloads = require('../payloads');

// Exports
exports.receiveMessage = function(message, socket) {
	if(!message.payload || !message.payload.data)
		return;
	
	// Pass the message to reverse proxies
	for(var x in app.proxies) {
		proxy = app.proxies[x];
		exports.sendMessage(message.target, message.payload, proxy)
	}
	
	// Route the message
	switch(message.target) {
		case constants.COMMUNICATION_TARGET_TRANSCRIPT:
			transcript.receivePayload(message.payload, socket);
			break;
	}
}

exports.routeMessage = function(target, payload, socket) {
	var message = {
		target: target,
		payload: payload
	};
	
	exports.receiveMessage(message, socket);
}

exports.sendMessage = function(target, payload, sockets) {
	if(sockets == constants.COMMUNICATION_SOCKET_BROADCAST)
		return exports.broadcastMessage(target,payload);
	
	if(!(sockets instanceof Array)) sockets = [sockets];
	var message = {
		target: target,
		payload: payload
	};
	
	for(var x in sockets) {
		sockets[x].emit('message', message);
	}
}

exports.broadcastMessage = function(target, payload) {
	var message = {
		target: target,
		payload: payload
	};
	app.io.sockets.emit('message', message);
}