// Javascript module voor gebruik in Cognos
// Versie 1: 16-1-2026 Martin Suyl

define(function () {
	"use strict";

	function popup() {
	};
	

	// -- draw --------------------------------------------------

	popup.prototype.draw = function(oControlHost)
	{	console.log('***** Popup module draw.');
	}

	// -- initialize --------------------------------------------------

	popup.prototype.initialize = function( oControlHost, fnDoneInitializing )
	{	console.log('***** Popup module initialized.');
		alert('Popup module initialized.');
		fnDoneInitializing();
	}

	return popup;
}
);	
