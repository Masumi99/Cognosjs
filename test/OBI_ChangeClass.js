// Versie 1: 24-1-2023 Martin Suyl
// OBI_ChangeClass: wijzig de class van een doelobject dmv een actie bij een ander object, 
// bijv bij een click op een blok met id 'pijl' moet de class 'hide' worden toegevoegd aan het blok dat id 'rechthoek' heeft.
// of bij een hover over de knop met id 'buttonShow' moet blok met id 'menu' de class 'show' krijgen

/* Voorbeeld: zo invullen in configuratie: 
{
    "config": [
        {
            "Source": ".div1",
            "Event": "mouseover",
            "targets": [
                {
                    "target": ".div2",
                    "Action": "add",
                    "Change": "doelDiv"
                },
                {
                    "target": ".div3",
                    "Action": "add",
                    "Change": "doelDiv"
                }
            ]
        },
        {
            "Source": ".div1",
            "Event": "mouseout",
            "targets": [
                {
                    "target": ".div2",
                    "Action": "remove",
                    "Change": "doelDiv"
                },
                {
                    "target": ".div3",
                    "Action": "remove",
                    "Change": "doelDiv"
                }
            ]
        },
        {
            "Source": "#div2",
            "Event": "click",
            "targets": [
                {
                    "target": ".msg",
                    "Action": "toggle",
                    "Change": "hide"
                }
            ]
        },
        {
            "Source": "[name='Gauge Panel1']",
            "Event": "click",
            "targets": [
                {
                    "target": ".msg2",
                    "Action": "toggle",
                    "Change": "hide"
                }
            ]
        }
    ]
}
*/

define(function () 
{	function changeclass() 
	{
	};
	
	// -- draw -----------------------------------------------------

	changeclass.prototype.draw = function (oControlHost) 
	{	const o = oControlHost.configuration; 											// voor verkorte schrijfwijze
		this.config = o["config"];
		if (this.config)
		{	for (let i = 0; i < this.config.length; i++)
			{	const objs = document.querySelectorAll(this.config[i].Source);			// een object kan meerdere classes hebben, van andere typen, zoals id, div, td etc is er maar 1
				if (objs)
				{	objs.forEach((obj) => 
					{	obj.addEventListener(this.config[i].Event, () => 
						{	for (x = 0; x < this.config[i].targets.length; x++)
							{	const tgts = document.querySelectorAll(this.config[i].targets[x].target);
								if (tgts)
								{	tgts.forEach((tgt) =>
									{	if (this.config[i].targets[x].Action === 'add') 	{tgt.classList.add(this.config[i].targets[x].Change);}
										if (this.config[i].targets[x].Action === 'toggle') 	{tgt.classList.toggle(this.config[i].targets[x].Change);}
										if (this.config[i].targets[x].Action === 'remove') 	{tgt.classList.remove(this.config[i].targets[x].Change);}
									});	
								}
							}
						});
					});
				}
			}
		}
	}		


	// -- initialize --------------------------------------------------

	changeclass.prototype.initialize = function(oControlHost, fnDoneInitializing)
	{	fnDoneInitializing();												// als dit er niet in staat, dan werkt het niet
	}	

	return changeclass;
}
);	
