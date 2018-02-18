var threshold = .0015;
//taille de 8M0
var buffer_size = 1024 * 8192;
// var line_length = 64;

var current;

var probe_buffer = new ArrayBuffer(buffer_size);
var prime_buffer = new ArrayBuffer(buffer_size);
var probe_view = new DataView(probe_buffer);
var prime_view = new DataView(prime_buffer);

iterations = 10000;

var order = [];

for (var i = 0; i < 64 * 500; i += 64) {
	order.push(i);
}

order = shuffle(order);

function probe(set, candidate) {
	probe_view.getUint32(candidate);
	set.forEach(function (l) {
		probe_view.getUint32(l);
	});
	var t1 = window.performance.now();
	probe_view.getUint32(candidate);
	var t2 = window.performance.now();
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

Array.prototype.diff = function (a) {
	return this.filter(function (i) {
		return a.indexOf(i) < 0;
	});
};

function shuffle(array) {
	var counter = array.length,
		temp, index;

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


function sendZero() {
	for (var j = 0; j < conflict_set.length; j++) {
		current = probe_view.getUint32(conflict_set[j]);
	}
}

function sendOne() {
	for (var j = 0; j < conflict_set.length; j++) {
		current = probe_view.getUint32(conflict_set[0]);
	}

	for (var i = 0; i < iterations; i++) {
		sendZero();
	}

	// console.log("envoie de zero avec i = " + i)
	// var startTime1 = window.performance.now();
	// current = prime_view.getUint32(x);
	// var diffTime1 = window.performance.now() - startTime1;
	//
	// // On regarde combien de temps pour l'accés a x
	// console.log("acces un : " + diffTime1);
	//
	// // On regarde encore
	// console.log("acces deux : " + diffTime1);
}