define(['https://martinsuyl.netlify.app/tablepopup/dialog.js', 'https://martinsuyl.netlify.app/tablepopup/html.js', 'https://martinsuyl.netlify.app/tablepopup/table.js', 'https://martinsuyl.netlify.app/tablepopup/css.js'],
function (showDialog, constructHtml, Table, constructCSS) 
{   
    function tablePopup()
    {  
    }

   tablePopup.prototype.initialize = function(oControlHost, fnDoneInitializing)
   {  let a = 1;

    fnDoneInitializing();
   }

    tablePopup.prototype.draw = function(oControlHost)
   {  console.log('***** tablePopup');

	let container = oControlHost.container;
	container.innerHTML += constructCSS();
   
   let doc = document.querySelector('body');

	function isTableClicked(tgt)
	{	let isTable = (tgt.nodeName === 'TABLE');
		let parent = tgt;
		
		while (!isTable && parent !== doc && parent.parentElement)
		{	parent = parent?.parentElement;
			if (parent.nodeName === 'TABLE')
			{	isTable = true;				
			}
		}
		return {isTable, element: parent};
	}
	
	function drawBlock(clientX, clientY)
	{	const block = document.createElement('div');
		block.style.cssText = `	width: 10px; 
							height: 10px; 
							background-color: red; 
							position: absolute;
							left: ${clientX}px;
							top: ${clientY}px;`;
		doc.appendChild(block); 
	}

	// dit moet hem worden: rechter muisknop ipv setPageClickEvent

	function setPageClickEvent()
	{	window.oncontextmenu = (e) => 
		{	e.preventDefault();
			const el = isTableClicked(e.target);
			
			if (el.isTable)
			{	const table = new Table(el.element);
				//const {str, tblStr, txtStr} = table.getSelectedTableAsString(el.element);
				//showDialog(e, doc, str, tblStr, txtStr, table);
		
				//console.log('tableAsHtml', table.tableAsHtml());
				showDialog(e, doc, table);
			}
		};	
	
	}

	function test()
	{	const tbl = document.createElement('table');
		doc.appendChild(tbl);
		tbl.classList.add('myTable');

		tbl.innerHTML = constructHtml('table');

		setPageClickEvent();
	}

	test();
	
   }

   return tablePopup;
});


