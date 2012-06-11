window.onload = (function()
{
	var wsUri = "ws://66.108.74.131/";
	var protocol = "echo-protocol";
   	window.websocket = new WebSocket(wsUri, protocol);
    websocket.onopen = function(evt)
    	{
        	setTimeout(function()
			{
				//var obj = {"msg":"A new user has joined"};
				//websocket.send(JSON.stringify(obj));
			}, 0);
    	};

   	websocket.onclose = close;
	function close(evt)
    	{
			setTimeout(function()
			{
        		writeToScreen("Disconnected");
			}, 0);
    	};
   
	websocket.onmessage = message;
	function message(evt)
    	{  
		setTimeout(function()
			{
				var msg = JSON.parse(evt.data);
        		writeToScreen('<span style="color:blue;">Response: '+ msg.msg + '</span>');
			}, 0);
    	};
    	
	websocket.onerror = error;
	function error(evt)
    	{
			setTimeout(function()
			{
        		writeToScreen('<span style="color:red;">Error: </span> '+ evt.data);
			}, 0);
    	};

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

