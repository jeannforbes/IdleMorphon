// web worker
onmessage = function(e) {

	var r = e.data,
		start = new Date(),
		msg = "Processing " + r + " items took ";

	while (r-- > 0);

	postMessage(msg + (+new Date() - start) + "ms");

};