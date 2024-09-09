const board = document.querySelector(".Memory-Game"); 
const restart = document.getElementById("restart");
const message = document.getElementById("message");

const memorycards = ["A","B","C","D","E","F","G","H"];

// duplicate array elements and count
const total_cards = [...memorycards,...memorycards,];
//console.log(total_cards);

const cardlength = total_cards.length;
//console.log(cardlength);

let firstCard; 
let secondCard;
let count = 0;

CreateCard();

function shuffleArray(arr){
    for (let i = 0; i < cardlength; i++) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]; 
    }
    return arr;
}

function CreateCard(){
    board.innerHTML = "";
    shuffleArray(total_cards).forEach(element => {       
        const CardElement = document.createElement("div");
        CardElement.classList.add("card");

        CardElement.setAttribute("data-name",element);
        CardElement.innerHTML = `${element}`;

        CardElement.addEventListener("click",flipCard);

        board.append(CardElement); 
    });         
}

function flipCard(){   
    if(this === firstCard){           
        return;
    }

    this.classList.add("flipped");

    if(!firstCard){
        firstCard = this;
        return;
    }

    secondCard = this;
    checkMatch();
}

function checkMatch(){
    const cardMatch = firstCard.getAttribute("data-name") === secondCard.getAttribute("data-name");
        
    if(cardMatch){
        firstCard.classList.add("flipped");
        secondCard.classList.add("flipped");

        resetBoard();

        count = count + 1;
        if(count === cardlength / 2){
            message.innerHTML = "Congratulations! You found all pairs.. Restart to Play again";
        }
    }
    else{
        setTimeout(()=>{
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetBoard();
        },1000);
    }
}

function resetBoard(){
    firstCard = null;
    secondCard = null;
}

restart.addEventListener("click", ()=>{
    count = 0;
    resetBoard();
    CreateCard();   
    message.innerHTML = " ";
});