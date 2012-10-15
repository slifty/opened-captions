var util = require('util');

var communication = require('./communication');

var classes = require('./classes'),
	constants = require('../constants'),
	locales = require('../locales'),
	payloads = require('../payloads');

var contentBuffer = "";

// Functions
function error(message, socket) {
	var error = new payloads.ErrorPayload(message);
	return exports.sendPayload(
		error.getPayload(),
		socket);
}


// General Handlers
function handleActivate(data, interaction) {
}

function handleDeactivate(data, interaction) {
}


// Handlers
function handleContent(data, socket) {
	if(socket != constants.COMMUNICATION_SOCKET_SERVER)
		return error(locales[socket.locale].errors.transcript.CONTENT_SYSTEM, socket);
	
	// Append the content to the buffer
	contentBuffer = contentBuffer + data.body; // inefficient -- I don't care right now.
	var breakpoint = contentBuffer.indexOf("\n");
	if(breakpoint != -1) {
		var content = contentBuffer.slice(0, breakpoint);
		contentBuffer = contentBuffer.slice(breakpoint + 1);
	
		var contentOut = new payloads.TranscriptContentOutPayload(content);
		exports.sendPayload(
			contentOut.getPayload(),
			constants.COMMUNICATION_SOCKET_BROADCAST);
	}
}


// Exports
exports.receivePayload = function(payload, socket) {
	switch(payload.type) {
		// General Payloads
		case constants.COMMUNICATION_GENERAL_PAYLOAD_ACTIVATE:
			handleActivate(payload.data, socket);
			break;
		case constants.COMMUNICATION_GENERAL_PAYLOAD_DEACTIVATE:
			handleDectivate(payload.data, socket);
			break;
		
		// Module Payloads
		case constants.COMMUNICATION_TRANSCRIPT_PAYLOAD_CONTENT:
			handleContent(payload.data, socket);
			break;
	}
};

exports.sendPayload = function(payload, sockets) {
	communication.sendMessage(
		constants.COMMUNICATION_TARGET_TRANSCRIPT,
		payload,
		sockets)
};

