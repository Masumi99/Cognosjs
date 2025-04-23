define 
(function ()
{
  function info()
    {
    };

	info.prototype.setSearchType()
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
						tbl.hal_tooltip.textContent = searchType; // nieuw

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

	}

	info.prototype.draw = function (oControlHost)
    {  	console.log('*** Info');
		this.setSearchType();
				
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

		oControlHost.container.innerHTML += 
		`<style>
			.btn {
				width: 40px;
				height: 20px;
				background-color: grey;
				color: white;
				border: 1px solid green;
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
			{	this.setSearchType();
				// const searchType = 'Bevat een van deze trefwoorden';
				// console.log('Klik');


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
				// 				tbl.hal_tooltip.textContent = searchType; // nieuw

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

			});

		}
		console.log('*** Window parameters', window.Application.rsPromptParameters.findPromptParameters());
		console.log('*** Window', window);
		// window.LaunchParameters.reportXML
		//.clsComboBoxText._4ln wijzigen van beginWithAny in containAny
		
		// table.tbody.tr.td class = clsComboBoxText, _4ln
		const texts = document.querySelectorAll('.clsComboBoxText');
		if (texts)
		{	texts.forEach(txt => 
			{	console.log('** txt', txt);
				console.log('_4ln', txt._4ln);
				txt._4ln = 'containAny';
				console.log('_4ln', txt._4ln);

			});

		}
    }

  info.prototype.initialize = function(oControlHost, fnDoneInitializing)
    {
      fnDoneInitializing();
    }

  return info;
}
);
          
