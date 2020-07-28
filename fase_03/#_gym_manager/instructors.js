const fs = require('fs');   //requisição do file system
const data = require('./data.json'); //requisição dos dados
const { age, date } = require('./utils'); //desestruturando e requerendo as funções age e date
const Intl = require('intl');  //requerendo o Intl para formatação


exports.index = function (req, res) {
    const instructors = []
    
    for(let foundInstructor of data.instructors){
        const instructor = {
            ...foundInstructor,
            services: foundInstructor.services.split(',')
        }
        instructors.push(instructor)
    }

    return res.render("instructors/index", { instructors });
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


// ============= SHOW =============
exports.show = function (req, res) {
    const { id } = req.params;  //desestruturando o id do params

    const foundInstructor = data.instructors.find(function(instructor) {    //procurando instrutor dentro do BD
        return instructor.id == id;     // se o id do instrutor for igual ao id do params retorna true
    })

    if (! foundInstructor) {    //se não encontrou o instrutor
        return res.send("Instructor not found!");   //retorna a menssagem
    }

    //tratando os dados
    const instructor = {
        ...foundInstructor,     //espalhando (spread operator = coloca dentro do objeto instructor todo o que ha dentro do objeto foundInstructor) os dados dentro da variável
        age: age(foundInstructor.birth),    //inserindo idade com a function age
        services: foundInstructor.services.split(","),  //.spli() transforma uma string em um array, dentro do parênteses é informado onde é a quebra, neste caso, na vírgula
        created_at: new Intl.DateTimeFormat("pt-BR").format(foundInstructor.created_at),    //formatando timestamp para data pt-br
    }

    return res.render("instructors/show", { instructor }); //se encontrou o instrutor renderiza a page show enviando os dados do "instructor"
};

// ============= EDIT =============
exports.edit = function (req, res) {
    const { id } = req.params;  //desestruturando o id do params

    const foundInstructor = data.instructors.find(function(instructor) {    //procurando instrutor dentro do BD
        return instructor.id == id;     // se o id do instrutor for igual ao id do params retorna true
    })

    if (! foundInstructor) {    //se não encontrou o instrutor
        return res.send("Instructor not found!");   //retorna a menssagem
    }

    instructor = {
        ...foundInstructor,
        birth: date(foundInstructor.birth)
    }

    return res.render("instructors/edit", { instructor })
}

// ============= PUT =============
exports.put = function (req, res) {
    const { id } = req.body;  //desestruturando o id do body
    let index = 0;

    const foundInstructor = data.instructors.find(function(instructor, foundIndex) {    //procurando instrutor e o index dentro do BD
        if (id == instructor.id) {      //se o id do req.body for igual ao id do instructor
            index = foundIndex;     //adicionar o index encontrado à variável index
            return true     //retorna verdadeiro pois o instrutor foi encontrado
        }
    })

    if (! foundInstructor) {    //se não encontrou o instrutor
        return res.send("Instructor not found!");   //retorna a menssagem
    }

    const instructor = {
        ...foundInstructor,     //espalha todos os dado do foundInstructor dentro da variável instructor
        ...req.body,    //espalha todos os dados recebidos no req.body dentro da variável instructor
        birth: Date.parse(req.body.birth),  //padronizando data de nascimento recebida no req.body para TIMESTAMP
        id: Number(req.body.id),
    }

    data.instructors[index] = instructor;   //coloca no instructor encontrato os dados tratados na variável instructor

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {
        if(err) return res.send("Write error!");        //se houver algum erro retorna a mensagem de erro

        return res.redirect(`/instructors/${id}`);      //não havendo erro redireciona para a página do instrutor
    })
}

// ============= DELETE =============
exports.delete = function (req, res) {
    const { id } = req.body;    //desestruturando o id do body

    const filteredInstructors = data.instructors.filter(function(instructor) {      //para cada instrutor roda a função e envia para dentro o instrutor, retornando um boleano, todo que for true é inserido no array e false removido do array
        return instructor.id != id;     //verifica se o instructor.id é diferente do id em execução, sendo verdadeiro ele insere na filteredInstructor, sendo falso remove da variável
    })

    data.instructors = filteredInstructors;     //atualiza o BD removendo o instrutor requerido

    fs.writeFile("data.json", JSON.stringify(data, null, 4), function(err) {        //escreve o DB
        if (err) return res.send("Write file error!");      //havendo erro envia mensagem

        return res.redirect("/instructors");        //não havendo erro redireciona para page
    })
}