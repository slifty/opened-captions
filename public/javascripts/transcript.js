// Object
var Transcript = function() {
	
	// Module console
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
	
	this.receivePayload = function(payload) {
		switch(payload.type) {
			// Module Payloads
			case COMMUNICATION_TRANSCRIPT_PAYLOAD_CONTENT:
				contentOut(payload.data);
				break;
			case COMMUNICATION_TRANSCRIPT_PAYLOAD_LINE:
				lineOut(payload.data);
				break;
			case COMMUNICATION_TRANSCRIPT_PAYLOAD_WORD:
				wordOut(payload.data);
				break;
		}
	},
	
	contentOut = function(data) {
		var output = $('<span />')
			.text(data.body)
			.appendTo(contents);
		contents.scrollTop(contents.prop("scrollHeight"));
	}
	lineOut = function(data) {
		var output = $('<span />')
			.text(data.body + " ")
			.appendTo(lines);
		lines.scrollTop(lines.prop("scrollHeight"));
	}
	wordOut = function(data) {
		var output = $('<span />')
			.text(data.body + " ")
			.appendTo(words);
		words.scrollTop(words.prop("scrollHeight"));
	}
	
};

$(function() {
	window.TRANSCRIPT = new Transcript();
});