if(typeof(window) != "undefined") {
	var exports = window;
} else {
}


// Custom Payloads
exports.COMMUNICATION_TRANSCRIPT_PAYLOAD_CONTENT = "content";
exports.COMMUNICATION_TRANSCRIPT_PAYLOAD_LINE = "line";
exports.COMMUNICATION_TRANSCRIPT_PAYLOAD_WORD = "word";


// General Payloads
exports.COMMUNICATION_GENERAL_PAYLOAD_ERROR = "error";


// General Constants
exports.COMMUNICATION_SOCKET_BROADCAST = "broadcast";
exports.COMMUNICATION_SOCKET_SERVER = "server";
exports.LOCALE_DEFAULT = "default";

exports.PROXY_MODE_DISABLED = "disabled";
exports.PROXY_MODE_ENABLED = "enabled";

exports.STREAM_TYPE_SERIAL = "serial";
exports.STREAM_TYPE_SOCKET = "socket";


// Targets
exports.COMMUNICATION_TARGET_TRANSCRIPT = "transcript";


// Viewports
exports.VIEWPORT_TRANSCRIPT_CONTENTLIST = "transcript-contentlist";
