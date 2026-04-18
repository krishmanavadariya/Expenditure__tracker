var http = require('http');

http.createServer(function(req, res) {

    if(req.url == "/home")
        res.write("Welcome to Home");
    else if(req.url == "/student")
        res.write("Welcome to Student");
    else if(req.url == "/faculty")
        res.write("Welcome to Faculty");
    else
        res.write("Hello from Server");

    res.end();

}).listen(5000);

console.log("Server running...");