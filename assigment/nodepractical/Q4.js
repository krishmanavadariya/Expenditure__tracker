var http = require('http');

http.createServer(function(req, res) {
    res.write("Welcome to NodeJS App");
    res.end();
}).listen(3000);

console.log("Server running...");