//requisições
const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');

const server = express();

//Config statics
server.use(express.static('public'));

//Config routes
server.use(routes);

//config template engine
server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    noCache: true,
    autoescape: false
});

//on server
server.listen(5000, function () {
    console.log("Server is running");
});