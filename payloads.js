(function(exports, constants) {
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
	exports.TranscriptContentPayload = function(body) {
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
	
	exports.TranscriptLinePayload = function(body) {
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
	
	exports.TranscriptWordPayload = function(body) {
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
})(
	typeof(window) === "undefined"?exports:window,
	typeof(window) === "undefined"?require('./constants'):window);