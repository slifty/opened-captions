var Communication = Class.extend({
	init: function() {
		this.socket = io.connect();
		this.socket.on('message', this.receiveMessage);
	},
	
	receiveMessage: function(message) {
		var communicationTarget = message.target;
		switch(message.target) {
			case COMMUNICATION_TARGET_TRANSCRIPT:
				window.TRANSCRIPT.receivePayload(message.payload);
				break;
		}
	},
});

$(function() {
	window.COMMUNICATION = new Communication();
});