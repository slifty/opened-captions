var app = require('../app');

var util = require('util');

var communication = require('./communication');

var classes = require('./classes'),
	config = require('../config'),
	constants = require('../constants'),
	locales = require('../locales'),
	payloads = require('../payloads');

var contentBuffer = "";
var lineBuffer = "";
var wordBuffer = "";

// Functions
function error(message, socket) {
	var error = new payloads.ErrorPayload(message);
	return exports.sendPayload(
		error.getPayload(),
		socket);
}


// Handlers
function handleContent(data, socket) {
	if(socket != constants.COMMUNICATION_SOCKET_SERVER && app.verifiedProxyIds.indexOf(socket.id) == -1)
		return error(locales[socket.locale].errors.transcript.CONTENT_SYSTEM, socket);
	
	data.body = String(data.body).replace(/\r/, '');
	
	if(data.body == "")
		return;
	
	// Append the content to the buffer
	lineBuffer = lineBuffer + data.body; // inefficient -- I don't care right now.
	wordBuffer = wordBuffer + data.body; // inefficient -- I don't care right now.
	var lineBreakpoint = lineBuffer.indexOf("\n");
	var wordBreakpoint = wordBuffer.search(/\s/);
	
	if(lineBreakpoint != -1) {
		var content = lineBuffer.slice(0, lineBreakpoint);
		lineBuffer = lineBuffer.slice(lineBreakpoint + 1);
		
		var contentOut = new payloads.TranscriptLineOutPayload(content);
		exports.sendPayload(
			contentOut.getPayload(),
			constants.COMMUNICATION_SOCKET_BROADCAST);
	}
	
	if(wordBreakpoint != -1) {
		var content = wordBuffer.slice(0, wordBreakpoint);
		wordBuffer = wordBuffer.slice(wordBreakpoint + 1);
		var contentOut = new payloads.TranscriptWordOutPayload(content);
		exports.sendPayload(
			contentOut.getPayload(),
			constants.COMMUNICATION_SOCKET_BROADCAST);
	}
	
	var contentOut = new payloads.TranscriptContentOutPayload(data.body);
	exports.sendPayload(
		contentOut.getPayload(),
		constants.COMMUNICATION_SOCKET_BROADCAST);
}


// Exports
exports.receivePayload = function(payload, socket) {
	switch(payload.type) {
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

