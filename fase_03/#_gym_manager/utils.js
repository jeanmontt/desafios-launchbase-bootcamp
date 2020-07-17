module.exports = {
    // lógica para idade
    age: function (timestamp) {
        const today = new Date();    //criando um novo objeto de data com a data de hoje e colocando na variável today
        const birthDate = new Date(timestamp);  //criando um novo objeto de data fornecendo o timestamp com o aniversário da pessoa
    
        let age = today.getFullYear() - birthDate.getFullYear();   //.getFullYear() retorna o ano da data especificada de acordo com a hora local.
        const month = today.getMonth() - birthDate.getMonth();   //.getMonth() retorna o mês na data especificada de acordo com o horário local, como um valor zero-based (onde o zero indica o primeiro mês do ano).        
    
        if (month < 0 || month == 0 && today.getDate() < birthDate.getDate()) {      //se ainda não chegou ao mês de aniversáro OU se está no mês de aniversário E hoje é menor que o aniversário
            age = age - 1;      //diminui um ano na variável age
        }
    
        return age; 
    }
}