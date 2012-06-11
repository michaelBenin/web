http = require('http'), url = require('url'), path = require('path'), fs = require('fs'), sys = require('sys'), WebSocketServer = require('websocket').server;

server = http.createServer(function (request, response)
{
	var uri = url.parse(request.url).pathname;
	var filename = path.join(process.cwd(), uri);

	if (uri == "/")
	{
		fs.readFile('/var/web/index.html', 'binary', function (err, file)
		{
			if (err)
			{

				response.writeHeader(500, {
					'Content-Type': 'text/plain'
				});
				response.end(err + "\n");
				return;
			}
			else
			{
				response.writeHeader(200);
				response.write(file, 'binary');
				response.end();
			}
		});

	}
	else
	{
		path.exists(filename, function (exists)
		{
			if (!exists)
			{
				response.writeHeader(404, {
					'Content-Type': 'text/plain'
				});
				response.end("Can't find it...");
			}
			fs.readFile(filename, 'binary', function (err, file)
			{
				if (err)
				{
					response.writeHeader(500, {
						'Content-Type': 'text/plain'
					});
					response.end(err + "\n");
					return;
				}
				response.writeHeader(200);
				response.write(file, 'binary');
				response.end();
			});
		});
	}
});
server.listen(80);

var connections = [];
var commands = [];

wsServer = new WebSocketServer(
{
	httpServer: server,
	autoAcceptConnections: true
});

function checkOrigin(origin)
{
	
		return true;
	

}

wsServer.on('request', function (request)
{
	console.log(request.origin);
	
	if (!checkOrigin(request.origin))
	{
		request.reject();
		return;
	}

	var connection = request.accept('echo-protocol', request.origin);
	connections.push(connection);

	var obj = JSON.stringify(
	{
		"msg": "Welcome, there are " + connections.length + " people"
	});

	connection.sendUTF(obj);

	connections.forEach(function (destination)
	{
		var obj = JSON.stringify(
		{
			"msg": "User has joined " + connection.remoteAddress
		});

		destination.sendUTF(obj);
	});


	connection.on('message', function (message)
	{
		if (message.type === 'utf8')
		{
			connections.forEach(function (destination)
			{
				destination.sendUTF(message.utf8Data);
			});
		}
		else if (message.type === 'binary')
		{
			connection.sendBytes(message.binaryData);
		}
	});
	connection.on('close', function (reasonCode, description)
	{
		var index = connections.indexOf(connection);
		if (index !== -1)
		{
			connections.splice(index, 1);
		}

		connections.forEach(function (destination)
		{
			destination.sendUTF("User has left " + connection.remoteAddress);
		});
		console.log(connection.remoteAddress);
	});
});