// Javascript module voor gebruik in Cognos
// Versie 1: 16-1-2026 Martin Suyl

define(function () {
	"use strict";

	class popup {
		constructor() {
		}
		// -- draw --------------------------------------------------
		draw(oControlHost) {
			console.log('***** Popup module draw.', `[${this.tableAttributeName}^="${this.tableName}"]`);

			const tbl = document.querySelector(`[${this.tableAttributeName}^="${this.tableName}"]`);
			if (tbl)
			{	console.log('**** gevonden: ', tbl);
				tbl.addEventListener('mouseover', (e) => 
				{	if (e.target.nodeName === 'span')
					{	console.log('mouse over', e.target);
					}

				});

			}

		}
		// -- initialize --------------------------------------------------
		initialize(oControlHost, fnDoneInitializing) {
		const o 					= oControlHost.configuration; 							// argumenten die worden meegegeven aan de custom control
		if (o != null)																		// voorkomen dat er een foutmelding optreedt
		{	this.tableAttributeName	= o["table attribute name"]		|| '';					// naam van attribute om naar tabel te zoeken
			this.tableName			= o["table name"]				|| '';					// naam van de tabel
		}

		console.log('***** Popup module initialized.');
		fnDoneInitializing();
		}
	};

	return popup;
}
);	
