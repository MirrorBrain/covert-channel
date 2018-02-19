// Utils
var ref_table = [0];

var diff = 10;

function compare(x, y) {
	if (x > y) {
		var temp = x;
		x = y;
		y = temp;
	}

	return y - x;
}

// Function from https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/round
function precisionRound(number, precision) {
	var factor = Math.pow(10, precision);

	return Math.round(number * factor) / factor;
}

function is_in(x, y) {
	return compare(x, y) < diff;
}

function toto(x, table) {
	var ok = false;
	for (var j of table) {
		if (is_in(x, j)) {
			ok = true;
			// console.log("x,j = " + x + "," + j);
			break;
		}
	}

	if (!ok) {
		// console.log("insert done and x = " + x);
		table.push(precisionRound(x, -1));
	}
}

function get_array_min(table_1, table_2) {
	var min_array_1 = get_table_min(table_1);
	var min_array_2 = get_table_min(table_2);
	return Math.min(min_array_1, min_array_2);
}


function get_array_max(table_1, table_2) {
	var min_array_1 = get_table_max(table_1);
	var min_array_2 = get_table_max(table_2);
	return Math.max(min_array_1, min_array_2);
}


// Les deux prochaines fonctions sont récupérées d'ici : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Math/max
function get_table_max(num_table) {
	return Math.max.apply(null, num_table);
}

function get_table_min(num_table) {
	return Math.min.apply(null, num_table);

}

function insert_data(data_table, table) {
	for (var j of data_table) {
		toto(j, table);
	}
}

function init_array(x, table) {
	for (var i = 0; i < x; x++) {
		table.push(0);
	}
}

function sort_data(table, table_b, element) {
	for (var y of table_b) {
		// console.log("in sort_data element,y = " + element, ";" + y);
		if (is_in(element, y)) {
			var index = table_b.indexOf(y);
			// console.log("added");
			table[index] = table[index] + 1;
			// console.log("table[index] = " + table[index]);
			break;
		}
	}
}

function iter_sort_data(table, table_b, to_sort) {
	for (var x of to_sort) {
		// console.log("in iter_sort_data x = " + x);
		sort_data(table, table_b, x);
	}
}
// On récupère les paramètres de son proco
// cat /proc/cpuinfo
// bugs: cpu_insecure
// bogomips: 4800.00
// clflush size: 64
// cache_alignment: 64
// address sizes: 39 bits physical, 48 bits virtual
// power management:
//
// processor: 1
// vendor_id: GenuineIntel
// cpu family: 6
// model: 142
// model name: Intel(R) Core(TM) i3 - 7100 U CPU @ 2.40 GHz
// stepping: 9
// microcode: 0x80
// cpu MHz: 2400.000
// cache size: 3072 KB
// physical id: 0
// siblings: 4
// core id: 1
// cpu cores: 2
// apicid: 2
// initial apicid: 2
// fpu: yes
// fpu_exception: yes
// cpuid level: 22
// wp: yes

// 2048 * 2
// 4096 cache sets

// Donc on a un cache de 3Mo

// Avec les infos récupèrer ici : http://www.cpu-world.com/CPUs/Core_i3/Intel-Core%20i3%20i3-7100.html
// Level 1 cache size  ? 	2 x 32 KB 8-way set associative instruction caches
// 2 x 32 KB 8-way set associative data caches
// Level 2 cache size  ? 	2 x 256 KB 4-way set associative caches
// Level 3 cache size	3 MB 12-way set associative shared cache
//
//
// https://stackoverflow.com/questions/21611058/diff-between-cache-way-and-cache-set
//
// 3MB= number of sets in cache *12 * 64
// number of sets in cache = 3072 / (12 *64)

// Nombre de cache set : (2^)

// size eviction 8Mo
var buffer_size = 1024 * 8192;
var line_length = Math.pow(2, 12);

var probe_buffer = new ArrayBuffer(buffer_size);
var prime_buffer = new ArrayBuffer(buffer_size);
var probe_view = new DataView(probe_buffer);
var prime_view = new DataView(prime_buffer);

x = 1;

// Initialisation du tableau
// initial data
var flushed1 = [];
var unflushed1 = [];

var table = {};

var iterations = 1000;

var current;

for (var i = 0; i < iterations; i++) {
	for (var j = 0; j < ((buffer_size) / line_length); j++) {
		current = probe_view.getUint32(j * line_length);
	}

	var startTime1 = window.performance.now();
	current = prime_view.getUint32(x);
	var diffTime1 = window.performance.now() - startTime1;

	var startTime2 = window.performance.now();
	current = prime_view.getUint32(x);
	var diffTime2 = window.performance.now() - startTime2;

	flushed1.push(Math.floor(diffTime1 * 100000));
	unflushed1.push(Math.floor(diffTime2 * 100000));

	console.log("ROUND " + iterations);
	console.log(diffTime1);
	console.log(diffTime2);
}

console.log(flushed1);
console.log(unflushed1);

// console.log(get_array_min(flushed1, unflushed1));
// console.log(get_array_max(flushed1, unflushed1));

// console.log(display_array(ref_table));
// console.log(ref_table);

insert_data(flushed1, ref_table);
insert_data(unflushed1, ref_table);

var size = ref_table.length;

var flushed = new Array(size);
var unflushed = new Array(size);

for (var i = 0; i < size; i++) {
	flushed[i] = 0;
	unflushed[i] = 0;
}

ref_table.sort(function (a, b) {
	return a - b;
});

iter_sort_data(flushed, ref_table, flushed1);
iter_sort_data(unflushed, ref_table, unflushed1);

// console.log(unflushed1);
// console.log(flushed1);
//
// console.log("size  " + size);
//
// console.log(ref_table);
// console.log(flushed);
// console.log(unflushed);

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
		categories: ref_table,
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

// Affichage

function display_array(table) {
	var ret = "";
	for (var v in table) {
		ret = ret + "'" + v + "'" + ',';
	}
	return ret.substring(0, ret.length - 1) + "]";
}