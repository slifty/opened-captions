var Communication = Class.extend({
	init: function() {
		this.socket = io.connect();
		this.socket.on('message', this.receiveMessage);
	},
	
	sendMessage: function(target, payload) {
		this.socket.emit('message', {
			target: target,
			payload: payload
		});
	},
	
	receiveMessage: function(message) {
		var communicationTarget = message.target;
		switch(message.target) {
			case COMMUNICATION_TARGET_TRANSCRIPT:
				window.TRANSCRIPT.receivePayload(message.payload);
				break;
		}
	},
	
	routeMessage: function(target, payload) {
		this.receiveMessage({
			target: target,
			payload: payload
		});
	}
});

$(function() {
	window.COMMUNICATION = new Communication();
});