var http = require('http');
http.createServer(function(req, res) {
    var args = process.argv;

    res.write("Course Name: " + args[2]);
    res.write("Course Code: " + args[3]);
    res.write("Faculty Name: " + args[4]);
    res.end();
}).listen(5000);

console.log("Server running...");