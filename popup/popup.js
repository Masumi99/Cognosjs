// Javascript module voor gebruik in Cognos
// Versie 1: 16-1-2026 Martin Suyl

define(function () {
	"use strict";
	

	function popup() {
	};
	
	// -- insertStyle  --------------------------------------------------

	// popup.prototype.insertStyle = function(oControlHost)
	// {	return 	'<style>' + 

			
	// 		'.' + this.buttonName + ' ' +
	// 		'{' + 
	// 			'width: 26px; ' + 
	// 			'border:none; ' + 
	// 			'background-color: white; ' + 
	// 			'color: #0d6efd; ' + 
	// 			'border-radius: 2px; ' + 
	// 			'text-align: center; ' +
	// 			'padding: 15px; ' + 
	// 			'margin: 0 10px 10px 0; ' + 
	// 			'padding: 5px 0 5px 0; ' + 
	// 			'transition: all 0.3s ease-in-out; ' + 
	// 			'display: inline-block;' +
	// 			'border-radius: 5px; border: solid 1px #0d6efd' + 
	// 		'}'	+
			
	// 		'.' + this.buttonName + ':hover ' + 
	// 		'{' + 
	// 			'background-color: #0d6efd; ' + 
	// 			'color: white; ' + 
	// 			'cursor: pointer' + 
	// 		'}' +
			
	// 		'.' + this.searchInput + ' ' + 
	// 		'{' + 
	// 			'transition: transform 0.3s ease-in-out' + 
	// 			'border-style: solid; ' + 
	// 			'border-width: 1px; ' + 
	// 		'}' +
	// 		'.active {width: ' + this.boxWidth + '}' +
			
	// 		// -----
	// 		'.' + this.searchBox + ' ' + 
	// 		'{' +
	// 			'display: none; ' + 
	// 			'border: solid #e6f0ff 2px; ' + 
	// 			'box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); ' + 
	// 			'padding: 0 10px 0 10px; ' + 
	// 			'background-color: white; ' + 
	// 			'z-index:100; ' + 
	// 			'position:absolute; ' + 
	// 		'}' +

	// 		'.' + this.searchList + ' ' + 
	// 		'{' +
	// 			'width:' + this.boxWidth + '; ' + 
	// 			'height:' + this.resultListHeight + '; ' +
	// 			'border-style: solid; ' + 
	// 			'border-width: 1px; ' + 
	// 		'}' +
	 
	// 		// ------
			
	// 		'</style>';
	// }

	// -- draw --------------------------------------------------

	popup.prototype.draw = function(oControlHost)
	{	//const cont = oControlHost.container; 
		console.log('***** Popup module draw.');
		
		// const randomnr 		= parseInt((Math.random() * 100000)).toString();				// random nummer voor unieke naam van dit object
		// this.buttonName 	= 'srchBtn' + randomnr;											// geef knop een unieke naam
		// this.searchBox 		= 'srchBox' + randomnr;											// naam van zoekvenster
		// this.searchList		= 'srchList' + randomnr;										// naam van resultatenlijst
		// this.searchInput	= 'srchInput' + randomnr;										// naam van invoerveld
		// this.selectName		= 'select' + randomnr;											// naam van resultatenlijst - select object

		// let str = this.insertStyle(oControlHost); 											// css injecteren in container op rapport
		// str += '<div class="' + this.buttonName + '" id="' + this.buttonName + '">' + this.iconSymbol + ';</div>'	// knop met icoontje toevoegen
		// str += this.addSearchBox(oControlHost); 													// invoer formulier voor zoeken
		// cont.innerHTML = str;																		// zet op rapport

		// this.bindActions(oControlHost);																// koppel functies aan de zoekelementen
	}

	// ------------ bindActions   -----------------------------------------------------------------
	
	// popup.prototype.bindActions = function (oControlHost) 
	// {	let btn = document.getElementById(this.buttonName);									// zoek de knop op het rapport
	// 	if (btn != undefined)																// gevonden
	// 	{ 	btn.onclick = this.toggleSearchInput.bind(this, oControlHost);					// koppel het tonen van het zoekformulier aan de knop
	// 	}
		
	// 	let inputTexts = document.getElementsByClassName(this.searchInput);					// zoek het invoerveld
	// 	if (inputTexts.length > 0)
	// 	{	this.inputText = inputTexts[0];
	// 		this.inputText.oninput = this.onChangeSearchInput.bind(this, oControlHost);		// koppel aan de functie die de lijst bijwerkt adh invoerveld
	// 	}
	
	// 	let cmbsSearch = document.getElementsByClassName(this.searchList);					// zoek de resultatenlijst
	// 	if (cmbsSearch.length > 0)
	// 	{	this.cmbSearch = cmbsSearch[0];
	// 		this.cmbSearch.onchange = this.searchListOnChange.bind(this, oControlHost);		// bij klikken op een regel wordt de sleutel in de combobox gezet
	// 	}
	// }	

	// -- addSearchBox --------------------------------------------------

	// popup.prototype.addSearchBox = function(oControlHost)									// formulier maken met invoerveld en resultatenlijst
	// { return '<div class="' + this.searchBox + '" style="display: none;">' + 				// zonder style moet je 2 x op de knop drukken
	// 		 '<p><input type="Text" class="' + this.searchInput + '"></p>' +
	// 		 '<p><select class="' + this.searchList + '" size="6" name="' + this.selectName + '"></select></p>' +
	// 		 '</div>';
	// }
	
	// -- strToInt --------------------------------------------------

	function strToInt(str)		
	{	return isNaN(parseInt(str)) === false ? parseInt(str) - 1 : 0;							// 1 aftrekken, want kolommen beginnen bij 0
	}

	// -- initialize --------------------------------------------------

	popup.prototype.initialize = function( oControlHost, fnDoneInitializing )
	{	
		// const o 					= oControlHost.configuration; 								// argumenten die worden meegegeven aan de custom control
		// if (o != null)																			// voorkomen dat er een foutmelding optreedt
		// {	this.promptName			= o["Prompt name"];											// bewaar de naam van de prompt
		// 	this.parameterName		= o["Parameter name"];										// naam van de prompt parameter
		// 	this.boxWidth			= o["Width"]  								|| '300px';		// breedte van het popup formulier
		// 	this.resultListHeight	= o["Result list height"] 					|| '200px';		// hoogte van de resultatenlijst
		// 	this.showTooltip		= o["Show tooltip in result list"]			|| '';			// tooltips laten zien in resultatenlijst
		// 	this.iconSymbol			= o["Icon symbol number"]					|| '&#128269';	// nummer van icoon - default vergrootglas
		// 	this.resultListMax		= strToInt(o["Max items in result list"]	|| '10');		// maximaal items in resultatenlijst
		// 	this.keyColumnNr		= strToInt(o["Key column number"]			|| '1');		// nummer van kolom met de sleutel
		// 	this.displayColumnNr	= strToInt(o["Display text column number"]	|| '2');		// nummer van kolom met de display tekst
		// 	this.tooltipColumnNr	= strToInt(o["Tooltip column number"]		|| '1');		// nummer van kolom met de tooltip
		// }
		// else
		// {	alert('No parameters given!');	
		// }
		console.log('***** Popup module initialized.');
		fnDoneInitializing();
	}

	// ------------ getParameters   -----------------------------------------------------------------
	
	popup.prototype.getParameters = function (oControlHost)										// werk de prompt bij
	{	return [ {"parameter": this.parameterName,												// de naam van de parameter
				  "values": [ {"use" :  this.parameterValue} ] 									// stop in de parameter de bewaarde waarde
				 }
			   ];
	};		

	// ------------ setData   -----------------------------------------------------------------
	
	srch.prototype.setData = function( oControlHost, oDataStore )
	{	//this.DataStore = oDataStore;														// bewaar de koppeling naar de query voor later gebruik
	};

	return popup;
}
);	
