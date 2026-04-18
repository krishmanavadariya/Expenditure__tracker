var http = require('http');

http.createServer(function(req, res) {
    res.write("Hello from Server");
    res.end();
}).listen(5000);

console.log("Server running...");