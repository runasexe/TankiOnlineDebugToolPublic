window.addEventListener('message', async function (event) {
    const data = {
        requestId: event.data.requestId || null,
        code: event.data.code || null,
        resultWindow: (typeof(event.data.resultWindow) == 'undefined' || event.data.resultWindow === null) ? true : (event.data.resultWindow != false),
        resultTop: (typeof(event.data.resultTop) == 'undefined' || event.data.resultTop === null) ? true : (event.data.resultTop != false)
    };
    if (!data.code) {
        return;
    }
    const output = eval(event.data.code);

    if(data.resultWindow) {
        event.source['window'].postMessage({
            requestId: data.requestId, output
        }, event.origin);
    }
    if(resultTop) {
        window.top.postMessage({
            requestId: data.requestId, output
        }, '*');
    }
});