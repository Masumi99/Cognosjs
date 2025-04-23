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
				{	
					tbl.setAttribute('hal_tooltip', 'Bevat een van deze trefwoorden');

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
          
