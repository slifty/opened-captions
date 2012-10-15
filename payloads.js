if(typeof(window) != "undefined") {
	var exports = window;
	var constants = window;
} else {
	constants = require('./constants');
	locales = require('./locales/default.js');
}

// Generic Payloads
exports.ErrorPayload = function(content) {
	this.content = content;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_GENERAL_PAYLOAD_ERROR,
			data: {
				content: this.content
			}
		}
	};
};

exports.ActivatePayload = function(content) {
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_GENERAL_PAYLOAD_ACTIVATE,
			data: {
			}
		}
	};
};

exports.DeactivatePayload = function(content) {
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_GENERAL_PAYLOAD_DEACTIVATE,
			data: {
			}
		}
	};
};


// Module Payloads
exports.TranscriptContentInPayload = function(body) {
	this.body = body;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_TRANSCRIPT_PAYLOAD_CONTENT,
			data: {
				body: this.body
			}
		}
	};
};

exports.TranscriptContentOutPayload = function(body) {
	this.body = body;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_TRANSCRIPT_PAYLOAD_CONTENT,
			data: {
				body: this.body
			}
		}
	};
};
