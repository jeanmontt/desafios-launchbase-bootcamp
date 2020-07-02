const cards = document.querySelectorAll(".card");       //seleciona todos os cards

for (let card of cards) {
    card.addEventListener("click", function() {         //escuta o evento click e executa função
        const urlID = card.getAttribute("id");          //pega o atributo id do card

    window.location.href = `/courses/${urlID}`          //redireciona o usuário para a página do curso específico
    })
}