/**
 * @author
 */

//Split the API key and table ID URLs using variables

var tableKey="&key=AIzaSyCzc9XKi4CG-PcqBZfHBmc3fKmuq3JH9vU"

var tableURL="https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1v4nYSIkAHDXen3wswKczthKQRu4w5uFO3oUxupMs+WHERE+DATE>="

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

//Create a click handler using e
function changeData(e){
	var tableID = e.target.id;
	console.log(tableID);
	var tableArray = tableID.split("_");//This separates the years from the dates
	var tableYear = tableArray[1];//This identifies the year we are selecting on click
	$.get(tableURL+"'"+tableYear+"-01-01'"+tableKey, loadData, "json");//This get request changes the data according to the button clicked
	
	//I notice at this point that my page loads blank and the chart appears only when I click
	//So I need to set a default year that will open on the page
	
	//Bring in History JS to split the URL and change it
	History.pushState({year:tableYear}, "Unemployment from -"+tableYear, "?year="+tableYear);
}

function loadGoogle() {
	
	var yearURL = History.getState().cleanUrl;
	var tableArray = yearURL.split("?"); //Splitting the URL on the question mark
	
	var defaultYear = "1980";

	
	if(tableArray.length > 1){
		//get the query string, break it on equals and 
		defaultYear = tableArray[1].split("=")[1];
	}
	
	
	$(".btn-success").on("click", changeData);

	console.log("Loaded Google Viz");

	//Inside of the get, we see the filename, the function name and the file type
	//Instead of loading data from a static JSON file, I will load it from a Google Fusion Table


	

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



