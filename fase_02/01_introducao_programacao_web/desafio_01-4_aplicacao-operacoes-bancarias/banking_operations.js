const user = {
    name: 'Jean',
    transactions: [],
    balance: 0
};

function createTransaction(transaction) {
    if (transaction > 0) {
        user.transactions.push({
            type: 'Credit',
            value: transaction
        })

        user.balance += + transaction;

    } else if (transaction == 0) {
        console.log('Transação não efetuada, somente é aceito valores maiores ou menores que 0');

    } else {
        user.transactions.push({
            type: 'Debit',
            value: transaction
        })

        user.balance += + transaction;
    }
};

function sendUserMessage() {
    console.log(`Você possui um saldo de R$${user.balance.toFixed(2)} e suas transações foram:`);
    console.table(user.transactions);
};

function getHigherTransactionByType(type) {
    higherTrasation = '';
    higherValue = 0;

    for (transaction of user.transactions) {
        if (transaction.type == type && transaction.value > higherValue) {
            higherValue = transaction.value;
            higherTrasation = transaction;

        } else if (transaction.type == type && transaction.value < higherValue) {
            higherValue = transaction.value;
            higherTrasation = transaction;
        }
    }

    return higherTrasation;
};

function sendHigherTrasactionMessage(type) {
    getHigherTransactionByType(type);

    if (type === 'Credit'){
        console.log(`A maior transação de crédito foi no valor de: R$${higherTrasation.value}`);
    } else {
        console.log(`A maior transação de débito foi no valor de: R$${-higherTrasation.value}`);
    }
};

function getAverageValueAllTransactions() {
    sum = 0;

    for (transaction of user.transactions) {
        if (transaction.value > 0) {
            sum += transaction.value;
        } else {
            sum += - transaction.value;
        }
    }
    
    return sum / user.transactions.length;
};

function getAverageValueTransactionsByType(type) {
    sum= 0;
    count = getTransactionsCount();

    for (transaction of user.transactions) {
        if (transaction.type === type) {
            sum += transaction.value;
        }
    }

    if (type === 'Credit') {
        avarage = sum / count.credit;
    } else {
        avarage = sum / count.debit;
    }

    return avarage;
};

function sendAvarageMessage() {
    allAvarage = getAverageValueAllTransactions();
    creditAvarage = getAverageValueTransactionsByType('Credit');
    debitAvarage = getAverageValueTransactionsByType('Debit');

    console.log(`A média de todas transações é de R$${allAvarage.toFixed(2)}`);
    console.log(`A média das transações de crédito é de R$${creditAvarage.toFixed(2)}`);
    console.log(`A média das transações de débito é de R$${-debitAvarage.toFixed(2)}`);
};

function getTransactionsCount() {
    count = {
        credit: 0,
        debit: 0
    };

    for (transaction of user.transactions) {
        if (transaction.type === 'Credit') {
            count.credit++;
        } else {
            count.debit++;
        }
    }

    return count;
};

function sendCountMenssage() {
    getTransactionsCount();

    console.log(`Você teve ${count.credit} transações de crédito e ${count.debit} transações de débito.`);
};

createTransaction(54.52);
createTransaction(89.57);
createTransaction(120.85);
createTransaction(-20.58);
createTransaction(-30.75);
createTransaction(-50.21);

sendUserMessage();

sendHigherTrasactionMessage('Credit');
sendHigherTrasactionMessage('Debit');

sendCountMenssage();

sendAvarageMessage();