var http = require('http');
var url = require('url');
var fs = require('fs');

function computePage(adr, res) {

    var q = url.parse(adr, true);

    res.write("<!DOCTYPE html >\n");
    res.write("     <html>\n");
    res.write("         <head>\n");
    res.write("             <title>" + q.search + "</title>\n");
    res.write("         </head>\n");
    res.write("         <body>\n");

    var X = q.query.x * 1, Y = q.query.y * 1, result;
    var opBonkers;
    
    switch (q.query.op) {
        case "plus":
            result = X + Y;
            opBonkers = "+";
            break;
        case "minus":
            result = X - Y;
            opBonkers = "-";
            break;
        case "times":
            result = X * Y;
            opBonkers = "*";
            break;
        case "div":
            result = X / Y;
            opBonkers = "/";
            break;
    }
    var expr = X + " " + opBonkers + " " + Y + " = " + result;

    res.write("             <h1>" + expr + "</h1>\n");
    res.write("         </body>");
    res.write("     </html>");
    return res.end();
    

};

http.createServer(function (req, res) {
    var p = url.parse(req.url, true);
    //var filename = "." + q.pathname;
    /*fs.readFile(filename, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });*/

    if (p.pathname == "/compute") {
        computePage(req.url, res);
    }
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    return res.end();

    
}).listen(8080); 