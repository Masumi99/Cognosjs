define 
(function ()
{
  function info()
    {
    };

	function setSearchType()
	{	const searchType = 'Bevat een van deze trefwoorden';
		console.log('setSearchType');

		const containers = document.querySelectorAll('.clsCboContainer');
		if (containers)
		{	console.log('** containers:', containers);
			containers.forEach(cont => 
			{	const tbls = cont.querySelectorAll('.clsCboOptions');
				if (tbls)
				{	tbls.forEach(tbl =>
					{	console.log('** table', tbl);
						tbl.setAttribute('title', searchType);
						tbl.setAttribute('hal_tooltip', searchType);

						const texts = tbl.querySelectorAll('.clsComboBoxText');
						if (texts)
						{	texts.forEach(txt => 
							{	console.log('** txt', txt);
								console.log('_4ln', txt._4ln);
								txt._4ln = 'containAny';
								console.log('_4ln', txt._4ln);
				
								const div = txt.querySelector('.clsComboBoxTextDiv');
								if (div)
								{	console.log('** div', div);
									div.innerText = searchType;
								}

							});
				
						}

					});
				}
				else {console.log('** Tabel niet gevonden', tbls)}

			});
	
		}


		// const containers = document.querySelectorAll('.clsCboContainer');
		// if (containers)
		// {	console.log('** containers:', containers);
		// 	containers.forEach(cont => 
		// 	{	const tbls = cont.querySelectorAll('.clsCboOptions');
		// 		if (tbls)
		// 		{	tbls.forEach(tbl => 
		// 			{	console.log('** table', tbl);
		// 				tbl.setAttribute('title', searchType);
		// 				tbl.setAttribute('hal_tooltip', searchType);
		// 				tbl.hal_tooltip.textContent = searchType; //

		// 				const div = tbl.querySelector('.clsComboBoxTextDiv');
		// 				if (div)
		// 				{	console.log('** div', div);
		// 					div.innerHTML = searchType;
		// 				}
		// 				else {console.log('** Div niet gevonden', div)}
		// 			});
		// 		}
		// 		else 
		// 		{	console.log('** Tabel niet gevonden', tbls);

		// 		}
				
				
		// 	});

		// }



	}


	info.prototype.draw = function (oControlHost)
    {  	console.log('*** Info');
		// const containers = document.querySelectorAll('.clsCboContainer');
		// if (containers)
		// {	console.log('** containers:', containers);
		// 	containers.forEach(cont => 
		// 	{	const tbl = cont.querySelector('.clsCboOptions');
		// 		if (tbl)
		// 		{	console.log('** table', tbl);
		// 			tbl.setAttribute('hal_tooltip', 'Bevat een van deze trefwoorden');

		// 		}
		// 		else {console.log('** Tabel niet gevonden', tbl)}

		// 	});

		// }

		// *** setSearchType();	// zet alles goed, maar dringt niet door naar Cognos

		oControlHost.container.innerHTML += 
		`<style>
			.btn {
				width: 40px;
				height: 20px;
				background-color: steelblue;
				color: white;
				border: 1px solid grey;
				padding-left: 5px;
			}

			.btn:hover {
				cursor: pointer;
			}
		</style>
		<div class="btn">Klik</div>
		`;

		const btn = document.querySelector('.btn');
		if (btn)
		{	btn.addEventListener('click', () => 
			{	const searchType = 'Bevat een van deze trefwoorden';
				console.log('Klik');


				const containers = document.querySelectorAll('.clsCboContainer');
				if (containers)
				{	console.log('** containers:', containers);
					containers.forEach(cont => 
					{	const tbls = cont.querySelectorAll('.clsCboOptions');
						if (tbls)
						{	tbls.forEach(tbl => 
							{	console.log('** table', tbl);
								tbl.setAttribute('title', searchType);
								tbl.setAttribute('hal_tooltip', searchType);
								tbl.hal_tooltip.textContent = searchType; //

								const div = tbl.querySelector('.clsComboBoxTextDiv');
								if (div)
								{	console.log('** div', div);
									div.innerHTML = searchType;
								}
								else {console.log('** Div niet gevonden', div)}
							});
						}
						else 
						{	console.log('** Tabel niet gevonden', tbls);

						}
						
						
					});
		
				}

			});

		}
		console.log('*** Window parameters', window.Application.rsPromptParameters.findPromptParameters());
		console.log('*** Window', window);
		console.log('*** oControlHost', oControlHost);
		console.log('*** oControlHost.page', oControlHost.page);
		console.log('*** XML', window.Application.LaunchParameters.reportXML);

		const allControls = oControlHost.page.getAllPromptControls();
		console.log('*** allControls', allControls);
		console.log('*** allControls._ydm', allControls[0]._ydm);
		console.log('*** allControls._ydm.matchAnywhere', allControls[0]._ydm.getAttribute('matchAnywhere'));
		console.log('*** allControls._ydm.matchAll', allControls[0]._ydm.getAttribute('matchAll'));

		allControls[0]._ydm.setAttribute('matchAnywhere', true);
		allControls[0]._ydm.setAttribute('matchAll', true);

		// pulldownlijst is onzichtbaar en bevat 4 regels in .clsComboBoxBlocker // heeft diverse events, zoals mousedown
		const lst = document.querySelectorAll('.po_clsListView_dropdown');
		console.log('*** dropdowns', lst);
		
		if (lst)
		{	const trs = lst[0].querySelectorAll('TR');
			console.log('*** TR', trs);

			// const mousedown = new Event('mousedown');
			// trs[2].dispatchEvent(mousedown);		// doet niets

			//trs[2].fireEvent('onmousedown', event); // fout

			// voegt wel een functie toe aan de tr, maar klikken geeft foutmelding
			const mousedown = new CustomEvent('mousedown',{bubbles: true});
			trs[2].addEventListener('mousedown', (e) => {e.target.click()});
			//trs[2].addEventListener('mousedown', (e) => {e.target.dispatchEvent(mousedown)});
			
			//trs[2].dispatchEvent(mousedown);

		}


		// const myParameters = report.getParameters()
		// if (myParameters)
		// {	const myParameter = myParameters.getParameterByName("Parameter1");
		// 	myParameter.setValue("R0009705");
		// 	report.setParameters(report.getParameters());
		// }

		// werkt niet, komt van ai
		// console.log('*** cognos', cognos);
		// console.log('*** cognos.reportService', cognos.reportService);

		console.log('*** window.Application.GetParameterValues()', window.Application.GetParameterValues());

		// lst table tbody tr td div class=clsListItemLabel

		//const lst = document.querySelectorAll('.clsListView_selectWithSearchHardcodedForSize');


		//.clsComboBoxText._4ln wijzigen van beginWithAny in containAny
		// controlhost.page.getAllPromptControls

		// alle objecttypes: oControlHost.page._xv2 // 39 types, zoals list, table, v2_paretoChart
		
		// table.tbody.tr.td class = clsComboBoxText, _4ln

		// const texts = document.querySelectorAll('.clsComboBoxText');
		// if (texts)
		// {	texts.forEach(txt => 
		// 	{	console.log('** txt', txt);
		// 		console.log('_4ln', txt._4ln);
		// 		txt._4ln = 'containAny';
		// 		console.log('_4ln', txt._4ln);

		// 	});

		// }
    }

	// info.prototype.getParameters = function(oControlHost)
    // {	return [ {parameter: "Parameter1", values: [{use: "R00009276"}]}];
    // }
	
	info.prototype.initialize = function(oControlHost, fnDoneInitializing)
    {
      fnDoneInitializing();
    }

  return info;
}
);
          
