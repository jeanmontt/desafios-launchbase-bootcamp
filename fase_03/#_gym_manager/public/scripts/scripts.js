//lógica para menu dinâmico
const currentPage = location.pathname;  //rota atual da página
const menuItems = document.querySelectorAll("header .links a");

for (item of menuItems) {       //para cada item do menuItems
    if (currentPage.includes(item.getAttribute("href"))) {     //se a página conter o value do href do item incluida
        item.classList.add("active");       //adiciona a classe active ao item
    }       
}

//lógica para confirmar exclusão de dados
const formDelete = document.querySelector("#form-delete");

formDelete.addEventListener("submit", function(event) {     //escuta o submit e executa a função
    const confirmation = confirm("Confirma a exclusão do cadastro?");   //envia a mensagem de confirmação e salva como boolean na variável
    if (!confirmation) {    //se não há confirmação
        event.preventDefault();     ///cancela o padrão do evento (deletar o cadastro)
    }
})