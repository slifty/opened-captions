if(typeof(window) != "undefined") {
	var exports = window;
	var constants = window;
} else {
	constants = require('./constants');
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

exports.TranscriptLineInPayload = function(body) {
	this.body = body;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_TRANSCRIPT_PAYLOAD_LINE,
			data: {
				body: this.body
			}
		}
	};
};

exports.TranscriptLineOutPayload = function(body) {
	this.body = body;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_TRANSCRIPT_PAYLOAD_LINE,
			data: {
				body: this.body
			}
		}
	};
};

exports.TranscriptWordInPayload = function(body) {
	this.body = body;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_TRANSCRIPT_PAYLOAD_WORD,
			data: {
				body: this.body
			}
		}
	};
};

exports.TranscriptWordOutPayload = function(body) {
	this.body = body;
	this.getPayload = function() {
		return {
			type: constants.COMMUNICATION_TRANSCRIPT_PAYLOAD_WORD,
			data: {
				body: this.body
			}
		}
	};
};
