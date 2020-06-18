const users = [
    {
        name: "Salvio",
        incomes: [115.3, 48.7, 98.3, 14.5],
        expenses: [85.3, 13.5, 19.9]
    },
    {
        name: "Marcio",
        incomes: [24.6, 214.3, 45.3],
        expenses: [185.3, 12.1, 120.0]
    },
    {
        name: "Lucia",
        incomes: [9.8, 120.3, 340.2, 45.3],
        expenses: [450.2, 29.9]
    }
];

//Calcula saldo
function calculateBalance(incomes, expenses) {
    sumIncomes = sumNumbers(incomes);
    sumExpenses = sumNumbers(expenses);

    return sumIncomes - sumExpenses;
};

//Soma Receitas/Despesas
function sumNumbers(numbers) {
    sum = 0;

    for (number of numbers) {
        sum = sum + number;
    }

    return sum;
};

//Envia saldo final
for (user of users) {
    balance = calculateBalance(user.incomes, user.expenses);

    if (balance > 0) {
        console.log(`${user.name} possui saldo POSITIVO de R$${balance.toFixed(2)}.`);
    } else {
        console.log(`${user.name} possui saldo NEGATIVO de R$${balance.toFixed(2)}`);
    }
};