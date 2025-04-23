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

		}
    }

  info.prototype.initialize = function(oControlHost, fnDoneInitializing)
    {
      fnDoneInitializing();
    }

  return info;
}
);
          
