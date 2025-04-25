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

		setSearchType();

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
		console.log('*** oControlHost.page', oControlHost.page);
		console.log('*** XML', window.Application.LaunchParameters.reportXML);

		const allControls = oControlHost.page.getAllPromptControls();
		console.log('*** allControls', allControls);

		//.clsComboBoxText._4ln wijzigen van beginWithAny in containAny
		// controlhost.page.getAllPromptControls
		
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
          
