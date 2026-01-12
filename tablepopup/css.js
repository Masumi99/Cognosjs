define(function()  
{
	return function constructCSS()
	{    return `
	<style>
:root {
	box-sizing: border-box;
	padding: 0;
	margin: 0;
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
	padding: 0.1rem 1rem;
}

.myTable {
	border-collapse: collapse;

	tr:first-of-type {
		background-color: steelblue;
		color: white;
		
		td:not(:first-of-type) {
			border-left: 1px solid white;
		}

		td {
			text-align: center;
			padding: 0.1rem 0.4rem;
		}
	}

	tr:not(:first-of-type) {
		color: grey;
		border-bottom: 1px solid lightblue;

		td {
			padding: 0.1rem 0.3rem;
		}
	}
}

.dialogContainer {
	display: flex;
	flex-direction: row;
	column-gap: 0.6rem;
	/* position: absolute;
	top: 5.4rem;
	left: 8rem; */
	background-color: white;
	z-index: 2;
	/* border: 1px solid lightgrey; */
	border-radius: 0.4rem;
	padding: 0.4rem;
	box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

	.dialogBody {
		display: flex;
		flex-direction: column;
		width: auto;
		min-width: 15rem;
	
		.dialogContent {
			display: flex;
			flex-direction: column;
			border: 1px solid purple;
			border-radius: 0.4rem;
			padding: 0.3rem;
			/* flex-wrap: nowrap;
			flex-grow: 1; */
			padding: 0.6rem;
		}

		.btnContainer {
			display: flex;
			width: 100%;
			column-gap: 10px;
			justify-content: space-between;
			margin-top: 0.3rem;

			.btn {
				display: flex;
				justify-content: center;
				align-items: center;
				width: 50%;
				height: 2rem;
				border: 1px solid purple;
				border-radius: 0.4rem;
				color: purple;
				font-weight: 600;

				&:hover {
					background-color: purple;
					color: white;
					cursor: pointer;
				}
			}
		}
	}

	.dialogMenu {
		border: 1px solid purple;
		border-radius: 0.4rem;
		padding: 0.3rem;
		color: purple;
	}

	.txtAreaCode {
		min-width: 20rem;
		min-height: 10rem;
		field-sizing: content;
		border: none;
	}
}
</style>
`;
		}
});
