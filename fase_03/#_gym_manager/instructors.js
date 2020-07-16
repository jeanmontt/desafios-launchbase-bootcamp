const fs = require('fs');   //requisição do file system
const data = require('./data.json'); //requisição dos dados

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
    let { avatar_url, name, birth, gender, services } = req.body;

    //tratamento dos dados 
    birth = Date.parse(birth);    //padronizando data de nascimento para TIMESTAMP
    const created_at = Date.now();  //adicionando data de inserção do dado 
    const id = Number(data.instructors.length + 1);  //adicionando ID

    // adicionar novos arrays ao db
    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    });

    // utilizando o fs para criação de dados
    fs.writeFile('data.json', JSON.stringify(data, null, 4), function(err) {     //data.json = caminho - JSON.stringfy = transforma objeto JS em objeto JSON - callback = se der erro de gravação retorna mensagem, senão redireciona para página
        if (err) {
            return res.send("Write file error!");
        } 

        return res.redirect("/instructors");
    });
};