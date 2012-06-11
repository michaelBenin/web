(function()
{
	var wsUri = "ws://66.108.74.131/";
	var protocol = "echo-protocol";

   	websocket = new WebSocket(wsUri, protocol);
    	websocket.onopen = function (evt)
    	{
        	websocket.send("A new user has joined");
    	};

   	websocket.onclose = function (evt)
    	{
        	writeToScreen("Disconnected");
    	};
   
	websocket.onmessage = function (evt)
    	{
        	writeToScreen('<span style="color:blue;">Response: '+ evt.data + '</span>');
    	};
    	
	websocket.onerror = function (evt)
    	{
        	writeToScreen('<span style="color:red;">Error: </span> '+ evt.data);
    	};

	function writeToScreen(message)
	{	
    		var pre = document.createElement("p");
    		pre.style.wordWrap = "break-word";
    		pre.innerHTML = message;
    		document.body.appendChild(pre);
	};

})();

