const fs = require('fs');   //requisição do file system
const data = require('./data.json'); //requisição dos dados
const { age, date, graduation } = require('./utils'); //desestruturando e requerendo as funções age e date
const Intl = require('intl');  //requerendo o Intl para formatação

// ============= POST =============
exports.post = function (req, res) {
    //estrutura de validação de dados
    const keys = Object.keys(req.body);   // cria um array de chaves

    for (key of keys) {             // verifica em cada uma das chaves se alguma está vazia e se sim, retorna menssagem
        if (req.body[key] == "") {
            return res.send("Please, fill all fields!"); 
        }       
    }

    //desestruturando objeto
    let { avatar_url, name, birth, education, class_type, expertise } = req.body;

    //tratamento dos dados 
    birth = Date.parse(birth);    //padronizando data de nascimento para TIMESTAMP
    const created_at = Date.now();  //adicionando data de inserção do dado 
    const id = Number(data.teachers.length + 1);  //adicionando ID

    // adicionar novos arrays ao db
    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        education,
        class_type,
        expertise,
        created_at
    });

    // utilizando o fs para criação de dados
    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {     //data.json = caminho - JSON.stringfy = transforma objeto JS em objeto JSON - callback = se der erro de gravação retorna mensagem, senão redireciona para página
        if (err) {
            return res.send("Write file error!");
        } 

        return res.redirect("/teachers");
    });
};

// ============= SHOW =============
exports.show = function (req, res) {
    const { id } = req.params;  //desestruturando o id do params

    const foundTeacher = data.teachers.find(function(teacher) {    //procurando professor dentro do BD
        return teacher.id == id;     // se o id do professor for igual ao id do params retorna true
    })

    if (! foundTeacher) {    //se não encontrou o professor
        return res.send("Teacher not found!");   //retorna a menssagem
    }

    //tratando os dados
    const teacher = {
        ...foundTeacher,     //espalhando (spread operator = coloca dentro do objeto teacher todo o que ha dentro do objeto foundTeacher) os dados dentro da variável
        age: age(foundTeacher.birth),    //inserindo idade com a function age
        expertise: foundTeacher.expertise.split(","),  //.spli() transforma uma string em um array, dentro do parênteses é informado onde é a quebra, neste caso, na vírgula
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundTeacher.created_at),    //formatando timestamp para data pt-br
        education: graduation(foundTeacher.education),
    }

    return res.render("teachers/show", { teacher }); //se encontrou o professor renderiza a page show enviando os dados do "teacher"
};

// ============= EDIT =============
exports.edit = function (req, res) {
    const { id } = req.params;  //desestruturando o id do params

    const foundTeacher = data.teachers.find(function(teacher) {    //procurando professor dentro do BD
        return teacher.id == id;     // se o id do professor for igual ao id do params retorna true
    })

    if (! foundTeacher) {    //se não encontrou o professor
        return res.send("Teacher not found!");   //retorna a menssagem
    }

    teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render("teachers/edit", { teacher });
};