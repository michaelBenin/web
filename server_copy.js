http =require('http'),
url = require('url'),
path = require('path'),
fs = require('fs'),
sys = require('sys');

server = http.createServer(function (request, response)
{
    var uri = url.parse(request.url).pathname;
    var filename = path.join(process.cwd(), uri);
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
});

server.listen(80);
