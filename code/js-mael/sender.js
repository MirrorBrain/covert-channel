/****************************** Global variables ******************************/

// we use this buffer size to consider the whole cache
var buffer_size = 8192 * 1024;

// we use this buffer to evict everything from L3
var eviction_buffer = new ArrayBuffer(buffer_size);
var eviction_view = new DataView(eviction_buffer);

// we use this buffer to test retrieval
var probe_buffer = new ArrayBuffer(buffer_size);
var probe_view = new DataView(probe_buffer);

// L3 cache line size
var offset = 64;

// bogus retrieval variable
var current;

/**************************** Threshold definition ****************************/

// purge L3 cache to prime eviction set
function purge() {
	for (var i = 0; i < ((buffer_size - 8192) / offset); i++) {
		current = eviction_view.getUint32(i * offset);
	}
}

// // running counts
// var flushed_total = 0;
// var unflushed_total = 0;
// var flushed_control_total = 0;
// var unflushed_control_total = 0;
//
// // run test 'rounds' number of times
// var rounds = 1000;
//
// for (var c = 0; c < rounds; c++) {
// 	purge();
//
// 	// first retrieval - comes from RAM
// 	var beginFirst = window.performance.now();
// 	current = probe_view.getUint32(1); //1 is the page
// 	var diffFirst = window.performance.now() - beginFirst;
//
// 	// second retrieval - comes from L3
// 	var beginSecond = window.performance.now();
// 	current = probe_view.getUint32(1); //1 is the page
// 	var diffSecond = window.performance.now() - beginSecond;
//
// 	/****************************** Control tests: ******************************/
//
// 	// this test should be comparable to the second
// 	var beginThird = window.performance.now();
// 	current = probe_view.getUint32(1); //1 is the page
// 	var diffThird = window.performance.now() - beginThird;
//
// 	purge();
//
// 	// this test should be comparable to the first
// 	var beginFourth = window.performance.now();
// 	current = probe_view.getUint32(1); //1 is the page
// 	var diffFourth = window.performance.now() - beginFourth;
//
// 	// measure differences
// 	flushed_total += diffFirst;
// 	unflushed_total += diffSecond;
// 	flushed_control_total += diffFourth;
// 	unflushed_control_total += diffThird;
// }
//
// // results from the threshold definition
// var results = {
// 	flushed_average: flushed_total / rounds,
// 	unflushed_average: unflushed_total / rounds,
// 	flushed_control_average: flushed_control_total / rounds,
// 	unflushed_control_average: unflushed_control_total / rounds
// }
//
// console.log(results);
//
// // define the threshold with the previous results
// var threshold = Math.max(results.unflushed_average, results.unflushed_control_average);
//
// console.log("threshold = " + threshold);

/***************************** Sender's functions *****************************/

var times_to_send = 100;

// blocking wait
function sleep(delay) {
	var start = window.performance.now();
	while (window.performance.now() < start + delay);
}

// send a one for 'times_to_send' times
function send_one() {
	for (var i = 0; i < times_to_send; i++) {
		purge();
	}
}

var begin = window.performance.now();
send_one();
var diff = window.performance.now() - begin;

console.log("sending time  = " + diff);

// send given array of bits
function send_bits(message) {
	for (var i = 0; i < message.length; i++) {
		if (message[i] = 0) {
			sleep(diff);
		} else {
			send_one();
		}
	}
}

send_bits([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1
]);