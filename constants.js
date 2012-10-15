if(typeof(window) != "undefined") {
	var exports = window;
} else {
}


// Custom Payloads
exports.COMMUNICATION_TRANSCRIPT_PAYLOAD_CONTENT = "content";


// General Payloads
exports.COMMUNICATION_GENERAL_PAYLOAD_ACTIVATE = "activate";
exports.COMMUNICATION_GENERAL_PAYLOAD_DEACTIVATE = "deactivate";
exports.COMMUNICATION_GENERAL_PAYLOAD_ERROR = "error";


// General Constants
exports.COMMUNICATION_SOCKET_BROADCAST = "broadcast";
exports.COMMUNICATION_SOCKET_SERVER = "server";
exports.LOCALE_DEFAULT = "default";

exports.STREAM_TYPE_SERIAL = "serial";
exports.STREAM_TYPE_SOCKET = "socket";


// Targets
exports.COMMUNICATION_TARGET_TRANSCRIPT = "transcript";


// Viewports
exports.VIEWPORT_TRANSCRIPT_CONTENTLIST = "transcript-contentlist";
