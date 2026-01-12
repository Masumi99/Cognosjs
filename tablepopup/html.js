define(function()  
{
	return function constructHtml(code)
	{    switch (code)
		{	case 'table':
				return `
					<tr><td>Title 1</td><td>Title 2</td><td>Title 3</td><td>Number</td></tr>
					<tr><td>Column 1</td><td>Column 2</td><td>Column 3</td><td>3</td></tr>
					<tr><td>Column 4</td><td>Column 5</td><td>Column 6</td><td>6</td></tr>
					<tr><td>Column 7</td><td>Column 8</td><td>Column 9</td><td>9</td></tr>
					`;
			break;
		
			case 'dialog':
				return `
					<div class='dialogBody'>
						<div class='dialogContent'></div>
						<div class='btnContainer'>
							<div class='btn btnCancel'>Cancel</div>
							<div class='btn btnCopy'>Copy</div>
						</div>
					</div>
					<div class='dialogMenu'>
				
					<input type="radio" id="asTable" name="output" value="table">
					<label for="asTable">Table</label><br>
					<input type="radio" id="csv" name="output" value="csv">
					<label for="csv">Csv</label><br>
					<input type="radio" id="txt" name="output" value="txt">
					<label for="txt">Text</label><br>
					<input type="radio" id="html" name="output" value="html">
					<label for="html">Html</label> 

				</div>
				`;
			break;
		}
	}
});
