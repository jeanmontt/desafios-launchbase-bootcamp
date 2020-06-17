const classStudentsA = [
    {
        name: "Jean",
        grade: 10
    },
    {
        name: "Pedro",
        grade: 2
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

function averageCalculator(students) {
    sum = 0;

    for (student of students) {
        sum = sum + student.grade;
    };

    average = sum / students.length;

    return average;
};

function sendAverageMessage(average, classX) {
    if (average > 5) {
        console.log(`A média da ${classX} foi de ${average.toFixed(1)}. Parabéns!`);
    } else {
        console.log(`A média da ${classX} foi de ${average.toFixed(1)}. Ficou abaixo do mínimo!`);
    }
};

function markFailedStudent(student) {
    student.failed = false;

    if (student.grade < 5) {
        student.failed = true;
    }
};

function sendFailedStudentMessage(student, classX) {
    if (student.failed) {
        console.log(`O(a) aluno(a) ${student.name} da ${classX} está reprovado.`);
    }
};

function failedStudents(students, classX) {
    for (student of students) {
        markFailedStudent(student);
        sendFailedStudentMessage(student, classX);
    }
};

const averageClassA = averageCalculator(classStudentsA);
const averageClassB = averageCalculator(classStudentsB);

sendAverageMessage(averageClassA, "Turma A");
sendAverageMessage(averageClassB, "Turma B");

failedStudents(classStudentsA, "Turma A");
failedStudents(classStudentsB, "Turma B");