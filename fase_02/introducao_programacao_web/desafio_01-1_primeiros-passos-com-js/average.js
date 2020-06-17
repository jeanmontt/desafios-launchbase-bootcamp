const classStudentsA = [
    {
        name: "Jean",
        grade: 10
    },
    {
        name: "Pedro",
        grade: 9.5
    },
    {
        name: "Felippe",
        grade: 8
    }
];

const classStudentsB = [
    {
        name: "Vivian",
        grade: 5
    },
    {
        name: "Diego",
        grade: 5
    },
    {
        name: "Mayk",
        grade: 3
    }
];

//Calculadora de média
function averageCalculator(students) {
    let sum = 0;

    for (student of students) {
        sum = sum + student.grade;
    };

    const average = sum / students.length;
    return average;
};

const averageClassA = averageCalculator(classStudentsA);
const averageClassB = averageCalculator(classStudentsB);

// enviar menssagem
function sendMessage(average, classX) {
    if (average > 5) {
        console.log(`A média da ${classX} foi de ${average.toFixed(1)}. Parabéns!`);
    } else {
        console.log(`A média da ${classX} foi de ${average.toFixed(1)}. Ficou abaixo do mínimo!`);
    }
};

sendMessage(averageClassA, "Turma A");
sendMessage(averageClassB, "Turma B");