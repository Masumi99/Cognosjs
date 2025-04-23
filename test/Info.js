define 
(function ()
{
  function info()
    {
    };



	info.prototype.draw = function (oControlHost)
    {  	console.log('*** Info');
		const containers = document.querySelectorAll('.clsCboContainer');
		if (containers)
		{	console.log('** containers:', containers);
			containers.forEach(cont => 
			{	const tbl = cont.querySelector('.clsCboOptions');
				if (tbl)
				{	console.log('** table', tbl);
					tbl.setAttribute('hal_tooltip', 'Bevat een van deze trefwoorden');

				}
				else {console.log('** Tabel niet gevonden', tbl)}

			});

		}

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
			{	console.log('Klik');


				const containers = document.querySelectorAll('.clsCboContainer');
				if (containers)
				{	console.log('** containers:', containers);
					containers.forEach(cont => 
					{	const tbl = cont.querySelector('.clsCboOptions');
						if (tbl)
						{	console.log('** table', tbl);
							tbl.setAttribute('hal_tooltip', 'Bevat een van deze trefwoorden');
						}
						else {console.log('** Tabel niet gevonden', tbl)}
						
						const div = tbl.querySelector('.clsComboBoxTextDiv');
						if (div)
						{	console.log('** div', div);
							div.innerHTML = 'Bevat een van deze trefwoorden';
						}
						else {console.log('** Div niet gevonden', div)}
						
					});
		
				}

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
          
