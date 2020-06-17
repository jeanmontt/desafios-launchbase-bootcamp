const name = "Jean";
const weigth = 104;
const heigth = 1.86;
const gender = "M";

const imc = weigth / (heigth * heigth);

if (!(imc >= 30) && imc < 29.9) {
    console.log(`${name}, você não está acima do peso.`)
} else {
    console.log(`${name}, você está acima do peso.`)
}