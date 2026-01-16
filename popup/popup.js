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

		if (cont)
		{	cont.innerHTML += 
		`<style> 
			.popupBlock {
				position: absolute;
				background-color: white;
				border: 1px solid purple;
				padding: 4px;
			}

			.hidden
			{	display: none !important;
			}
		</style>`;
		}
	}

	showRowContent(selectedRow)
	{	const firstRow = this.table.querySelector('TR');
		const tdTitles = firstRow.querySelectorAll('TD');
		const tdValues = selectedRow.querySelectorAll('TD');
		let str = '';

		tdTitles.forEach((tr, i) => 
		{	str += tdTitles[i].innerText + ': ' + tdValues[i].innerText + '</br>'; 
		});
		this.popupBlock.innerHTML = str;
	}

		// -- draw --------------------------------------------------
		draw(oControlHost) {
			console.log('***** Popup module draw.', `[${this.tableAttributeName}^="${this.popupBlockName}"]`);
			this.insertStyle(oControlHost);
			// this.popupBlock = document.querySelector(`[${this.tableAttributeName}^="${this.popupBlockName}"]`);
			// if (this.popupBlock)
			// {	this.popupBlock.classList.add('hidden');
			// 	this.popupBlock.classList.add('popupBlock');
			// }

			console.log('*** Tabel', `[${this.tableAttributeName}^="${this.tableName}"]`);
			this.table = document.querySelector(`[${this.tableAttributeName}^="${this.tableName}"]`);
			const tbl = document.querySelector(`[${this.tableAttributeName}^="${this.tableName}"]`);
			
			//const panel = document.querySelector(`[hal_paneid="PinnedOnDemandToolbarPane"]`);
			// if (panel)
			// {	console.log('*** panel', panel, panel.style.top, panel.style.height);
			// }

			const tblRect = tbl.getBoundingClientRect();
			if (tbl)
			{	//console.log('**** gevonden: ', tbl);
				const trs = tbl.querySelectorAll('TR');
				trs.forEach(tr => 
				{	tr.addEventListener('mouseenter', (e) => 
					{	if (e.clientX !== this.X || e.clientY !== this.Y)
						{	this.popupBlock.classList.remove('hidden');
							//this.popupBlock.style.top = e.clientY - tblRect.top + 'px';
							//this.popupBlock.style.left = e.clientX - tblRect.left + 'px';

							//this.showRowContent(tr);

							this.X = e.clientX;
							this.Y = e.clientY;
							console.log('*** mouse enter', e);
						}
					});
					// tr.addEventListener('mouseleave', (e) => 
					// {	this.popupBlock.classList.add('hidden');
					// 		console.log('*** mouse leave', e);
					// });
				});
				// tbl.addEventListener('mouseover', (e) => 
				// {	if (e.target.nodeName === 'TD')
				// 	{	console.log('mouse over', e.target);
				// 	}
				// });
				tbl.addEventListener('mouseleave', (e) => 
				{	//this.popupBlock.classList.add('hidden');
					console.log('*** mouse leave', e);
				});

			}

		}
		// -- initialize --------------------------------------------------
		initialize(oControlHost, fnDoneInitializing) {
		const o 					= oControlHost.configuration; 							// argumenten die worden meegegeven aan de custom control
		if (o != null)																		// voorkomen dat er een foutmelding optreedt
		{	this.tableAttributeName	= o["table attribute name"]		|| '';					// naam van attribute om naar tabel te zoeken
			this.tableName			= o["table name"]				|| '';					// naam van de tabel
			this.popupBlockName		= o["popup block name"]			|| '';					// naam van het blok dat getoond moet worden bij popup
		}

		this.popupBlock = document.querySelector(`[${this.tableAttributeName}^="${this.popupBlockName}"]`);
		this.popupBlock.classList.add('popupBlock');
		this.X = 0;
		this.Y = 0;

		console.log('***** Popup module initialized.');
		fnDoneInitializing();
		}
	};

	return popup;
}
);	
