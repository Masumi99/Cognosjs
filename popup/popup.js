// Javascript module voor gebruik in Cognos
// Versie 1: 16-1-2026 Martin Suyl

define(function () {
	"use strict";


	class popup 
	{	constructor() 							// *** aan in Cognos
		{	//oControlHost.loadingText = "Loading...";
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
				font-family: "Segoe UI", Arial, sans-serif;
				border: 2px solid purple;
				border-radius: 5px;
				z-index: 100;
				box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);

				table {
					margin: 4px;
					td {
						padding: 1px 4px;
						border-bottom: 1px solid #EFEFEF;
					}
				}
			}

			.hidden
			{	display: none !important;
			}

		</style>`;
		}
	}

	showRowContent(selectedRow, rowNr)		// in selectedRow moet nog de id of het nummer worden opgehaald
	{	let str = '<table>';

		// *** in de tr moet het regelnummer worden opgenomen en worden opgezocht, cellvalue i wordt dan die waarde
		//for(let i = 0; i < this.showColumnNumbers.length; i++)
		this.showColumnNumbers.forEach((col, i) => 
		{	//const col = this.showColumnNumbers[i];
			str += `	<tr>
						<td>${this.db.columnNames[col]}</td>
						<td>${this.db.getCellValue(rowNr - 1, this.showColumnNumbers[i])}</td>
					</tr>`; 										// 0 wijzigen in rownumber 
		});
		str += '</table>'
		this.popupBlock.innerHTML = str;
	}

		// -- draw --------------------------------------------------
	
		// alleen nodig als de control een UI heeft

		draw(oControlHost) 
		{	this.insertStyle(oControlHost);

			if (this.popupBlock)
			{	this.popupBlock.classList.add('hidden');
				this.popupBlock.classList.add('popupBlock');
			}

			const tbl = this.table = document.querySelector(`[${this.tableAttributeName}^="${this.tableName}"]`);			
			const tblRect = tbl.getBoundingClientRect();

			if (tbl)
			{	const trs = tbl.querySelectorAll('TR');
				trs.forEach((tr, i) => 
				{	if (i > 0)
					{	tr.addEventListener('mouseenter', (e) => 
						{	if (e.clientX !== this.X || e.clientY !== this.Y)
							{	this.popupBlock.classList.remove('hidden');
								this.popupBlock.style.top = e.clientY - tblRect.top + 20 + 'px';
								this.popupBlock.style.left = e.clientX - tblRect.left + 20 + 'px';

								this.showRowContent(tr, i);

								this.X = e.clientX;
								this.Y = e.clientY;
							}
						});
					}
				});

				tbl.addEventListener('mouseleave', (e) => 
				{	this.popupBlock.classList.add('hidden');
				});

			}

		}

		// -- initialize --------------------------------------------------

		initialize(oControlHost, fnDoneInitializing) 
		{	const o 					= oControlHost.configuration; 				// argumenten die worden meegegeven aan de custom control
			if (o != null)														// voorkomen dat er een foutmelding optreedt
			{	this.tableAttributeName	= o["table attribute name"]		|| '';		// naam van attribute om naar tabel te zoeken
				this.tableName			= o["table name"]				|| '';		// naam van de tabel
				this.tableAttributeName	= o["popup block attribute name"]	|| '';		// naam van attribute om naar blok te zoeken
				this.popupBlockName		= o["popup block name"]			|| '';		// naam van het blok dat getoond moet worden bij popup
				this.showColumns		= o["show query column names"]	|| [];		// namen van kolommen die getoond moeten worden bij popup
				
				this.uniqueColumnNamesTable = o["unique column names table"] || [];
				this.uniqueColumnNamesQuery = o["unique column names query"] || [];
				
				console.log('oControlHost', o, this.showColumns);
			}

			this.containerId = oControlHost.container.getAttribute('id'); 
			console.log('*** container id', this.containerId);

			this.popupBlock = document.querySelector(`[${this.tableAttributeName}^="${this.popupBlockName}"]`);
			this.popupBlock?.classList.add('popupBlock');
			this.X = 0;
			this.Y = 0;

			// An optional promise that will be waited on instead of calling fnDoneInitializing. Since Version 6
			fnDoneInitializing();									// *** aan in Cognos
		}

		setData(oControlHost, oDataStore)
		{   this.db = oDataStore;
			this.showColumnNumbers 	= [];
			this.uniqueColumnNumbersQuery = [];

			this.showColumns.forEach(col => 
			{	const nr = this.db.getColumnIndex(col);
				if(nr !== NaN)
				{	this.showColumnNumbers.push(nr);
				}
			});

			this.uniqueColumnNamesQuery.forEach(col => 
			{	const nr = this.db.getColumnIndex(col);
				if(nr !== NaN)
				{	this.uniqueColumnNumbersQuery.push(nr);
				}
			});



			console.log('uniqueColumnNumbersQuery', this.uniqueColumnNumbersQuery);

		}
	};

	return popup;
}
);	






// *********  1e werkende versie  *********************

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
				border: 2px solid purple;
				padding: 14px;
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
							this.popupBlock.style.top = e.clientY - tblRect.top + 20 + 'px';
							this.popupBlock.style.left = e.clientX - tblRect.left + 20 + 'px';

							this.showRowContent(tr);

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
				{	this.popupBlock.classList.add('hidden');
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
