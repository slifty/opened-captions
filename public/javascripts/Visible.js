var Visible = Class.extend({
	init: function() {
		this.viewports = [];
	},
	
	render: function(viewport) {
		this.viewports.push(viewport);
		this.redraw();
	},
	
	redraw: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.empty();
		}
	},
	
	remove: function() {
		for(var x in this.viewports) {
			var viewport = this.viewports[x];
			var output = viewport.output;
			
			output.remove();
		}
		this.viewports = [];
	}
	
});