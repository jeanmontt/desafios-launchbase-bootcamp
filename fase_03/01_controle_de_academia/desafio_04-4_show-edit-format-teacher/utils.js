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
    },

    //lógica para renderizar o grau de escolaridade
    graduation: function(graduations) {
        let graduation = graduations;

        switch (graduation) {
            case "EM":
                return graduation = "Ensino Médio completo";
            case "ES":
                return graduation = "Ensino Superior completo";
            case "M":
                return graduation = "Mestrado";
            case "D":
                return graduation = "Doutorado";
        }
    },

    //lógica para retornar padrão de data yyyy-mm-dd
    date: function (timestamp) {
        const date = new Date(timestamp);
        const year = date.getUTCFullYear();     // converte utilizando o tempo universal
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);      //.getMonth retorna o mês de 0 a 11, então soma 1 para chegar ao mês exato
        const day = `0${date.getUTCDate()}`.slice(-2);      //.slice() retorna uma cópia de parte de um array a partir de um subarray criado entre as posições início e fim (fim não é necessário) de um array original. O Array original não é modificado.

        return `${year}-${month}-${day}`;
    }
}