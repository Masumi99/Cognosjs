define 
(function ()
{
  function info()
    {
    };

  info.prototype.draw = function (oControlHost)
    {  console.log('Info');
    }

  info.prototype.initialize = function(oControlHost, fnDoneInitializing)
    {
      fnDoneInitializing();
    }

  return info;
}
);
          
