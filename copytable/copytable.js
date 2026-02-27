// Javascript module voor gebruik in Cognos
// Versie 1: 27-2-2026 Martin Suyl

define(function () {
	"use strict";

	class copyTable 
	{	constructor() 							// *** aan in Cognos
		{	// oControlHost.loadingText = "Loading...";
		}
		
	// -- insertStyle  --------------------------------------------------

	insertStyle(oControlHost)
	{	const cont = oControlHost.container; 


		if (cont)
		{	cont.innerHTML += 
		`<style> 

		
		* {
			user-select: auto !important;
			-moz-user-select: auto !important;
			-webkit-user-select: auto !important;
			-ms-user-select: auto !important;
		}


		.tableIndicator {
				width: 20px; 
				height: 20px; 
				background-color: steelblue;
				color: white;
				font-weight: 700; 
				position: relative; 
				border-radius: 50%;
				border: 2px solid white;
				text-align: center;
				cursor: pointer;
				
				&.indicatorHidden {
					visibility: hidden;
				}
			}

			.divMatrix {
				border: 1px solid steelblue;
				box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.3);
				position: relative;
				background-color: white;
				z-index: 10;
				display: flex;

				&.matrixHidden {
					visibility: hidden;
					width: 10px;
					height: 10px;
					overflow: hidden;				}

				table {
					margin: 10px;
					font-family: "Segoe UI", Arial, sans-serif;

					td {
						padding: 1px 4px;
						border-bottom: 1px solid #EFEFEF;
					}

					tr:first-of-type {
						td {
							background-color: steelblue;
							color: white;
							border-left: 1px solid white;
						}
					}
				}
			}

		</style>`;
		}
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
		return matrix;
	}

	// -- getTableFromElement ------------------------------------------

	getTableFromElement(obj)
	{	let parent = obj;
		while (parent.nodeName !== 'TABLE' && parent.nodename !== 'body')
		{	parent = parent.parentElement;
		}
		return parent;
	}

	// -- createTableIndicator ------------------------------------------

	createTableIndicator(tbl)
	{	const tblRect 		= tbl.getBoundingClientRect();
		const div 			= document.createElement('div');
		tbl.appendChild(div)
		div.classList.add('tableIndicator');
		div.classList.add('indicatorHidden');
		div.style.left 		= `${tblRect.right - tblRect.x - 10}px`;
		div.style.bottom 	= `${tblRect.height}px`;
		div.innerHTML		= '&#9016;';
		return div;
	}

	// -- createBlockForTableMatrix ------------------------------------------

	createBlockForTableMatrix(parent, tbl)
	{	let div = tbl.parentElement?.querySelector('.divMatrix');

		if (!div)
		{	const tblRect 		= tbl.getBoundingClientRect();
			div 				= document.createElement('DIV');
			//div.style.left 		= `${tblRect.right - tblRect.x + 20}px`;
			div.style.left 		= `10px`;
			div.style.bottom 	= `${tblRect.height - 10}px`;
			div.style.width 	= `${tblRect.width}px`;
			//tbl.parentElement.appendChild(div);
			parent.parentElement.appendChild(div);
			div.classList.add('divMatrix');
			div.classList.add('matrixHidden');
		}

		return div;
	}

	// -- fillMatrix ------------------------------------------

	fillMatrix(matrixBlock, matrix)
	{	let str = '<table>';
		matrix.forEach(row => 
		{	str += `<tr>`;
			row.forEach(el => 
			{	str += `<td>${el}</td>`;
			})
			str += `</tr>`;
		})
		str += `</table>`;
		matrixBlock.innerHTML = str;
	}

	// -- draw --------------------------------------------------

	draw(oControlHost) 
	{	this.insertStyle(oControlHost);

		let pbs = document.querySelectorAll('.pb');
		if (pbs.length === 0)
		{	pbs = document.querySelectorAll('.pg');
		}

		console.log('*** pbs ***', pbs);
	 
	 	pbs.forEach(pb => 
		//{	const tbls = pb.querySelectorAll('TABLE');
		{	const tbls = pb.querySelectorAll('[specname="list"]');
			tbls.forEach(tbl => 
			{	let indicatorShow = false;
				const indicator = this.createTableIndicator(tbl);
				const matrixBlock = this.createBlockForTableMatrix(pb, tbl);
				const matrix = this.tableToMatrix(tbl);
				this.fillMatrix(matrixBlock, matrix);

			 	console.log('*** matrixBlock ***', matrixBlock);

				tbl.addEventListener('mouseover', (e) => 
				{	const parent = this.getTableFromElement(e.target);
					if (parent.nodeName === 'TABLE' && !indicatorShow)
					{	indicatorShow = true;
						indicator.classList.remove('indicatorHidden');
					}
				});

				tbl.addEventListener('mouseleave', (e) => 
				{	indicatorShow = false;
					indicator.classList.add('indicatorHidden');
				});

				indicator.addEventListener('click', (e) => 
				{	matrixBlock.classList.toggle('matrixHidden');
				});
			});

		});
	}
	// -- show --------------------------------------------------------

	show(oControlHost) 
	{	
	}

	// -- initialize --------------------------------------------------

	initialize(oControlHost, fnDoneInitializing) 
	{	fnDoneInitializing();									// *** aan in Cognos
	}

	// -- setData -----------------------------------------------------

	setData(oControlHost, oDataStore)
	{	//this.db = oDataStore;
	}
	};

	return copyTable;
}
);	
