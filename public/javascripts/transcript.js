// Object
var Transcript = Class.extend({
	
	init: function() {
		this.contents = [];
		
		
		// Module console
		var controlPane = $('<div />')
			.attr('id','transcript-control-pane')
			.addClass('control-pane')
			.appendTo($("body"));
		this.controlPane = controlPane;
		
		var header = $('<div />')
			.addClass('header')
			.appendTo(controlPane);
		var logo = $('<div />')
			.addClass("logo")
			.appendTo(header);
		var title = $('<h1 />')
			.text(localization[LOCALE].gui.transcript.CONTENT)
			.appendTo(header)
		
		// Outputs
		var contentPane = $('<div />')
			.attr('id','transcript-content-pane')
			.addClass('content-pane')
			.appendTo(controlPane);
		this.contentPane = contentPane;
		
		var contentList = $('<ul />')
			.attr('id','transcript-content-list')
			.addClass('content-list')
			.appendTo(contentPane);
		this.contentList = contentList;
	},
	
	receivePayload: function(payload) {
		switch(payload.type) {
			// General Payloads
			case COMMUNICATION_GENERAL_PAYLOAD_ACTIVATE:
				this.activateOut(payload.data);
				break;
			case COMMUNICATION_GENERAL_PAYLOAD_DEACTIVATE:
				this.deactivateOut(payload.data);
				break;
			case COMMUNICATION_GENERAL_PAYLOAD_ERROR:
				this.errorOut(payload.data);
				break;
			
			// Module Payloads
			case COMMUNICATION_TRANSCRIPT_PAYLOAD_CONTENT:
				this.contentOut(payload.data);
				break;
		}
	},
	
	sendPayload: function(payload) {
		COMMUNICATION.sendMessage(COMMUNICATION_TARGET_NEWSPAPER, payload);
	},
		
	activateOut: function(data) {
		this.controlPane.show();
	},
	
	deactivateOut: function(data) {
		this.controlPane.hide();
	},
	
	errorOut: function(data) {
	},
	
	
	contentOut: function(data) {
		var content = new TranscriptContent();
		content.body = data.body;
		this.contents.push(content);
		
		var output = $('<li />')
			.appendTo(this.contentList)
			.text(content.body);
	}
	
});

$(function() {
	window.TRANSCRIPT = new Transcript();
});