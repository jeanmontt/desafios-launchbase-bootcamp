const fs = require('fs');   //requisição do file system
const data = require('../data.json'); //requisição dos dados
const { date } = require('../utils'); //desestruturando e requerendo as funções age e date
const Intl = require('intl');  //requerendo o Intl para formatação

// ============= INDEX =============
exports.index = function (req, res) {
    return res.render("members/index", { members: data.members });
}

// ============= CREATE =============
exports.create = function (req, res) {
    return res.render("members/create");
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
    const lastMember = data.members[data.members.length - 1];    //pegando o ultimo membro caso já haja registro
    if (lastMember) {
        id = lastMember.id + 1;    //se já houver registro, id é igual ao último id do membro + 1
    }

    // adicionar novos arrays ao db
    data.members.push({
        ...req.body,
        id,
        birth,
    });

    // utilizando o fs para criação de dados
    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {     //data.json = caminho - JSON.stringfy = transforma objeto JS em objeto JSON - callback = se der erro de gravação retorna mensagem, senão redireciona para página
        if (err) {
            return res.send("Write file error!");
        } 

        return res.redirect("/members");
    });
};

// ============= SHOW =============
exports.show = function (req, res) {
    const { id } = req.params;  //desestruturando o id do params

    const foundMember = data.members.find(function(member) {    //procurando instrutor dentro do BD
        return member.id == id;     // se o id do instrutor for igual ao id do params retorna true
    })

    if (! foundMember) {    //se não encontrou o instrutor
        return res.send("Member not found!");   //retorna a menssagem
    }

    //tratando os dados
    const member = {
        ...foundMember,     //espalhando (spread operator = coloca dentro do objeto member todo o que ha dentro do objeto foundMember) os dados dentro da variável
        birth: date(foundMember.birth).birthDay    //inserindo idade com a function age
    }

    return res.render("members/show", { member }); //se encontrou o instrutor renderiza a page show enviando os dados do "member"
};

// ============= EDIT =============
exports.edit = function (req, res) {
    const { id } = req.params;  //desestruturando o id do params

    const foundMember = data.members.find(function(member) {    //procurando instrutor dentro do BD
        return member.id == id;     // se o id do instrutor for igual ao id do params retorna true
    })

    if (! foundMember) {    //se não encontrou o instrutor
        return res.send("Member not found!");   //retorna a menssagem
    }

    member = {
        ...foundMember,
        birth: date(foundMember.birth).iso
    }

    return res.render("members/edit", { member })
}

// ============= PUT =============
exports.put = function (req, res) {
    const { id } = req.body;  //desestruturando o id do body
    let index = 0;

    const foundMember = data.members.find(function(member, foundIndex) {    //procurando instrutor e o index dentro do BD
        if (id == member.id) {      //se o id do req.body for igual ao id do member
            index = foundIndex;     //adicionar o index encontrado à variável index
            return true     //retorna verdadeiro pois o instrutor foi encontrado
        }
    })

    if (! foundMember) {    //se não encontrou o instrutor
        return res.send("Member not found!");   //retorna a menssagem
    }

    const member = {
        ...foundMember,     //espalha todos os dado do foundMember dentro da variável member
        ...req.body,    //espalha todos os dados recebidos no req.body dentro da variável member
        birth: Date.parse(req.body.birth),  //padronizando data de nascimento recebida no req.body para TIMESTAMP
        id: Number(req.body.id),    //padronizando o id com o constructor Number
    }

    data.members[index] = member;   //coloca no member encontrato os dados tratados na variável member

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write error!");        //se houver algum erro retorna a mensagem de erro

        return res.redirect(`/members/${id}`);      //não havendo erro redireciona para a página do instrutor
    })
}

// ============= DELETE =============
exports.delete = function (req, res) {
    const { id } = req.body;    //desestruturando o id do body

    const filteredMembers = data.members.filter(function(member) {      //para cada instrutor roda a função e envia para dentro o instrutor, retornando um boleano, todo que for true é inserido no array e false removido do array
        return member.id != id;     //verifica se o member.id é diferente do id em execução, sendo verdadeiro ele insere na filteredMember, sendo falso remove da variável
    })

    data.members = filteredMembers;     //atualiza o BD removendo o instrutor requerido

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {        //escreve o DB
        if (err) return res.send("Write file error!");      //havendo erro envia mensagem

        return res.redirect("/members");        //não havendo erro redireciona para page
    })
}