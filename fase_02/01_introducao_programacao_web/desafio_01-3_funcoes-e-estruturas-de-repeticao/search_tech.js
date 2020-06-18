const users = [
    {
        name: 'Jean', 
        tech: ['HTML', 'CSS']
    },
    {
        name: 'Pedro', 
        tech: ['JavaScript', 'CSS']
    },
    {
        name: 'Felippe', 
        tech: ['HTML', 'Node.JS']
    },
];

//a função percorre o array e se encontrar CSS retorna true, caso não encontrar retorna vazio (false)
function checkUseCss(user) {
    for (tech of user.tech) {
        if (tech == 'CSS') {
            return true;
        }
    }
};

//checa se o usuário trabalha com CSS e imprime qual tem a tecnologia no repertório
function checkUserWorkWithCss(user) {
    for (i = 0; i < user.length; i++) {
        const userWorkWithCss = checkUseCss(user[i]);

        if (userWorkWithCss) {
            console.log(`O usuário ${user[i].name} trabalha com CSS.`);
        }
    }
};

checkUserWorkWithCss(users);