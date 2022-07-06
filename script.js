const cardContainer = document.querySelector('.card-container');
const addNoteBtn = document.querySelector('.add-note');

addNoteBtn.addEventListener('click', createCard);


updateUI();


function updateUI() {
    const editBtns = document.querySelectorAll('.edit-btn');
    const removeBtns = document.querySelectorAll('.remove-btn'); 

    editBtns.forEach(editBtn => editBtn.addEventListener('click', editCard));
    removeBtns.forEach(removeBtn => removeBtn.addEventListener('click', removeCard));
}

function createCard() {
    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `
        <div class="card-header">
            <button class="btn edit-btn">
                <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="btn remove-btn">
                <i class="fa-solid fa-trash-can"></i>
            </button>
        </div>
        <div class="card-content">
            <textarea id="textarea"></textarea>
        </div>
    `;

    cardContainer.appendChild(card);

    updateUI();

    setToLocalStorage();
}

function editCard(e) {

    let activeCard = '';
    let currentText = '';

    if(e.target.classList.contains('fa-solid')){
        activeCard = e.target.parentElement.parentElement.parentElement;
    } else {
        activeCard = e.target.parentElement.parentElement;
    }
    
    if(!activeCard.querySelector('#textarea')) {
    
        currentText = activeCard.querySelector('.card-content').children[0].innerText;

        activeCard.querySelector('.card-content').innerHTML = `
            <textarea id="textarea">${currentText}</textarea>
        `;
    } else {

        currentText = activeCard.querySelector('.card-content').children[0].value;

        activeCard.querySelector('.card-content').innerHTML = `
            <p>${currentText}</p>
        `;
    }
    setToLocalStorage();
}

function removeCard(e) {
    
    const activeCard = e.target.parentElement.parentElement.parentElement;

    activeCard.remove();
    
    setToLocalStorage();
}

function setToLocalStorage() {
    const data = document.querySelector('.card-container').innerHTML;

    localStorage.setItem('content', data);
}

function getFromLocalStorage() {
    const data = localStorage.getItem('content');

    cardContainer.innerHTML = data;

    updateUI();
}

getFromLocalStorage();
