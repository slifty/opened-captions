(function(exports) {
	// Payloads
	exports.COMMUNICATION_GENERAL_PAYLOAD_ERROR = "error";
	exports.COMMUNICATION_TRANSCRIPT_PAYLOAD_CONTENT = "content";
	exports.COMMUNICATION_TRANSCRIPT_PAYLOAD_LINE = "line";
	exports.COMMUNICATION_TRANSCRIPT_PAYLOAD_WORD = "word";
	
	// Targets
	exports.COMMUNICATION_TARGET_TRANSCRIPT = "transcript";
	
	// Socket Types
	exports.COMMUNICATION_SOCKET_BROADCAST = "broadcast";
	exports.COMMUNICATION_SOCKET_SERVER = "server";
	
	// Configuration options
	exports.STREAM_TYPE_PROXY = "proxy";
	exports.STREAM_TYPE_SERIAL = "serial";
	exports.STREAM_TYPE_SERVER = "server";
}) (typeof(window) === "undefined"?exports:window);