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

// ============= PUT =============
exports.update = function (req, res) {
    const { id } = req.body;  //desestruturando o id do body
    let index = 0;

    const foundTeacher = data.teachers.find(function(teacher, foundIndex) {    //procurando professor e o index dentro do BD
        if (id == teacher.id) {      //se o id do req.body for igual ao id do professor
            index = foundIndex;     //adicionar o index encontrado à variável index
            return true     //retorna verdadeiro pois o professor foi encontrado
        }
    })

    if (! foundTeacher) {    //se não encontrou o professor
        return res.send("Teacher not found!");   //retorna a menssagem
    }

    const teacher = {
        ...foundTeacher,     //espalha todos os dado do foundTeacher dentro da variável teacher
        ...req.body,    //espalha todos os dados recebidos no req.body dentro da variável instructor
        birth: Date.parse(req.body.birth),  //padronizando data de nascimento recebida no req.body para TIMESTAMP
    }

    data.teachers[index] = teacher;   //coloca no teacher encontrato os dados tratados na variável teacher

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write file error!");        //se houver algum erro retorna a mensagem de erro

        return res.redirect(`/teachers/${id}`);      //não havendo erro redireciona para a página do professor
    })
}

// ============= DELETE =============
exports.delete = function (req, res) {
    const { id } = req.body;    //desestruturando o id do body

    const filteredTeachers = data.teachers.filter(function(instructor) {      //para cada professor roda a função e envia para dentro o teacher, retornando um boleano, todo que for true é inserido no array e false removido do array
        return teacher.id != id;     //verifica se o teacher.id é diferente do id em execução, sendo verdadeiro ele insere na filteredTeacher, sendo falso remove da variável
    })

    data.teachers = filteredTeachers;     //atualiza o BD removendo o professor requerido

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {        //escreve o DB
        if (err) return res.send("Write file error!");      //havendo erro envia mensagem

        return res.redirect("/teachers");        //não havendo erro redireciona para page
    })
}