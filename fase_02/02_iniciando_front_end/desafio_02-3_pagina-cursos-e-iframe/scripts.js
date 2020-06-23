const modalOverlay = document.querySelector('.modal-overlay');
const cards = document.querySelectorAll('.card');
const modal = document.querySelector('#modal');
const classes = modal.classList;



for (let card of cards) {
    card.addEventListener("click", function() {
        const pageID = card.getAttribute("id");
        modalOverlay.classList.add('active');
        modalOverlay.querySelector('iframe').src = `https://rocketseat.com.br/${pageID}`;
    })
};

document.querySelector('.close-modal').addEventListener("click", function() {
    modalOverlay.classList.remove('active');
    modal.classList.remove('maximize');
    modalOverlay.querySelector('iframe').src = "";
});

document.querySelector('.maximize-modal').addEventListener('click', function(){
    let result = classes.toggle("maximize");

    if (result) {
        modal.classList.add('maximize');
    } else {
        modal.classList.remove('maximize');
    }
})