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

//imprime as tecnoligias de cada usuário
function print(user) {
    for (user of users) {
        console.log(`${user.name} trabalha com ${user.tech.join(', ')}`);
    }
};

print(users);