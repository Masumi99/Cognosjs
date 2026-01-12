define(['https://martinsuyl.netlify.app/tablepopup/html.js', 'https://martinsuyl.netlify.app/tablepopup/table.js'], function(constructHtml, Table)  
{    let content = contentTblStr = contentTxtStr = '';
	let dialogPresent;
	let table;
	let selectedText = '';

	function dialogSetClickEvent(container)
	{	container.addEventListener('click', (e) =>
		{	if (e.target.classList.contains('btnCopy'))
			{	if (selectedText !== '')
				{	navigator.clipboard.writeText(selectedText);
					console.log('copied', selectedText);
					selectedText = '';
				}
				else
				{	const dialogContent = container.querySelector('.dialogContent');
					const textArea = dialogContent.querySelector('.txtAreaCode');
					const str = textArea ? textArea.childNodes[0].nodeValue :
								dialogContent.innerText.replaceAll('\n\n\n', '\n');
					navigator.clipboard.writeText(str);
					//console.log(window.getSelection());
					//console.log(document.getSelection());
					//console.log(document.selection);
				}
			}
			if (e.target.classList.contains('btnCancel'))
			{	container.remove();				
				dialogPresent = false;
			}
		});


		//const dialogContent = container.querySelector('.dialogContent');
		document.addEventListener('selectionchange', (e) => 
		{	const selection = document.getSelection();	// werkt niet bij textarea
			// Hier uitzoeken: https://developer.mozilla.org/en-US/docs/Web/API/Document/selectionchange_event
			if (selection.type === 'Range')			// knop is type 'Caret'
			{	selectedText = selection.focusNode.data.substring(selection.anchorOffset, selection.focusOffset)
				console.log(selectedText, ' - ', selection);
			}

		});
	} 

										// een textarea is van het type input,
										// waar selectionchange niet werkt
	function eventForTextArea()
	{	const textArea = document.querySelector('.txtAreaCode');
		textArea?.addEventListener('select', (e) => 
		{	selectedText = e.target.value.substring(
				e.target.selectionStart,
				e.target.selectionEnd,
				);
		});
	}

	function dialogRadioEvent(container)
	{	const radios = container.querySelectorAll('input[name="output"]');
		radios.forEach(radio => 
		{	radio.addEventListener('change', (e) => 
			{	const dialogContent = container.querySelector('.dialogContent');
				if (e.target.value === 'csv')
				{	dialogContent.innerHTML = table.tableAsCsv();
				}
				if (e.target.value === 'table')
				{	dialogContent.innerHTML = table.tableAsString;
				}
				if (e.target.value === 'txt')
				{	dialogContent.innerHTML = table.tableAsText();
				}
				if (e.target.value === 'html')
				{	dialogContent.innerHTML = table.tableAsHtml();
					eventForTextArea();


				//{	dialogContent.innerText = table.tableAsString;
					// const textArea = document.querySelector('.txtAreaCode');
					// if (textArea)
					// {	window.setTimeout(function () {
					// 	textArea.style.height = 'auto';
					// 	textArea.style.height = textArea.scrollHeight + 'px'; 
					// 	console.log('textArea gevonden');
					// }, 500);
					// }
				}
				
			});
		});
	}
	
	function createDialog(e, parent, str)
      {	const container = document.createElement('div');
		parent.appendChild(container);
		container.classList.add('dialogContainer');
		container.style.cssText += `	position: absolute;
								left: ${e.clientX}px;
								top: ${e.clientY}px;`

		container.innerHTML = constructHtml('dialog');
		return container;
      }
      
	//return function showDialog(e, parent, str, tblStr, txtStr, table1)
	return function showDialog(e, parent, table1)
	{	if (!dialogPresent)
		{	//content = str;
			//contentTblStr = tblStr;
			//contentTxtStr = txtStr;
			
			//console.log(table1.tableAsCsv());
			//console.log(table1.tableAsText());
			//console.log('vanuit dialog', table1.tableAsString);
			table = table1;

			const newDialog = createDialog(e, parent, content);
			dialogSetClickEvent(newDialog);
			dialogRadioEvent(newDialog);
			dialogPresent = true;
		}
	}
});
