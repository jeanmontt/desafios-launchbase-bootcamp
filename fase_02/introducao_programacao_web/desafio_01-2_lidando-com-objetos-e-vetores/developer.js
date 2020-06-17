const developers = [
    {
        name: "Jean",
        age: 32,
        technologies: [
            {
                name: "C++",
                specialty: "Desktop"
            },
            {
                name: "Python",
                specialty: "Data Science"
            },
            {
                name: "JavaScript",
                specialty: "Web/Mobile"
            }
        ]
    }
];

console.log(`O usuário ${developers[0].name} tem ${developers[0].age} anos e usa a tecnologia ${developers[0].technologies[0].name} com especialidade em ${developers[0].technologies[0].specialty}.`);