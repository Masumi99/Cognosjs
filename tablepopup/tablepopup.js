define(function()
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
   }

   return tablePopup;
});
