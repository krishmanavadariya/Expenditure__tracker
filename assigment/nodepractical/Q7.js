var http = require('http');
var url = require('url');

http.createServer(function(req, res) {

    var q = url.parse(req.url, true).query;

    var n1 = parseInt(q.n1);
    var n2 = parseInt(q.n2);

    var result = n1 + n2;

    res.write("Result = " + result);
    res.end();

}).listen(5000);

console.log("Server running...");