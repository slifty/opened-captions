var Communication = function() {
	this.receiveMessage = function(message) {
		var communicationTarget = message.target;
		switch(message.target) {
			case COMMUNICATION_TARGET_TRANSCRIPT:
				window.TRANSCRIPT.receivePayload(message.payload);
				break;
		}
	}
	
	this.socket = io.connect();
	this.socket.on('message', this.receiveMessage );
};

$(function() {
	window.COMMUNICATION = new Communication();
});