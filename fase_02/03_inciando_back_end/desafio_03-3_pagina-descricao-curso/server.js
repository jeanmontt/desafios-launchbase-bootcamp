const express = require("express");             //importando a biblioteca do express
const nunjucks = require("nunjucks");           //importando a biblioteca do nunjucks

const server = express();                       //a const server instancia o express
const infoCourses = require("./datas/data");    //importando o arquivo com os dados dos cursos

server.use(express.static("public"));           //o express irá observar a pasta public para servir os arq. estáticos

server.set("view engine", "njk");               //setar qual é o motor de views da app, qual é a extensão dos arquivos para abrir

nunjucks.configure("views", {
    express: server,                            //indica ao nunjucks que vamos usar o Express com a var Server
    noCache: true,                              //bloqueando o cache do nunjucks 
    autoescape: false                           //impede que o nunjucks mostre o codigo html em variaveis
}); 

server.get("/", function(req, res) {            //request(req) é o que o usuário escreve e response(res) é a resposta da app
    return res.render("index");                 //render indica qual é a view que será renderizada
});

server.get("/courses", function(req, res) {
    return res.render("courses", {infos: infoCourses}); //enviando o arquivo de dados para a página courses dentro da variavel infos
});

server.get("/courses/:id", function(req, res) {         //passando o id do curso pela rota 
    const id = req.params.id;                           //pegando o id da rota

    const course = infoCourses.find(function(course) {  //fazemos uma iteração com cada item do array infoCourse
        return course.id == id;                         //verificamos se o id da rota é igual ao id de algum item no array
    })

    if (!course) {
        return req.render("not-found");                 //se não é igual renderiza a page not-found
    }

    return res.render("course", {info: course});        //se é igual renderiza a page course
});

server.use(function(req, res) {
    res.status(404).render("not-found");        //renderizar a pag 404
  });

server.listen(5000, function() {                //server escuta a porta 5000, e executa a função
    console.log("Server is running");
});