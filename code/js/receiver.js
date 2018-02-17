
var treshold =0;
var tailleBuffer = 1024*8192;
var tailleLine = Math.pow(2,12);
var x = 2;
var current;
var bufferProbe = new ArrayBuffer(tailleBuffer);
var bufferPrime = new ArrayBuffer(tailleBuffer);
var probeView = new DataView(bufferProbe);
var primeView = new DataView(bufferPrime);
var flushed1 = [];
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

function sleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
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

temps = [];
function receiv(){
  for(var d = 0; d < 10000;d++){
    temps.push(0);
    for(var i =0;i< conflict_set.length;i++)
    {

        //  current = primeView.getUint32(x);
      var startTime1 = window.performance.now();
      current= primeView.getUint32(conflict_set[i]);
      var diffTime1 = window.performance.now() -startTime1;
      temps[d] = temps[d] + diffTime1;


      }

}

}


receiv();
console.log(flushed1);
for(var d = 0; d < temps.length;d++)
{
  console.log("pour i = " + d + " sum time = " + temps[d]);
}
