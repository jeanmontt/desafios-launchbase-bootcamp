//requisições
const express = require('express');
const nunjucks = require('nunjucks');

const server = express();
const videos = require("./data");

//Config statics
server.use(express.static('public'));

//config template engine
server.set("view engine", "njk");

nunjucks.configure("views", {
    express: server,
    noCache: true,
    autoescape: false
});

//criando rotas
server.get("/", function (req, res) {
    const data = {
        avatar_url: "https://avatars3.githubusercontent.com/u/64878017?s=460&u=b60dbffbf89576b521c9c20a3245d7439e98e065&v=4",
        name: "Jean Monteiro",
        role: `Estudante de desenvolvimento web full-stack na <a href="#">Rocketseat</a>`,
        description: "Buscando conhecimento e qualificação em desenvolvimento web full-stack com foco nas tecnologias do ecossistema JavaScript.",
        links: [{
                name: "Github",
                url: "https://github.com/jeanmontt",
                img: "/assets/github.png"
            },
            {
                name: "Linkedin",
                url: "https://www.linkedin.com/in/jeanmont/",
                img: "/assets/linkedin.png"
            }
        ]
    };

    return res.render("index", {
        about: data
    });
});

server.get("/classes", function (req, res) {
    return res.render("classes", {
        items: videos
    });
});

server.get("/video", function (req, res) {
    const id = req.query.id;

    const video = videos.find(function (video) {
        return video.id == id;
    })

    if (!video) {
        return res.send("Video not found!")
    }

    return res.render("video", {
        item: video
    })
});

server.listen(5000, function () {
    console.log("Server is running");
});