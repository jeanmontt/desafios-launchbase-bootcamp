const express = require("express");
const nunjucks = require("nunjucks");

const server = express();

server.use(express.static("public"));

server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    noCache: true
});

server.get("/", function(req, res) {
    return res.render("index");
});

server.get("/courses", function(req, res) {
    const cards = [
        {
            id: "starter",
            number: "01",
            img_alt: "Imagem curso Starter",
            description: "<strong>Torne-se um programador desejado</strong> no mercado com estes cursos gratuitos",
            module: "11 módulos",
            price: "Gratuito"
        },
        {
            id: "launchbase",
            number: "02",
            img_alt: "Imagem curso Launchbase",
            description: "<strong>Domine a programação do zero</strong> e tenha acesso às melhores oportunidades do mercado",
            module: "52 módulos + bônus",
            price: "Pago"
        },
        {
            id: "gostack",
            number: "03",
            img_alt: "Imagem curso Gostack",
            description: "<strong>Treinamento imersivo</strong> nas tecnologias mais modernas de desenvolvimento web e mobile",
            module: "60 módulos + bônus",
            price: "Pago"
        }
    ];

    return res.render("courses", {cards});
});

server.use(function(req, res) {
    res.status(404).render("not-found");
  });

server.listen(5000);