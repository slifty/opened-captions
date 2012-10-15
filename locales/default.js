if(typeof(window) != "undefined") {
	var exports = window;
} else {
}

(function() {
	var locale = "default";
	exports.localization = {};
	exports.localization[locale] = {};
	
	exports.localization[locale]["errors"] = {
		transcript: {
			CONTENT_SYSTEM: "Content updates cannot come from clients."
		}
	};
	
	exports.localization[locale]["gui"] = {
		transcript: {
			CONTENT: "Live Transcript Stream"
		}
	};
		
	exports.localization[locale]["messages"] = {
	};
})();