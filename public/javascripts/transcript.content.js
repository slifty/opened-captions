var TranscriptContent = Class.extend({
	init: function() {
		this.id = "";
		this.body = "";
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty()
				.removeClass()
				.addClass('content');
			
			var bodyOutput = $('<div />')
				.addClass('body')
				.appendTo(output)
				.text(this.body);
			
			switch(viewport.type) {
			}
		}
	}
});	