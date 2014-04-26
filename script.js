/**
 * @author
 */
function loadData(UNEMPDATA) {

	console.log(UNEMPDATA);

	var gDataTable = new google.visualization.DataTable();

	//When I add columns, the first parameter is the datatype in that column
	//The second parameter is the name of the column

	gDataTable.addColumn('string', UNEMPDATA.columns[0]);
	gDataTable.addColumn('number', UNEMPDATA.columns[1]);

	gDataTable.addRows(UNEMPDATA.rows)



	var myChart = new google.visualization.LineChart(document.getElementById("chartDiv"));

	var chartOptions = {
          title: "Unemployment Trends", 
        };

	myChart.draw(gDataTable, chartOptions);


}



function loadGoogle() {

	console.log("Loaded Google Viz");

	//Inside of the get, we see the filename, the function name and the file type
	//Instead of loading data from a static JSON file, I will load it from a Google Fusion Table


	$.get("https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1v4nYSIkAHDXen3wswKczthKQRu4w5uFO3oUxupMs+WHERE+DATE>='1979-12-01'&key=AIzaSyCzc9XKi4CG-PcqBZfHBmc3fKmuq3JH9vU", loadData, "json");

}


function loadPage() {

	console.log("Document is ready");

	//load the Google visualization library
	google.load("visualization", "1", {
		packages : ["corechart"],
		callback : "loadGoogle"
	});

}

$(document).ready(loadPage);



