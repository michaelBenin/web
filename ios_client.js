	window.onload = function(){
	if("WebSocket" in window)
{
alert("websockets supported");
}
	var wsUri = "ws://66.108.74.131/";
	var protocol = "echo-protocol";

   	websocket = new WebSocket(wsUri, protocol);
    	websocket.onopen = function(evt)
    	{	writeToScreen("WebSocket Opened");
        	var obj = {"msg":"A new user has joined"};
		websocket.send(JSON.stringify(obj));
    	}

   	websocket.onclose = function(evt)
    	{
        	writeToScreen("Disconnected");
		websocket = new WebSocket(wsUri, protocol);
    	}
   
	websocket.onmessage = function(evt)
    	{  
		writeToScreen("Received Message");
		var msg = JSON.parse(evt.data);
        	writeToScreen('<span style="color:blue;">Response: '+ msg.msg + '</span>');
    	}
    	
	websocket.onerror = function(evt)
    	{
		writeToScreen("Error");
        	writeToScreen('<span style="color:red;">Error: </span> '+ evt.data);
    	}

	document.onkeypress = function keyPress(e) 
	{
		key = e ? e.which : window.event.keyCode;
		if(key==13 && document.getElementById('chat').value !== "") 
		{
		        var obj = {"msg":document.getElementById("chat").value};
			websocket.send(JSON.stringify(obj));
			document.getElementById('chat').value = "";
			document.getElementById('chat').focus();
		}
	}

	function writeToScreen(message)
	{	
    		var pre = document.createElement("p");
    		pre.style.wordWrap = "break-word";
    		pre.innerHTML = message;
    		document.getElementById('conversation').appendChild(pre);
	}

}

