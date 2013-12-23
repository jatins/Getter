console.log("BG PAGE");

chrome.extension.onRequest.addListener(function(data, sender, sendResponse){
	if(data.length > 2	)
	  console.log("Request from myscript.js: " + data);

	chrome.tabs.sendRequest(sender.tab.id, data);
	sendResponse({});
});

/*chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	console.log(request);
    // chrome.tabs.sendRequest(sender.tab.id, request);
    // sendResponse({});
});*/