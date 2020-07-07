let http = require('http');
let log = require('./modules/my-log');
let { countries } = require('countries-list');
let url = require('url');
let querystring = require('querystring');

let server = http.createServer(function(request, response) {

    let parset = url.parse(request.url);
    console.log('parset:', parset);

    let pathname = parset.pathname;
    let query = querystring.parse(parset.query);
    console.log('query:', query);


    if (pathname === "/") {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>HELLOPAGE</p><body/></html>');
        response.end();
    } else if (pathname === "/exit") {
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>BYE</p><body/></html>');
        response.end();

    } else if (pathname === "/info") {
        let result = log.info(pathname);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(result);
        response.end();

    } else if (pathname === "/error") {
        let result = log.error(pathname);
        response.writeHead(200, { 'Content-Type': 'text/html' });
        response.write(result);
        response.end();

    } else if (pathname === "/country") {
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.write(JSON.stringify(countries[query.code]));
        response.end();

    } else {
        response.writeHead(400, { 'Content-Type': 'text/html' });
        response.write('<html><body><p>NOFOUNT</p><body/></html>');
        response.end();
    }

});


server.listen(4000);
console.log('running on 4000');