

/*
UTILS


*/
var tableauRerence = [0];

var difference = 10;
function compare(x, y) {
    if(x > y)
    {
      var temp = x;
      x = y;
      y = temp;
    }
    return y - x;
}
/*
fonction from https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/round
*/
function precisionRound(number, precision) {
  var factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}
function dedans(x,y)
{
  if(compare(x,y) < difference)
    return true;
  else {
    return false;
  }
}

function toto(x,tableau)
{
  var ok = false;
  for(var j of tableau)
  {
    if(dedans(x,j)){
      ok = true;
      //console.log("x,j = " + x +","+j);
      break;
    }
  }
  if(!ok)
  {
  //  console.log("insert donne et x = " + x);
    tableau.push(precisionRound(x, -1));
  }
}

function getMinOfArray(monTableau1,monTableau2)
{
    var minArray1 = getMinTableau(monTableau1);
    var minArray2 = getMinTableau(monTableau2);
    return Math.min(minArray1,minArray2);
}


function getMaxOfArray(monTableau1,monTableau2)
{
    var minArray1 =getMaxTableau(monTableau1);
    var minArray2 = getMaxTableau(monTableau2);
    return Math.max(minArray1,minArray2);
}

/*
Les deux prochaines fonctions sont récupére d'ici : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/max
*/
function getMaxTableau(tableauNumérique) {
    return Math.max.apply(null, tableauNumérique);
}
function getMinTableau(tableauNumérique)
{
  return Math.min.apply(null, tableauNumérique);

}

function insertDonne(tableauValeur,tableau)
{
  for(var j of tableauValeur){
    toto(j,tableau);
  }
}

function initArray(x,tableau)
{
  for(var i = 0;i<x;x++)
  {
    tableau.push(0);
  }
}
function rangerDonnee(tableau,tableauB,element)
{
    for(var y of tableauB)
    {
      //console.log("dans ranger donner element,y = " + element ,";" +y);
      if(dedans(element,y))
      {
        var index = tableauB.indexOf(y);
        //console.log("rajout ok ");
        tableau[index] = tableau[index] +1;
        //console.log("tableau[index] = " + tableau[index]);
        break;
      }
  }
}

function iterRangerDonnees(tableau,tableauB,tableauaTrier)
{
  for(var x of tableauaTrier)
  {
    //console.log(" dans iter ranger x = " + x );
    rangerDonnee(tableau,tableauB,x);
  }
}
//On récupère les paramètres de son proco
// cat /proc/cpuinfo
/*
bugs		: cpu_insecure
bogomips	: 4800.00
clflush size	: 64
cache_alignment	: 64
address sizes	: 39 bits physical, 48 bits virtual
power management:

processor	: 1
vendor_id	: GenuineIntel
cpu family	: 6
model		: 142
model name	: Intel(R) Core(TM) i3-7100U CPU @ 2.40GHz
stepping	: 9
microcode	: 0x80
cpu MHz		: 2400.000
cache size	: 3072 KB
physical id	: 0
siblings	: 4
core id		: 1
cpu cores	: 2
apicid		: 2
initial apicid	: 2
fpu		: yes
fpu_exception	: yes
cpuid level	: 22
wp		: yes

*/
//2048 * 2
//4096 cache ste

//Donc on a un cache de 3Mo

//Avec les infos récupèrer ici : http://www.cpu-world.com/CPUs/Core_i3/Intel-Core%20i3%20i3-7100.html
/*
Level 1 cache size  ? 	2 x 32 KB 8-way set associative instruction caches
2 x 32 KB 8-way set associative data caches
Level 2 cache size  ? 	2 x 256 KB 4-way set associative caches
Level 3 cache size	3 MB 12-way set associative shared cache


https://stackoverflow.com/questions/21611058/difference-between-cache-way-and-cache-set

3MB= number of sets in cache *12 * 64
number of sets in cache = 3072 / (12 *64)
*/

//Nombre de cache set : (2^)

//taille eviction 8Mo
var tailleBuffer = 1024*8192;
var tailleLine = Math.pow(2,12);
var bufferProbe = new ArrayBuffer(tailleBuffer);
var bufferPrime = new ArrayBuffer(tailleBuffer);
var probeView = new DataView(bufferProbe);
var primeView = new DataView(bufferPrime);
x= 1;
//Initialisation du tableau
// initial data
var flushed1 = [];
var unflushed1 = [];
var tableau = {};
var nombreTour =1000;
var current;
for(var i =0;i< nombreTour;i++)
{
  for (var j = 0; j < ((tailleBuffer) / tailleLine); j++) {
  current = probeView.getUint32(j * tailleLine);
}


var startTime1 = window.performance.now();
current = primeView.getUint32(x);
var diffTime1 = window.performance.now() -startTime1 ;


var startTime2 = window.performance.now();
current = primeView.getUint32(x);
var diffTime2 = window.performance.now()- startTime2;





flushed1.push(Math.floor(diffTime1 * 100000));
unflushed1.push(Math.floor(diffTime2 * 100000));

console.log("ROUND " + nombreTour);
  console.log(diffTime1);
  console.log(diffTime2);

}

console.log(flushed1);
console.log(unflushed1);
/*
console.log(getMinOfArray(flushed1,unflushed1));
console.log(getMaxOfArray(flushed1,unflushed1));
*/
//console.log(arrayAffichage(tableauRerence));
//console.log(tableauRerence);

insertDonne(flushed1,tableauRerence);
insertDonne(unflushed1,tableauRerence);
var taille = tableauRerence.length;

var flushed = new Array(taille);
var unflushed = new Array(taille);
for(var i = 0;i < taille;i++)
{
  flushed[i]=0;
  unflushed[i] = 0;
}
tableauRerence.sort(function(a, b) {
  return a - b;
});
iterRangerDonnees(flushed,tableauRerence,flushed1);
iterRangerDonnees(unflushed,tableauRerence,unflushed1);
/*
console.log(unflushed1);
console.log(flushed1);

console.log("taille  " + taille);

console.log(tableauRerence);
console.log(flushed);
console.log(unflushed);
*/
Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Prime+Probe'
    },
    subtitle: {
        text: 'Projet VET'
    },
    xAxis: {
        categories: tableauRerence,
        crosshair: true,
        title: {
          text: 'Temps x*10^5'
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Nombres'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: [{
        name: 'Hit',
        data: unflushed

    }, {
        name: 'Miss',
        data: flushed

    }]
});


/*

Affichage
*/

function arrayAffichage(tableau)
{
  var retour = "";
  for(var v in tableau)
  {
    retour   = retour +"'"+ v +"'"+',';
  }
  return retour.substring(0,retour.length-1) + "]";
}
