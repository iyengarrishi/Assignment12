/**
 * @author
 */

//Split the API key and table ID URLs using variables

var tableKey="&key=AIzaSyCzc9XKi4CG-PcqBZfHBmc3fKmuq3JH9vU"

var tableURL="https://www.googleapis.com/fusiontables/v1/query?sql=SELECT+*+FROM+1v4nYSIkAHDXen3wswKczthKQRu4w5uFO3oUxupMs+WHERE+DATE>="

function loadData(UNEMPDATA) {

	console.log(UNEMPDATA);

	var gDataTable = new google.visualization.DataTable();

	gDataTable.addColumn('string', UNEMPDATA.columns[0]);
	gDataTable.addColumn('number', UNEMPDATA.columns[1]);

	gDataTable.addRows(UNEMPDATA.rows)



	var myChart = new google.visualization.LineChart(document.getElementById("chartDiv"));

	var chartOptions = {
          title: "Unemployment Trends", 
        };

	myChart.draw(gDataTable, chartOptions);


}

//Create a click handler e
function changeData(e){
	var tableID = e.target.id;
	console.log(tableID);
	var tableArray = tableID.split("_");//Splitting the year from the div ID in the HTML
	var tableYear = tableArray[1];//Select the year in the div ID, which is the second element of the array
	//Replace specific year in the get request with the variables created, to change the data on click
	$.get(tableURL+"'"+tableYear+"-01-01'"+tableKey, loadData, "json");
	
	
	//Use History JS to change the URL with each click. The first string changes the display tab, the second changes the URL
	History.pushState({year:tableYear}, "Unemployment from -"+tableYear, "?year="+tableYear);
}

function loadGoogle() {
	
	var yearURL = History.getState().cleanUrl;
	var tableArray = yearURL.split("?"); //Split the URL on the question mark
	
	var displayYear = "1980"; //I have named my default year "displayYear"

	//Determine whether there is anything in the URL or not, if there is, then split on the equal sign
	//This will enable the URL to be shared 
	
	if(tableArray.length > 1){
		
		displayYear = tableArray[1].split("=")[1];
	}
	
	
	$(".btn-success").on("click", changeData);
	
	$("#year_"+displayYear).click();


	

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



