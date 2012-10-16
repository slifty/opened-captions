// Object
var Transcript = Class.extend({
	
	init: function() {
		// Module console
		var title = $('<h1 />')
			.text(localization[LOCALE].gui.transcript.CONTENT)
			.appendTo($('#demo'))
			
		var contents = $('<div />')
			.attr('id','contents')
			.addClass('stream')
			.appendTo($('#demo'));
		this.contents = contents;
		
		var words = $('<div />')
			.attr('id','words')
			.addClass('stream')
			.appendTo($('#demo'))
		this.words = words;
		
		var lines = $('<div />')
			.attr('id','lines')
			.addClass('stream')
			.appendTo($('#demo'))
		this.lines = lines;
	},
	
	receivePayload: function(payload) {
		switch(payload.type) {
			// Module Payloads
			case COMMUNICATION_TRANSCRIPT_PAYLOAD_CONTENT:
				this.contentOut(payload.data);
				break;
			case COMMUNICATION_TRANSCRIPT_PAYLOAD_LINE:
				this.lineOut(payload.data);
				break;
			case COMMUNICATION_TRANSCRIPT_PAYLOAD_WORD:
				this.wordOut(payload.data);
				break;
		}
	},
	
	contentOut: function(data) {
		var output = $('<span />')
			.text(data.body)
			.appendTo(this.contents);
		this.contents.scrollTop(this.contents.prop("scrollHeight"));
	},
	lineOut: function(data) {
		var output = $('<span />')
			.text(data.body + " ")
			.appendTo(this.lines);
		this.lines.scrollTop(this.lines.prop("scrollHeight"));
	},
	wordOut: function(data) {
		var output = $('<span />')
			.text(data.body + " ")
			.appendTo(this.words);
		this.words.scrollTop(this.words.prop("scrollHeight"));
	},
	
});

$(function() {
	window.TRANSCRIPT = new Transcript();
});