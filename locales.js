if(typeof(window) != "undefined") {
	window.LOCALE = (navigator.language)?navigator.language:navigator.userLanguage;
	var script = document.createElement( 'script' );
	script.type = 'text/javascript';
	script.src = '/locales/' + window.LOCALE + '.js';
	$("head").append(script);
	
	if(!(LOCALE in localization))
		localization[LOCALE] = localization[window.LOCALE_DEFAULT];
} else {
	// Todo: include every file in locales/ dynamically
	exports.localization = {};
	exports["default"] = require("./locales/default.js").localization["default"];
}