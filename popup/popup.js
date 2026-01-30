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
	{	const tdsSelected = selectedRow.querySelectorAll('TD');
		const nrOfColumnsSelectedRow = tdsSelected.length;
		const rows = tbl.querySelectorAll('TR');
		const cols = [];
		const colContents = [];
		let i = rowNr > 0 ? rowNr - 1 : rowNr;
		//console.log('selected row, columns', nrOfColumnsSelectedRow);

		tdsSelected.forEach(td => 
		{	cols.push(td);
		});

		let nrOfColumns = nrOfColumnsSelectedRow;

		while (nrOfColumns < this.tableNrOfColumns && i > 0)
		{	const tds = rows[i].querySelectorAll('TD');
			const startTd = this.tableNrOfColumns - nrOfColumns;
			const lastTd = this.tableNrOfColumns - tds.length; 
			//console.log('loop', i, 'startTd', startTd, 'lastTd', lastTd);

			for (let j = startTd; j > lastTd; j--)
			{	cols.unshift(tds[j-1]);
				//console.log('unshift', tds[j]);

				cols.forEach(col => {colContents.push(col.innerText);});
				//console.log('colContents', colContents);
			}

			


			nrOfColumns = tds.length;
			i--;
		}

		//console.log('getColumnsFromRow cols', cols, 'nrOfColumns', nrOfColumns, 'this.tableNrOfColumns', this.tableNrOfColumns);
		return cols;
	}

	getRowFromQuery(cols)
	{	let stopSearch = false;
		let rowNr = 0;
		let nrOfcolumnsToCheck = this.uniqueColumnNumbersQuery.length;
		let nrOfColumnsOk = 0;

		// /([^a-zA-Z0-9:\.\/\(\)\-\s])/g;

		while(!stopSearch && rowNr < this.db.rowCount)
		{	nrOfColumnsOk = 0;
			for (let i = 0; i < nrOfcolumnsToCheck; i++)
			{	const columnValue = this.db.getFormattedCellValue(rowNr, this.uniqueColumnNumbersQuery[i]).replace(/\//g,'');
				const valTableCell = cols[this.uniqueColumnNumbersTable[i]].replace(/\//g,'');
				//console.log('rowNr', rowNr, 'this.db.rowCount', this.db.rowCount, 'columnValue', columnValue, 'valTableCell', valTableCell);
				//console.log('valTableCell', valTableCell, valTableCell.replace(/([^a-zA-Z0-9:\.\/\(\)\-\s])/g, ''));
				if (valTableCell === columnValue)
				{	nrOfColumnsOk++;
				}
				
				if (nrOfColumnsOk === nrOfcolumnsToCheck)
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
		const contents = [];
		cols.forEach(col => {contents.push(col?.innerText)});
		const queryRow = this.getRowFromQuery(contents);
		const popupContent = popupBlock.querySelector('.popupContent');


		//if (colNr === 0) 
		{	//console.log('row', rowNr, 'col', colNr, 'queryRow', queryRow, 'columns', cols, 'contents', contents);		// vindt niet
		}
	
		if (queryRow > -1)
		{	let str = '<table>';

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



	// Eindelijk! Dit was het: de i werd gebruikt bij col ipv bij td
	getUniqueTableColumnNumbers(tbl)
	{	if (this.uniqueColumnNumbersTable.length === 0)
		{	const trs = tbl.querySelectorAll('TR');
			const tds = trs[0].querySelectorAll('TD');
			tds.forEach((td, i) => 
			{	this.uniqueColumnNamesTable.forEach(col => 
				{	//console.log('x', i, td.innerText);
					if (td.innerText === col)
					{	this.uniqueColumnNumbersTable.push(i);
						// console.log('getUniqueTableColumnNumbers', td.innerText, col, i);
					}		
				});	
			});
		}
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

	getCurrentRowNr(e)
	{	let parent = e.target;
		while(parent.nodeName !== 'TR')
		{	parent = parent.parentElement;
		}
		return parent;
	}	 
		// -- draw --------------------------------------------------
	
	draw(oControlHost) 
	{	this.insertStyle(oControlHost);

		const pbs = document.querySelectorAll('.pb');
		pbs.forEach(pb => 
		{	const tbl = pb.querySelector(`[${this.tableAttributeName}^="${this.tableName}"]`);		
			const tblRect = tbl.getBoundingClientRect();
			this.tableNrOfColumns = tbl.querySelectorAll('TR')[0].querySelectorAll('TD').length;

			console.log('this.tableNrOfColumns', this.tableNrOfColumns);

			const popupBlock = pb.querySelector(`[${this.tableAttributeName}^="${this.popupBlockName}"]`);
			popupBlock?.classList.add(`popupBlock_${this.uniqueId}`);
			popupBlock?.classList.add('hidden');

			this.checkOrCreateContenBlock(popupBlock);
			this.getUniqueTableColumnNumbers(tbl);

			let lastRowNr = -1;

			tbl.addEventListener('mouseover', (e) => 
			//pb.addEventListener('mouseover', (e) => 	// aangepast omdat er te veel events afvuren
			{	//if (e.target.nodeName === 'TD')
				{	const row = this.getCurrentRowNr(e);		//= e.target.parentElement;
					const rowNr = row.rowIndex;
					if (lastRowNr !== rowNr)
					{	
						console.log('mouseover', e.target.nodeName, 'row', rowNr, 'column', e.target.cellIndex, 'new', e.target.rowIndex);							// *** vindt wel
						this.showRowContent(popupBlock, tbl, row, rowNr, e.target.cellIndex)
						popupBlock.classList.remove('hidden');

						this.positionPopup(e, popupBlock, tblRect);
						lastRowNr = rowNr;
					}
				}
				//else {console.log('Not TD');}
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
				this.uniqueColumnNumbersTable = [];	// table is fout


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
					console.log(nr, col);
				}
			});
			//console.log(this.uniqueColumnNamesQuery);
		}
	};

	return popup;
}
);	

