// Javascript module voor gebruik in Cognos
// Versie 1: 16-1-2026 Martin Suyl

define(function () {
	"use strict";

	class popup {
		constructor() {
		}

	// -- insertStyle  --------------------------------------------------

	insertStyle(oControlHost)
	{	const cont = oControlHost.container; 

		cont.innerHTML += 
		`<style> 
			.hidden
			{	display: hidden;
			}
		</style>`;
	}


		// -- draw --------------------------------------------------
		draw(oControlHost) {
			//console.log('***** Popup module draw.', `[${this.tableAttributeName}^="${this.tableName}"]`);
			insertStyle(oControlHost);
			this.popupBlock = document.querySelector(`[${this.tableAttributeName}^="${this.popupBlockName}"]`);
			if (this.popupBlock)
			{	this.popupBlock.classList.add('hidden');
			}

			const tbl = document.querySelector(`[${this.tableAttributeName}^="${this.tableName}"]`);
			if (tbl)
			{	//console.log('**** gevonden: ', tbl);
				tbl.addEventListener('mouseover', (e) => 
				{	if (e.target.nodeName === 'TD')
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
			this.tableName			= o["tabletable name name"]		|| '';					// naam van de tabel
			this.popupBlockName		= o["popupBlok"]				|| '';					// naam van het blok dat getoond moet worden bij popup
		}

		console.log('***** Popup module initialized.');
		fnDoneInitializing();
		}
	};

	return popup;
}
);	
