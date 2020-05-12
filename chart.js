/* Cargamos los módulos que vamos a usar, una vez cargados ejecutará la función 'drawCharts' */
google.charts.load('current', {'packages':['sankey','corechart', 'bar', 'calendar']});
google.charts.setOnLoadCallback(drawCharts);




 
/* -----  MySQL query  -------------- */
function getCol(matrix, col){
       var column = [];
       for(var i=0; i<matrix.length; i++){
          column.push(matrix[i][col]);
       }
       return column;
    }
function getTwoCol(matrix, col1, col2){
       var column = [];
       for(var i=0; i<matrix.length; i++){
          column.push([matrix[i][col1],matrix[i][col2]]);
       }
       return column;
    }
function get_data_flask(){
    $.ajax({
      type: 'GET',
      url: 'http://localhost:5001/get_data/iris',
      async:false,
      success: function (response) {
        console.log(" Respuesta del server");  
        //console.log(response);
        query = response;
      },
      dataType: 'json'
    });

    return query;
}
function get_data_density_flask(column){
    $.ajax({
      type: 'GET',
      url: 'http://localhost:5001/get_density_data/iris/'+column,
      async:false,
      success: function (response) {
        console.log(" Respuesta del server");  
        //console.log(response);
        query = response;
      },
      dataType: 'json'
    });

    return query;
}




/* función que carga cada uno de los gráficos */
function drawCharts() {
    drawChartP1();
    drawChartP2();
    drawChartP3();
    drawChartP4();
    drawChartP5();

    drawChartM2();
    drawChartM3();
    }
 
function drawChartM2() {

    column_name_x = document.getElementById("thedropdown").value; 
    column_name_y = document.getElementById("thedropdown2").value;
    console.log(column_name_x,column_name_y);


    query = get_data_flask();

    console.log(getTwoCol(query,column_name_x,column_name_y));

    /* Cargamos los datos */
    /* es True si no tiene fila de  cabecera  */
    var data = google.visualization.arrayToDataTable(getTwoCol(query,column_name_x,column_name_y),true);
    
 
    /* Creamos la visualización, en este caso se visualizará en el div con id 'p1Chart' */
    var chart = new google.visualization.ScatterChart(document.getElementById('m2Chart'));
 
    /* Finalmente pintamos la visualización, el segundo parámetro son las opciones */
    chart.draw(data, { });
    }

function drawChartM3() {

    var hist_col = document.getElementById("thedropdown_m3").value;
    console.log('hist_col',hist_col);
    

    query = get_data_flask();

    console.log(getTwoCol(query,5,hist_col));

    /* Cargamos los datos */
    /* es True si no tiene fila de  cabecera  */
    var data = google.visualization.arrayToDataTable(getTwoCol(query,5,hist_col),true);
    
 
    /* Creamos la visualización, en este caso se visualizará en el div con id 'p1Chart' */
    var chart = new google.visualization.Histogram(document.getElementById('m3Chart'));
    

    /* Finalmente pintamos la visualización, el segundo parámetro son las opciones */
    chart.draw(data, { });
    }

function drawChartP1() {
    /* Cargamos los datos */
    var column = document.getElementById("thedropdown_p1").value;
    console.log('column',column);
    query = get_data_density_flask(column);

    var data = google.visualization.arrayToDataTable(query,true);
 
    /* Creamos la visualización, en este caso se visualizará en el div con id 'p1Chart' */
    var chart = new google.visualization.LineChart(document.getElementById('p1Chart'));
 
    /* Finalmente pintamos la visualización, el segundo parámetro son las opciones */
    chart.draw(data, { });
    }
 
function drawChartP2() {
    var data = google.visualization.arrayToDataTable([
          ['City', '2010 Population', '2000 Population'],
          ['New York City, NY', 8175000, 8008000],
          ['Los Angeles, CA', 3792000, 3694000],
          ['Chicago, IL', 2695000, 2896000],
          ['Houston, TX', 2099000, 1953000],
          ['Philadelphia, PA', 1526000, 1517000]
          ]);

    var chart = new google.visualization.BarChart(document.getElementById('p2Chart'));
    chart.draw(data, {
        backgroundColor:'transparent',
        legend: 'bottom'
        });
    }

function drawChartP3() {
     var data = google.visualization.arrayToDataTable([
        ['ID', 'Life Expectancy', 'Fertility Rate', 'Region',     'Population'],
        ['CAN',    80.66,              1.67,      'North America',  33739900],
        ['DEU',    79.84,              1.36,      'Europe',         81902307],
        ['DNK',    78.6,               1.84,      'Europe',         5523095],
        ['EGY',    72.73,              2.78,      'Middle East',    79716203],
        ['GBR',    80.05,              2,         'Europe',         61801570],
        ['IRN',    72.49,              1.7,       'Middle East',    73137148],
        ['IRQ',    68.09,              4.77,      'Middle East',    31090763],
        ['ISR',    81.55,              2.96,      'Middle East',    7485600],
        ['RUS',    68.6,               1.54,      'Europe',         141850000],
        ['USA',    78.09,              2.05,      'North America',  307007000]
          ]);

     var chart = new google.visualization.BubbleChart(document.getElementById('p3Chart'));
     chart.draw(data,  {
        backgroundColor:'transparent',
        legend: 'bottom'
        });
    }

function drawChartP4() {
    var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],
          ['Commute',  2],
          ['Watch TV', 2],
          ['Sleep',    7]
        ]);

    var chart = new google.visualization.PieChart(document.getElementById('p4Chart'));
    chart.draw(data, {
        backgroundColor:'transparent',
        legend: 'bottom'
        });
    }

function drawChartP5() {
    var dataTable = new google.visualization.DataTable();
    dataTable.addColumn({ type: 'date', id: 'Date' });
    dataTable.addColumn({ type: 'number', id: 'Won/Loss' });
    dataTable.addRows([
          [ new Date(2012, 3, 13), 37032 ],
          [ new Date(2012, 3, 14), 38024 ],
          [ new Date(2012, 3, 15), 38024 ],
          [ new Date(2012, 3, 16), 38108 ],
          [ new Date(2012, 3, 17), 38229 ],
          // Many rows omitted for brevity.
          [ new Date(2013, 9, 4), 38177 ],
          [ new Date(2013, 9, 5), 38705 ],
          [ new Date(2013, 9, 12), 38210 ],
          [ new Date(2013, 9, 13), 38029 ],
          [ new Date(2013, 9, 19), 38823 ],
          [ new Date(2013, 9, 23), 38345 ],
          [ new Date(2013, 9, 24), 38436 ],
          [ new Date(2013, 9, 30), 38447 ]
        ]);

    var chart = new google.visualization.Calendar(document.getElementById('p5Chart'));
        chart.draw(dataTable, { height: 350 });
    }