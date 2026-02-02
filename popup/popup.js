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
				/* background-color: white; */
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

	// -- getColumnsFromRow -------------------------------
	 
	getColumnsFromRow(tbl, selectedRow, rowNr, matrix)
	{	const cols = [];
		for (let i = 0; i < this.uniqueColumnNumbersTable.length; i++)
		{	cols.push(matrix[rowNr][this.uniqueColumnNumbersTable[i]]);
		}
		return cols;
	}

	// -- getRowFromQuery -------------------------------
	 
	getRowFromQuery(cols)
	{	let stopSearch = false;
		let rowNr = 0;
		let nrOfcolumnsToCheck = this.uniqueColumnNumbersQuery.length;
		let nrOfColumnsOk = 0;

		while(!stopSearch && rowNr < this.db.rowCount)
		{	nrOfColumnsOk = 0;
			for (let i = 0; i < nrOfcolumnsToCheck; i++)
			{	const columnValue = this.db.getFormattedCellValue(rowNr, this.uniqueColumnNumbersQuery[i]).replace(/([^a-zA-Z0-9:\.\/\(\)\-])/g, ' ');
				const valTableCell = cols[i].replace(/([^a-zA-Z0-9:\.\/\(\)\-])/g, ' ');
                    if (valTableCell === columnValue)
				{	nrOfColumnsOk++;
				}
				
				if (nrOfColumnsOk === nrOfcolumnsToCheck)
				{	stopSearch = true;
					return rowNr;
				}
			}
			rowNr++;
		}
		return -1;
	}

	// -- showRowContent --------------------------------

	showRowContent(popupBlock, tbl, selectedRow, rowNr, colNr, matrix)
	{	const contents = this.getColumnsFromRow(tbl, selectedRow, rowNr, matrix);
		const queryRow = this.getRowFromQuery(contents);
		const popupContent = popupBlock?.querySelector('.popupContent');
	
		if (popupContent && queryRow > -1)
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

	// -- getUniqueTableColumnNumbers ------------------------

	getUniqueTableColumnNumbers(tbl)
	{	if (this.uniqueColumnNumbersTable.length === 0)
		{	const trs = tbl.querySelectorAll('TR');
			const tds = trs[0].querySelectorAll('TD');
			tds.forEach((td, i) => 
			{	this.uniqueColumnNamesTable.forEach(col => 
				{	if (td.innerText === col)
					{	this.uniqueColumnNumbersTable.push(i);
					}		
				});	
			});
		}
	}

	// -- checkOrCreateContenBlock ----------------------------

	checkOrCreateContenBlock(popupBlock)
	{	const content = popupBlock?.querySelector('.popupContent');
		if (!content)
		{	const div = document.createElement('DIV');
			div.classList.add('popupContent');
			popupBlock?.appendChild(div);
		}
	}

	// -- positionPopup ---------------------------------------

	positionPopup(e, popupBlock, tblRect)
	{	if (e.clientX !== this.X || e.clientY !== this.Y)
		{	popupBlock.classList.remove('hidden');
			popupBlock.style.top = this.popupTop ? this.popupTop : e.clientY - tblRect.top + 20 + 'px';
			popupBlock.style.left = this.popupLeft ? this.popupLeft : e.clientX - tblRect.left + 20 + 'px';
			this.X = e.clientX;
			this.Y = e.clientY;
		}
	}

	// -- getCurrentRowNr ---------------------------------------

	getCurrentRowNr(e)
	{	let parent = e.target;
		while(parent.nodeName !== 'TR')
		{	parent = parent.parentElement;
		}
		return parent;
	}

	// -- tableToMatrix ------------------------------------------
 
	tableToMatrix(tbl)
	{	const matrix = [];

		for (let i = 0; i < tbl.rows.length; i++) 
		{	matrix.push([]);			
		}

		for (let rowNr = 0; rowNr < tbl.rows.length; rowNr++)
		{	for (let colNr = 0; colNr < tbl.rows[rowNr].cells.length; colNr++)
			{	const rowSpan = parseInt(tbl.rows[rowNr].cells[colNr]?.getAttribute('rowspan') || '1');
				for (let j = 0; j < rowSpan; j++)
				{	matrix[rowNr + j].push(tbl.rows[rowNr].cells[colNr]?.innerText);
				}
			}
		}
		//console.log('matrix', matrix);
		return matrix;
	}
	 
	// -- draw --------------------------------------------------
	
	draw(oControlHost) 
	{	this.insertStyle(oControlHost);

		const pbs = document.querySelectorAll('.pb');
		pbs.forEach(pb => 
		{	if (this.tableAttributeName && this.tableName && this.popupBlockName)
			{	const tbl 				= pb.querySelector(`[${this.tableAttributeName}^="${this.tableName}"]`);		
				const tblRect 			= tbl.getBoundingClientRect();
				this.tableNrOfColumns	= tbl.querySelectorAll('TR')[0].querySelectorAll('TD').length;
				const popupBlock 		= pb.querySelector(`[${this.tableAttributeName}^="${this.popupBlockName}"]`);

				const matrix 			= this.tableToMatrix(tbl);

				popupBlock?.classList.add(`popupBlock_${this.uniqueId}`);
				popupBlock?.classList.add('hidden');

				this.checkOrCreateContenBlock(popupBlock);
				this.getUniqueTableColumnNumbers(tbl);

				let lastRowNr = -1;

				tbl.addEventListener('mouseover', (e) => 
				{	{	const row = this.getCurrentRowNr(e);		//= e.target.parentElement;
						const rowNr = row.rowIndex;
						if (popupBlock && lastRowNr !== rowNr)
						{	this.showRowContent(popupBlock, tbl, row, rowNr, e.target.cellIndex, matrix)
							popupBlock.classList.remove('hidden');

							this.positionPopup(e, popupBlock, tblRect);
							lastRowNr = rowNr;
						}
					}
				});

				tbl.addEventListener('mouseleave', (e) => 
				{	popupBlock?.classList.add('hidden');
				});
			}

		});
	}


	// -- show --------------------------------------------------------

	show(oControlHost) 
	{
	}
	 
 	// -- initialize --------------------------------------------------

	initialize(oControlHost, fnDoneInitializing) 
	{	const o 							= oControlHost.configuration; 				// argumenten die worden meegegeven aan de custom control
		if (o != null)															// voorkomen dat er een foutmelding optreedt
		{	this.tableAttributeName		= o["table attribute name"]		|| '';		// naam van attribute om naar tabel te zoeken
			this.tableName				= o["table name"]				|| '';		// naam van de tabel
			this.tableAttributeName		= o["popup block attribute name"]	|| '';		// naam van attribute om naar blok te zoeken
			this.popupBlockName			= o["popup block name"]			|| '';		// naam van het blok dat getoond moet worden bij popup
			this.showColumns			= o["show query column names"]	|| [];		// namen van kolommen die getoond moeten worden bij popup
			this.uniqueColumnNamesTable = o["unique column names table"] 	|| [];
			this.uniqueColumnNamesQuery = o["unique column names query"] 	|| [];
			this.popupLeft 				= o["popup left"];
			this.popupTop 				= o["popup top"];

			this.tableNrOfColumns 		= 0;
			this.db 					= null;
			//this.table 				= null;
			this.showColumnNumbers 		= [];
			this.uniqueColumnNumbersQuery = [];
			this.uniqueColumnNumbersTable = [];
		}

		this.uniqueId 					= oControlHost.container.getAttribute('id'); 
		this.X 						= 0;
		this.Y 						= 0;

			// An optional promise that will be waited on instead of calling fnDoneInitializing. Since Version 6
			fnDoneInitializing();									// *** aan in Cognos
	}

	// -- setData -----------------------------------------------------
	 
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
		console.log('db', this.db);
	}
	};

	return popup;
}
);	

