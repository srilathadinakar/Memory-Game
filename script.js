const cards = document.querySelector(".cards");
const reset = document.getElementById("restart");

const memorycards = ["A","B","C","A","B","C"];

// duplicate array elements and count
const total_cards = [...memorycards];
const cardlength = total_cards.length;

let firstCard, secondCard;
let lockBoard = false;
let count = 0;

function createCard(card) {
    
    for (let i = card.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [card[i], card[j]] = [card[j], card[i]];
    }
    return card;
}

function gameBorad(){
    createCard(memorycards).forEach(card => {
        
        const divelement = document.createElement("div");
        divelement.classList.add("card");
        
        //divelement.setAttribute("data-name",card);
        divelement.dataset.name = card;       
        divelement.innerText = `${card}`;

        //divelement.setAttribute("data-revealed","false");

        divelement.addEventListener('click', flipCard);

        cards.append(divelement);

    })
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    
    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}
        
function checkMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;
    if (isMatch) {
        disableCards();
        count = count + 1;
   } 
    else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

const resetBoard = () => {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

document.getElementById("restart").addEventListener('click', () => restartGame());

const restartGame = () => {
    count = 0;
    resetBoard();
    gameBorad();
}         

gameBorad();