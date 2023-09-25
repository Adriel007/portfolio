google.charts.load('current',{packages:['corechart']});

google.charts.setOnLoadCallback(drawChart);

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    ['Tipo', 'Pessoas'],
    ['Deficientes visuais', 11760000],
    ['Deficientes motores', 5635000],
    ['Deficientes auditivos', 4165000],
    ['Deficientes intelectuais', 1960000],
    ['Deficientes físicos', 980000]
  ]);
  
  var options = {
    title: 'Deficientes no Brasil (IBGE 2000)',
    backgroundColor: '#fff',
    height: 600,
    colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'],
    is3D: true
  };
  
  var chart = new google.visualization.PieChart(document.getElementById('tabela'));
  chart.draw(data, options);
  }