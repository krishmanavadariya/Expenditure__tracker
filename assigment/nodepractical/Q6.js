var http = require('http');

var n1 = 10;
var n2 = 5;

http.createServer(function(req, res) {

    if(req.url == "/add")
        res.write("Addition = " + (n1 + n2));
    else if(req.url == "/sub")
        res.write("Subtraction = " + (n1 - n2));
    else if(req.url == "/mul")
        res.write("Multiplication = " + (n1 * n2));
    else if(req.url == "/div")
        res.write("Division = " + (n1 / n2));
    else
        res.write("Use /add /sub /mul /div");

    res.end();

}).listen(5000);

console.log("Server running...");