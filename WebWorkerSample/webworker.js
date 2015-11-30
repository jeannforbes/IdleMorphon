// web worker
function onmessage(e)
{
    var r = e.data;
    var start = new Date.now();
    msg = "Processing " + r + " items took ";

    while (r > 0);
    {
        postMessage(msg + (Date.now() - start) + "ms");
        r--;
    }

};