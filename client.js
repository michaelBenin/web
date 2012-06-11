(function()
{
	var wsUri = "ws://66.108.74.131/";
	var protocol = "echo-protocol";

   	window.websocket = new WebSocket(wsUri, protocol);
    	websocket.addEventListener('open', function(evt)
    	{
        	var obj = {"msg":"A new user has joined"};
		websocket.send(JSON.stringify(obj));
    	});

   	websocket.addEventListener('close', function (evt)
    	{
        	writeToScreen("Disconnected");
    	});
   
	websocket.addEventListener('message', function(evt)
    	{  
		var msg = JSON.parse(evt.data);
        	writeToScreen('<span style="color:blue;">Response: '+ msg.msg + '</span>');
    	});
    	
	websocket.addEventListener('error', function(evt)
    	{
        	writeToScreen('<span style="color:red;">Error: </span> '+ evt.data);
    	});

	document.addEventListener('keypress', function keyPress(e) 
	{
		key = e ? e.which : window.event.keyCode;
		if(key==13 && document.getElementById('chat').value !== "") 
		{
		        var obj = {"msg":document.getElementById("chat").value};
			websocket.send(JSON.stringify(obj));
			document.getElementById('chat').value = "";
			document.getElementById('chat').focus();
		}
	});

	function writeToScreen(message)
	{	
    		var pre = document.createElement("p");
    		pre.style.wordWrap = "break-word";
    		pre.innerHTML = message;
    		document.getElementById('conversation').appendChild(pre);
	};

})();

