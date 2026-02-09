// Javascript module voor gebruik in Cognos
// Versie 1: 16-1-2026 Martin Suyl

define(function () {
	"use strict";


	class tree 
	{	constructor() 							// *** aan in Cognos
		{	//oControlHost.loadingText = "Loading...";
			//this.nrOfDraws = 0;
		}
		


	// -- insertStyle  --------------------------------------------------

	insertStyle(oControlHost)
	{	const cont = oControlHost.container; 

		if (cont)
		{	cont.innerHTML += 
		`<style> 

			.tree {
				font-family: "Segoe UI", Arial, sans-serif;

				li {
					display: block;
					border-left: 1px solid darkgrey;
					padding-left: 0.4rem;

					&:before {
						content: ' ';
						display: inline-block;
						width: 0.5rem;
						border: solid darkgrey;
						border-width: 0 0 1px 1px;
						position: relative;
						left: -0.4rem;
						top: -0.3rem;
					}
				
					&:last-of-type {
						border-width: 0 0 1px 0;
						border-color: red;

						&:before {
							content: ' ';
							width: 0.5rem;
							height: 0.6rem;
							left: -0.4rem;
						}
					}

					& .chk {
						width: 0.8rem;
						height: 0.8rem;
					}
					
				}

				ol {
					position: relative;

					span {
						display: inline-block;
						position: absolute;
						width: 0.8rem;
						height: 0.8rem;
						background: purple var(--plusmin) 0 0;
						background-position: -23.6px -3.6px; 
						fill: white;
						left: -0.15rem;
						top: -1rem;
						vertical-align: top;
						text-align: center;
						border-radius: 50%;

						&:hover {
							cursor: pointer;
						}
					}

					&.olHide {
					
						li {
							display: none;
						}
						
						span {
							background-position: -3.6px -3.6px; 
						}

					}

				}
			}
		</style>`;
		}
	}


	showBlock(str)
	{	const body = document.querySelector('pb') ? document.querySelector('pb') : document.querySelector('body');
		const div = document.createElement('DIV');
		body.appendChild(div);
		div.innerHTML = str;
	}

	arrayToTableStr(arr, ...colNrs)
	{	let str = '<table>';
		for (let i = 0; i < arr.length; i++)
		{	str += '<tr>';
			for (let j = 0; j < colNrs.length; j++)
			{	str += `<td>${arr[i][colNrs[j]]}</td>`;
			}
			str += '</tr>';
		}
		str += '</table><br>';
		return str;
	}

	dbToArray(db)
	{	const arr = [];
		for (let i = 0; i < db.rowCount; i ++)
		{	const row = [];
			for (let j = 0; j < db.columnCount; j ++)
			{	row.push(db.getFormattedCellValue(i, j));
			}
			arr.push(row);
		}
		return arr;
	}

	dbSort(arr)
	{	let newArr = Array.from(arr).sort((a, b) => 
		{	console.log(a[1] < b[1] && a[2] < b[2]);
			return a[1] > b[1] && a[2] < b[2];
		});
		console.log('newArr', newArr);
		return newArr;
	}

	arraySort(arr)
	{	let newArr = Array.from(arr);
		newArr.sort((a, b) => 
					a[1] === a[2] || 
					(	a[1] < b[1] && a[2] < b[2] || 
						a[1] === b[2] && b[1] < a[1]
					)
				); // werkt, maar volgorde niet ok
		newArr.sort((a, b) => a[1] === a[2] || (b[1] <= a[2] && b[2] <= a[2]))
		return newArr;
	}

	arrayToTree(arr)
	{	let str = '<ul><li>';
		arr.forEach((row, i) =>
		{	if (row[1] === row[2])
			{	str += `${row[1]}`;
			}
			else
			{	if(row[2] === arr[i - 1][1])
				{	str += `<ul><li>${row[1]}</li>`;
				}
			}
			str += '</ul>';
		});
		str += '</li></ul>';
		this.showBlock(str);
	}

	arrSearchParent(arr, key, colNr)
	{	arr.forEach((row, i) => 
		{	if (row[colNr] === key)
			{	return row;
			}
		});
		return [];
	}

	levelArray(arr)
	{	arr.forEach(row => 
		{	row.push(0);
		});
		
		arr.forEach((row, i) => 
		{	const parentRow = this.arrSearchParent(arr, row[2], 1);
			if (parentRow.length > 0)
			{	row[4] = parentRow[4] + 1;
			}
		});

		console.log(arr);
		return arr;
	}

	sortItem(el)
	{	const nodes = el.parentNode.childNodes;
		nodes.forEach(node => 
		{	if (el.getAttribute('value') < node.getAttribute('value'))
			{	el.parentNode.insertBefore(el, node);		
			}
		});
	}

	insertListItem(parent, type, key, text)
	{	const el = document.createElement(type);
		parent.appendChild(el)
		if (type === 'LI')
		{	el.setAttribute('key', key)
			el.setAttribute('value', text)
			el.innerText = text;
			this.sortItem(el);
			el.innerHTML = `<input type="checkbox" class="chk"></input>${el.innerHTML}`;
		}
		return el;
	}

	swapLiForUL(li)
	{	const ul = document.createElement('UL');
		ul.setAttribute('key', li.getAttribute('key'));
		ul.innerText = li.innerText;				
		li.replaceWith(ul);
		return ul;
	}

	insertSpan(parent)
	{	const span = document.createElement('SPAN');
		parent.appendChild(span);
		span.classList.add('olSpan');
		//span.innerText = '+';
		//console.log('span', span);
	}

	showTree(arr)
	{	const body = document.querySelector('body');						// haal de body van de pagina op
		const tree = document.createElement('DIV')						// voeg er een div aan toe voor de tree
		body.appendChild(tree);										// voeg tree toe aan pagina
		tree.classList.add('tree');									// geef hem de klasse tree

		arr.forEach((el, i) => 
		{	if (el[1] === el[2])									// eerste regel = root
			{	const ul = this.insertListItem(tree, 'UL');				// voeg ul toe, want bij ol verschijnt er een plusje
				this.insertSpan(ul);								// stop een span in de ul voor een klikbaar plusje
				const li = this.insertListItem(ul, 'LI', el[1], el[3]);	// maak van de regel een li
			}

			else													// niet eerste regel
			{	const lis = tree.querySelectorAll('LI');				// zoek alle li's in de boom
				lis.forEach(li =>									// loop de li's af
				{	if (li.getAttribute('key') === el[2])				// als key van li = parent van nieuwe element
					{	const children = li.childNodes;				// haal kindnodes van gevonden parent
						let olFound = false;						// op tijd stoppen met zoeken
						children.forEach(child => 					// loop alle kindnodes af
						{	if (child.nodeName === 'OL')						// als het een ol is
							{	this.insertListItem(child, 'LI', el[1], el[3]);	// voeg nieuwe li toe
								olFound = true;							// stop met zoeken
							}
						});
						if (!olFound)								// als niet gevonden
						{	const ol = this.insertListItem(li, 'OL');	// voeg nieuwe ol toe
							this.insertSpan(ol);					// stop er een span in voor klikbaar plusje
							this.insertListItem(ol, 'LI', el[1], el[3]);	// maak van nieuwe regel een li
						}
					}
				})
			}
		});
		return tree;
	}

	setTreeEvent(tree)
	{	tree.addEventListener('click', (e) => 
		// ** werkt goed

		// {	let check;
		// 	if (e.target.nodeName === 'LI')
		// 	{	check = e.target.querySelector('.chk');
		// 		check.checked = !check.checked;
		// 	}
		// 	if (e.target.classList.contains('chk'))
		// 	{	check = e.target; 
		// 	}
		// 	console.log('item', check.parentElement.getAttribute('key'), check.parentElement.getAttribute('value'));
		// });
		
		// test collaps
		{	
			// if (e.target.nodeName === 'LI')
			// {	console.log('click, OL found', e.target);
			// 	const ol = e.target.querySelector('OL');
			// 	if (ol)
			// 	{	ol.classList.toggle('olHide');
			// 	}
			// }

			//console.log(e.target, e);
			if (e.target.nodeName === 'SPAN')
			{	console.log('click, span found', e.target);		// parent = ol
			 	e.target.parentNode.classList.toggle('olHide');
			}
		});
	}

	 
	// -- draw --------------------------------------------------
	
	draw(oControlHost) 
	{	const keyColumnNr 		= this.db.getColumnIndex(this.key);
		const labelColumnNr 	= this.db.getColumnIndex(this.label);
		const parentColumnNr 	= this.db.getColumnIndex(this.parent);
		
		this.insertStyle(oControlHost);

		//const newList = this.dbSort(this.db);

		const arr = this.dbToArray(this.db);
		//let str = this.arrayToTableStr(arr, 0, 1, 2);
		//this.showBlock(str);
		const sorted = this.arraySort(arr);
		// //sorted.sort((a, b) => a[1] === a[2] || (b[1] <= a[2] && b[2] <= a[2]))
		const leveled = this.levelArray(sorted);
		let str = this.arrayToTableStr(leveled, 0, 1, 2, 3, 4);
		// * this.showBlock(str);
		// //console.log('sorted', sorted);
		//this.arrayToTree(arr);
		const tree = this.showTree(leveled);
		this.setTreeEvent(tree);
	}


	// -- show --------------------------------------------------------

	show(oControlHost) 
	{
	}
	 
 	// -- initialize --------------------------------------------------

		initialize(oControlHost, fnDoneInitializing) 
		{	const o 			= oControlHost.configuration; 				// argumenten die worden meegegeven aan de custom control
			this.key		= o["key"] 		|| '';
			this.parent 	= o["parent"] 		|| '';
			this.label	= o["label"] 		|| '';
			this.key 		= o["key"] 		|| '';
			this.root		= o["root"] 		|| '';

			// An optional promise that will be waited on instead of calling fnDoneInitializing. Since Version 6
			fnDoneInitializing();									// *** aan in Cognos
	}

	// -- setData -----------------------------------------------------
	 
	setData(oControlHost, oDataStore)
	{	this.db = oDataStore;

		console.log('db', this.db);
	}

	};
	return tree;
}
);	

