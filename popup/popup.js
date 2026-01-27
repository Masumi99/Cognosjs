// Javascript module voor gebruik in Cognos
// Versie 1: 16-1-2026 Martin Suyl

define(function () {
	"use strict";


	class popup 
	{	constructor() 							// *** aan in Cognos
		{	//oControlHost.loadingText = "Loading...";
			this.nrOfDraws = 0;
		}
		


	// -- insertStyle  --------------------------------------------------

	insertStyle(oControlHost)
	{	const cont = oControlHost.container; 

		if (cont)
		{	cont.innerHTML += 
		`<style> 
			.popupBlock_${this.uniqueId} {
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

	getColumnsFromRow(tbl, selectedRow, rowNr)
	{	//console.log(tbl, selectedRow, rowNr);
		const cols = [];
		if (selectedRow.querySelectorAll('TD').length < this.tableNrOfColumns)
		{	const tds = selectedRow.querySelectorAll('TD');
			tds.forEach(td => 
			{	cols.push(td);
			});

			const trs = tbl.querySelectorAll('TR');

			for(let i = rowNr; i > 0; i--)
			{	const tdsUp = trs[i].querySelectorAll('TD');
				const nrOfTds = tdsUp.length;
				if (nrOfTds > tds.length)
				{	for (let j = nrOfTds - cols.length; j > 0; j--)		// haal kolommen aan linkerkant er bij
					{	cols.unshift(tdsUp[j]);							// voeg toe aan begin van array;
					}
				}	
			}
		}
		else
		{	const tds = selectedRow.querySelectorAll('TD');
			tds.forEach(td => 
			{	cols.push(td);
			});			
		}


		//console.log('cols', cols);
		return cols;
	}

	getRowFromQuery(cols)
	{	let stopSearch = false;
		let rowNr = 0;

		while(!stopSearch && rowNr < this.db.rowCount)
		{	for (let i = 0; i < this.uniqueColumnNumbersQuery.length; i++)
			{	const columnValue = this.db.getFormattedCellValue(rowNr, this.uniqueColumnNumbersQuery[i]);
				const valTableCell = cols[this.uniqueColumnNumbersTable[i]].innerText;
				if (valTableCell === columnValue)
				{	//console.log('found', rowNr, valTableCell, columnValue);
					stopSearch = true;
					return rowNr;
				}
			}
			rowNr++;
		}
		return -1;
	}

	showRowContent(popupBlock, tbl, selectedRow, rowNr, colNr)
	{	const cols = this.getColumnsFromRow(tbl, selectedRow, rowNr);
		const queryRow = this.getRowFromQuery(cols);
		const popupContent = popupBlock.querySelector('.popupContent');

		if (queryRow > -1)
		{	if (colNr === 0) 
			{	console.log('row', rowNr, 'col', colNr, 'queryRow', queryRow, 'columns', cols);
			}
			let str = '<table>';

			this.showColumnNumbers.forEach((col, i) => 
			{	str += `	<tr>
							<td>${this.db.columnNames[col]}</td>
							<td>${this.db.getFormattedCellValue(queryRow, this.showColumnNumbers[i])}</td>
							</tr>
						`; 
			});
			str += '</table>'
			popupContent.innerHTML = str;
		}
	}

	getUniqueTableColumnNumbers(tbl)
	{	const trs = tbl.querySelectorAll('TR');
		const tds = trs[0].querySelectorAll('TD');
		tds.forEach(td => 
		{	this.uniqueColumnNamesTable.forEach((col, i) => 
			{	if (td.innerText === col)
				{	this.uniqueColumnNumbersTable.push(i);
				}		
			});	
		})
	}

	checkOrCreateContenBlock(popupBlock)
	{	const content = popupBlock.querySelector('.popupContent');
		if (!content)
		{	const div = document.createElement('DIV');
			div.classList.add('popupContent');
			popupBlock.appendChild(div);
		}
	}

	positionPopup(e, popupBlock, tblRect)
	{	if (e.clientX !== this.X || e.clientY !== this.Y)
		{	popupBlock.classList.remove('hidden');
			popupBlock.style.top = this.popupTop ? this.popupTop : e.clientY - tblRect.top + 20 + 'px';
			popupBlock.style.left = this.popupLeft ? this.popupLeft : e.clientX - tblRect.left + 20 + 'px';
			this.X = e.clientX;
			this.Y = e.clientY;
		}
	}
	 
		// -- draw --------------------------------------------------
	
	draw(oControlHost) 
	{	this.insertStyle(oControlHost);

		const pbs = document.querySelectorAll('.pb');
		pbs.forEach(pb => 
		{	const tbl = pb.querySelector(`[${this.tableAttributeName}^="${this.tableName}"]`);		
			const tblRect = tbl.getBoundingClientRect();
			const popupBlock = pb.querySelector(`[${this.tableAttributeName}^="${this.popupBlockName}"]`);
			popupBlock?.classList.add(`popupBlock_${this.uniqueId}`);
			popupBlock?.classList.add('hidden');
			this.checkOrCreateContenBlock(popupBlock);

			this.getUniqueTableColumnNumbers(tbl);

			pb.addEventListener('mouseover', (e) => 
			{	if (e.target.nodeName === 'TD')
				{	const row = e.target.parentElement;
					console.log('row', row.rowIndex, 'column', e.target.cellIndex);
					this.showRowContent(popupBlock, tbl, row, row.rowIndex, e.target.cellIndex)
					popupBlock.classList.remove('hidden');

					this.positionPopup(e, popupBlock, tblRect);
				}
			});

			tbl.addEventListener('mouseleave', (e) => 
			{	popupBlock.classList.add('hidden');
			});
		});
	}


		// -- initialize --------------------------------------------------

		show(oControlHost) 
		{
				// const win = window;
				// console.log('Window', win);
				console.log('*** oControlHost', oControlHost);
			

		}
	 
	 	// -- initialize --------------------------------------------------

		initialize(oControlHost, fnDoneInitializing) 
		{	const o 						= oControlHost.configuration; 					// argumenten die worden meegegeven aan de custom control
			if (o != null)																	// voorkomen dat er een foutmelding optreedt
			{	this.tableAttributeName		= o["table attribute name"]			|| '';		// naam van attribute om naar tabel te zoeken
				this.tableName				= o["table name"]					|| '';		// naam van de tabel
				this.tableAttributeName		= o["popup block attribute name"]	|| '';		// naam van attribute om naar blok te zoeken
				this.popupBlockName			= o["popup block name"]				|| '';		// naam van het blok dat getoond moet worden bij popup
				this.showColumns			= o["show query column names"]		|| [];		// namen van kolommen die getoond moeten worden bij popup
				this.uniqueColumnNamesTable = o["unique column names table"] 	|| [];
				this.uniqueColumnNamesQuery = o["unique column names query"] 	|| [];
				this.popupLeft 				= o["popup left"];
				this.popupTop 				= o["popup top"];

				this.tableNrOfColumns = 0;
				this.db = null;
				this.table = null;
				this.showColumnNumbers 	= [];
				this.uniqueColumnNumbersQuery = [];
				this.uniqueColumnNumbersTable = [];


				//console.log('oControlHost', o, this.showColumns);
			}

			this.uniqueId = oControlHost.container.getAttribute('id'); 
			// this.popupBlock = document.querySelector(`[${this.tableAttributeName}^="${this.popupBlockName}"]`);
			// this.popupBlock?.classList.add('popupBlock');
			this.X = 0;
			this.Y = 0;

			// An optional promise that will be waited on instead of calling fnDoneInitializing. Since Version 6
			fnDoneInitializing();									// *** aan in Cognos
		}

		setData(oControlHost, oDataStore)
		{	this.db = oDataStore;

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
		}
	};

	return popup;
}
);	

