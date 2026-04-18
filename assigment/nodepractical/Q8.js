var http = require('http');

http.createServer(function(req, res) {

    if(req.url == "/userData") {
        var user = {
            name: "Krish",
            course: "MCA",
            city: "Rajkot"
        };

        res.write(JSON.stringify(user));
    }
    else {
        res.write("Invalid URL");
    }

    res.end();

}).listen(5000);

console.log("Server running...");