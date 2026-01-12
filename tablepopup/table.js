define(function()
{	class Table 
	{	constructor(tableAsString) {
			this.table = this.tableAsString = null;
			if (tableAsString)
			{	this.tableAsString = this.getSelectedTableAsString(tableAsString);
				this.table = document.createElement('table');
				this.table.innerHTML = this.tableAsString;

				// this.tableAsString = tableAsString;
				// this.table = document.createElement('table');
				// this.table.innerHTML = this.getSelectedTableAsString(tableAsString);

				//this.table = new DOMParser().parseFromString(tableAsString, "text/html");
			}
		}

		// getTableContent(tbl)
		// {	let str = '';
		// 	let tblStr = '<table>';
		// 	let txtStr = '';

		// 	const trs = tbl.querySelectorAll('tr');
		// 	trs.forEach((tr, i) => 
		// 	{	const tds = tr.querySelectorAll('td');
		// 		tblStr += '<tr>';

		// 		if(i > 0)
		// 		{	str += '<br>';
		// 			txtStr += '<br>';
		// 		}

		// 		tds.forEach((td, j) => 
		// 		{	if(j > 0)
		// 			{	str += ', ';
		// 					txtStr += '\t';
		// 			}
		// 			str += (!Number.isFinite(parseFloat(td.innerText)) ? 
		// 						`"${td.innerText}"` : 
		// 						td.innerText);
		// 			txtStr += `${td.innerText}` 
		// 			tblStr += `<td>${td.innerText}<td>`
		// 		});
		// 		tblStr += '</tr>';
		// 	});
		// 	txtStr += '<br>';
		// 	tblStr += '</table>';
		// 	return {str, tblStr, txtStr};
		// }

		tableAsCsv()
		{	let str = '';

			const trs = this.table.querySelectorAll('tr');
			trs.forEach((tr, i) => 
			{	const tds = tr.querySelectorAll('td');

				if(i > 0)
				{	str += '<br>';
				}

				tds.forEach((td, j) => 
				{	if(j > 0)
					{	str += ', ';
					}
					str += (!Number.isFinite(parseFloat(td.innerText)) ? 
								`"${td.innerText}"` : td.innerText);
				});
			});
			return str;
		}

		tableAsHtml()
		{	const whiteSpace1 = (' ').repeat(3);
			const whiteSpace2 = (' ').repeat(6);
			let str = '<textarea class="txtAreaCode">\n<table>';
//			let str = '<blockquote>\n<table>';

			const trs = this.table.querySelectorAll('tr');
			trs.forEach(tr => 
			{	const tds = tr.querySelectorAll('td');
				str += `\n${whiteSpace1}<tr>`;

				tds.forEach(td => 
				{	str += `\n${whiteSpace2}<td>${td.innerText}</td>`;
				});

				str += `\n${whiteSpace1}</tr>`;

			});
			str += '\n</table></textarea>';
//			str += '\n</table></blockquote>';
			return str;
		}

		tableAsText()
		{	let txtStr = '<pre>';

			const trs = this.table.querySelectorAll('tr');
			trs.forEach((tr, i) => 
			{	const tds = tr.querySelectorAll('td');

				if(i > 0)
				{	txtStr += '<br>';
				}

				tds.forEach((td, j) => 
				{	if(j > 0)
					{	txtStr += '\t';
					}
					txtStr += `${td.innerText}` 
				});
			});
			txtStr += '<br></pre>';
			return txtStr;
		}

		getSelectedTableAsString(tbl)
		{	let tblStr = '<table>';

			const trs = tbl.querySelectorAll('tr');
			trs.forEach(tr => 
			{	const tds = tr.querySelectorAll('td');
				tblStr += '<tr>';

				tds.forEach(td => 
				{	tblStr += `<td>${td.innerText}</td>`
				});
				tblStr += '</tr>';
			});
			tblStr += '</table>';

			return tblStr;
		}

	}

	 return Table;
});  
