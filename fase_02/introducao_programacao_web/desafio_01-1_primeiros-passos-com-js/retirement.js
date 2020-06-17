const name = "Jean";
const gender = "M";
const age = 60;
const contribution = 35;
const contributionCalculation = age + contribution;


/* 
Regras de aposentadoria:
1 - O tempo de contribuição mínimo para homens é de 35 anos e, para mulheres, 30 anos;
2 - A soma da idade com o tempo de contribuição do homem precisa ser de no mínimo 95 anos, 
enquanto a mulher precisa ter no mínimo 85 anos na soma; 
*/

//Retornarão true ou false
const womanCanRetire = gender == 'F' && contribution >= 30 && contributionCalculation >= 85;
const manCanRetire = gender == 'M' && contribution >= 35 && contributionCalculation >= 95;

//

if (manCanRetire || womanCanRetire) {
    console.log(`${name}, você pode se aposentar!`);
} else {
    console.log(`${name}, você não pode se aposentar!`);
};