/**
 * @Author: Ribault Pierre <cawo>
 * @Date:   2018-02-09T11:41:13+01:00
 * @Email:  me@ribaultpierre.fr
 * @Last modified by:   cawo
 * @Last modified time: 2018-02-09T14:45:06+01:00
 */



var treshold =0;
//taille de 8M0
var tailleBuffer = 1024*8192;
var tailleLine = 64;
//Math.pow(2,12);
var x = 2;
var current;
var bufferProbe = new ArrayBuffer(tailleBuffer);
var bufferPrime = new ArrayBuffer(tailleBuffer);
var probeView = new DataView(bufferProbe);
var primeView = new DataView(bufferPrime);
nombreTour = 10000;
var order = [];

for (var i=0; i < 64*500; i+=64) {
	order.push(i);
}
order = shuffle(order);

function probe(set, candidate) {
	probeView.getUint32(candidate);
	set.forEach(function (l) {
		probeView.getUint32(l);
	});
	var t1 = window.performance.now();
	probeView.getUint32(candidate);
	var t2 = window.performance.now();
	threshold = .0015
	return t2 - t1 > threshold;
}

var conflict_set = [];
var i = 0;
order.forEach(function (candidate) {
	if (!probe(conflict_set, candidate)) {
		conflict_set.push(candidate);
	} else {
		console.log(i);
	}
	i++;
});

Array.prototype.diff = function(a) {
    return this.filter(function(i) {return a.indexOf(i) < 0;});
};

function shuffle(array) {
    var counter = array.length, temp, index;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}


function sendZero(){
  for (var j = 0; j < conflict_set.length; j++) {
  current = probeView.getUint32(conflict_set[j]);
}
}

function sendOne()
{
  for (var j = 0; j < conflict_set.length; j++) {
    current = probeView.getUint32(conflict_set[0]);

}

for(var i =0;i< nombreTour;i++)
{

      sendZero();


}

  /*
    console.log("envoie de zero avec i = " + i)
    var startTime1 = window.performance.now();
    current = primeView.getUint32(x);
    var diffTime1 = window.performance.now() -startTime1 ;

    //On regarde combien de temps pour l'accés a x
    console.log("acces un : " + diffTime1);
    */

    //On regarde encore
    //console.log("acces deux : " + diffTime1);

  }
