const fs = require('fs');   //requisição do file system
const data = require('../data.json'); //requisição dos dados
const { age, date, graduation } = require('../public/scripts/utils'); //desestruturando e requerendo as funções age e date
const Intl = require('intl');  //requerendo o Intl para formatação

// ============= INDEX =============
exports.index = function (req, res) {
    return res.render("students/index", { students: data.students });
}

// ============= CREATE =============
exports.create = function (req, res) {
    return res.render("students/create")
}

// ============= POST =============
exports.post = function (req, res) {
    //estrutura de validação de dados
    const keys = Object.keys(req.body);   // cria um array de chaves

    for (key of keys) {             // verifica em cada uma das chaves se alguma está vazia e se sim, retorna menssagem
        if (req.body[key] == "") {
            return res.send("Please, fill all fields!"); 
        }       
    } 

    //tratamento dos dados 
    birth = Date.parse(req.body.birth);    //padronizando data de nascimento para TIMESTAMP
    let id = 1;     //criando id caso seja o primeiro registro
    const lastStudent = data.students[data.students.length - 1];    //pegando o ultimo aluno caso já haja registro
    if (lastStudent) {
        id = lastStudent.id + 1;    //se já houver registro, id é igual ao último id do aluno + 1
    }

    // adicionar novos arrays ao db
    data.students.push({
        ...req.body,
        id,
        birth
    });

    // utilizando o fs para criação de dados
    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {     //data.json = caminho - JSON.stringfy = transforma objeto JS em objeto JSON - callback = se der erro de gravação retorna mensagem, senão redireciona para página
        if (err) {
            return res.send("Write file error!");
        } 

        return res.redirect("/students");
    });
};

// ============= SHOW =============
exports.show = function (req, res) {
    const { id } = req.params;  //desestruturando o id do params

    const foundStudent = data.students.find(function(student) {    //procurando professor dentro do BD
        return student.id == id;     // se o id do professor for igual ao id do params retorna true
    })

    if (! foundStudent) {    //se não encontrou o professor
        return res.send("Student not found!");   //retorna a menssagem
    }

    //tratando os dados
    const student = {
        ...foundStudent,     //espalhando (spread operator = coloca dentro do objeto student todo o que ha dentro do objeto foundStudent) os dados dentro da variável
        birth: date(foundStudent.birth).birthDay,    //inserindo idade com a function age
    }

    return res.render("students/show", { student }); //se encontrou o professor renderiza a page show enviando os dados do "student"
};

// ============= EDIT =============
exports.edit = function (req, res) {
    const { id } = req.params;  //desestruturando o id do params

    const foundStudent = data.students.find(function(student) {    //procurando professor dentro do BD
        return student.id == id;     // se o id do professor for igual ao id do params retorna true
    })

    if (! foundStudent) {    //se não encontrou o professor
        return res.send("Student not found!");   //retorna a menssagem
    }

    student = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render("students/edit", { student });
};

// ============= PUT =============
exports.update = function (req, res) {
    const { id } = req.body;  //desestruturando o id do body
    let index = 0;

    const foundStudent = data.students.find(function(student, foundIndex) {    //procurando professor e o index dentro do BD
        if (id == student.id) {      //se o id do req.body for igual ao id do professor
            index = foundIndex;     //adicionar o index encontrado à variável index
            return true     //retorna verdadeiro pois o professor foi encontrado
        }
    })

    if (! foundStudent) {    //se não encontrou o professor
        return res.send("Student not found!");   //retorna a menssagem
    }

    const student = {
        ...foundStudent,     //espalha todos os dado do foundStudent dentro da variável student
        ...req.body,    //espalha todos os dados recebidos no req.body dentro da variável instructor
        birth: Date.parse(req.body.birth),  //padronizando data de nascimento recebida no req.body para TIMESTAMP
        id: Number(req.body.id),    //padronizando o id com o constructor Number
    }

    data.students[index] = student;   //coloca no student encontrato os dados tratados na variável student

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write file error!");        //se houver algum erro retorna a mensagem de erro

        return res.redirect(`/students/${id}`);      //não havendo erro redireciona para a página do professor
    })
}

// ============= DELETE =============
exports.delete = function (req, res) {
    const { id } = req.body;    //desestruturando o id do body

    const filteredStudents = data.students.filter(function(instructor) {      //para cada professor roda a função e envia para dentro o student, retornando um boleano, todo que for true é inserido no array e false removido do array
        return student.id != id;     //verifica se o student.id é diferente do id em execução, sendo verdadeiro ele insere na filteredStudent, sendo falso remove da variável
    })

    data.students = filteredStudents;     //atualiza o BD removendo o professor requerido

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {        //escreve o DB
        if (err) return res.send("Write file error!");      //havendo erro envia mensagem

        return res.redirect("/students");        //não havendo erro redireciona para page
    })
}