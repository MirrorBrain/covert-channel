/**
 * @Author: Ribault Pierre <cawo>
 * @Date:   2018-02-19T16:51:46+01:00
 * @Email:  me@ribaultpierre.fr
 * @Last modified by:   cawo
 * @Last modified time: 2018-03-11T20:13:28+01:00
 */

 var threshold = 0.01;
 //taille de 8M0
 var buffer_size = 1024 * 8192;
 var current;
 var probe_buffer = new ArrayBuffer(buffer_size);
 var prime_buffer = new ArrayBuffer(buffer_size);
 var probe_view = new DataView(probe_buffer);
 var prime_view = new DataView(prime_buffer);
 var iteration = 1000;
 var x = 2;
var startTime1 ;
var startTime2;
var diffTime2;
var diffTime1;
/*


*/
function faireRien()
{
  for (var j = 0; j < ((buffer_size) / line_length); j++) {
//    Math.pow(130,48);

  }
//  sleep(0.06);
}
function probe()
{

  for (var j = 0; j < ((buffer_size) / line_length); j++) {
		current = probe_view.getUint32(j * line_length);
	}
}


function sleep(delay) {
	var start = window.performance.now();
	while (window.performance.now() < start + delay);
}
 var tableauSortie= [];
 var debutDebutDemo = window.performance.now();
 var dureeSender = 0.121;
 var dureeMax = (iteration * dureeSender);

 var tick;
for (var i = 0; window.performance.now()< debutDebutDemo + dureeMax; i++) {
  /*
  for (var j = 0; j < ((buffer_size) / line_length); j++) {
		current = probe_view.getUint32(j * line_length);
	}
*/
//   sleep(3.1);

	 startTime1 = window.performance.now();
	current = prime_view.getUint32(x);
	 diffTime1 = window.performance.now() - startTime1;
   tick = window.performance.now() - debutDebutDemo;
tableauSortie.push([tick,diffTime1*10000]);
//while(window.performance.now() < (dureeSender + startTime1));
console.log("duree total = " +  (window.performance.now() - startTime1));
//diffTime1 = Math.floor(diffTime1  );
/*
 if(diffTime1 < threshold)
{
tableauSortie.push('0')}
else {
tableauSortie.push('1');
}
*/
}


Highcharts.chart('container', {
    chart: {
        type: 'scatter',
        zoomType: 'xy'
    },
    title: {
        text: ''
    },
    subtitle: {
        text: ''
    },
    xAxis: {
        title: {
            enabled: true,
            text: 'Temps'
        },
        startOnTick: true,
        endOnTick: true,
        showLastLabel: true
    },
    yAxis: {
        title: {
            text: 'Temps d\'accés a la variable'
        }
    },
    legend: {
        layout: 'vertical',
        align: 'left',
        verticalAlign: 'top',
        /*
        x: 100,
        y: 70,
        */
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
        borderWidth: 1
    },
    plotOptions: {
        scatter: {
            marker: {
                radius: 1,
                states: {
                    hover: {
                        enabled: true,
                        lineColor: 'rgb(100,100,100)'
                    }
                }
            },
            states: {
                hover: {
                    marker: {
                        enabled: false
                    }
                }
            },
            tooltip: {
                headerFormat: '<b>{series.name}</b><br>',
                pointFormat: '{point.x} temps de simulation, {point.y} temps d\'accés à la variable'
            }
        }
    },
    series: [{
        name: 'acces',
        color: 'rgba(223, 83, 83, .5)',
        data: tableauSortie

    }]
});


console.log(tableauSortie);
