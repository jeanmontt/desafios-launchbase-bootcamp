//requisições
const express = require('express');
const nunjucks = require('nunjucks');
const routes = require('./routes');
const methodOverride = require('method-override');

const server = express();


server.use(express.urlencoded({ extended: true }));     //Config recebimento de dados no body
server.use(express.static('public'));   //Config statics
server.use(methodOverride('_method'));  //Config method-override
server.use(routes);     //Config routes


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