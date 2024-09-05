const cards = document.querySelector(".cards");
const reset = document.getElementById("restart");

const memorycards = ["A","B","C"];

// duplicate array elements and count
const total_cards = [...memorycards, ...memorycards];
//console.log(total_cards);

const cardlength = total_cards.length;
//console.log(cardlength);

let firstCard, secondCard;
let cardFlipped = false; 

let revealCount = 0;
let activeBox = null;



//Creating card 
function createcard(card){
    const div = document.createElement("div");
    div.classList.add("card");
    div.setAttribute("data-name",card);
    div.setAttribute("data-opened", "false");


    div.addEventListener("click", ()=>{
        div.innerHTML = `${card}`;
        div.setAttribute("class","flipped");
        //div.classList.add("flipped");


    });

    reset.addEventListener("click",resetcards);

    return div;
}

function resetcards(){
   console.log("hello");
   
}



//careating card in webpage
for(let i = 0; i < cardlength; i++){
    const randomIndex = Math.floor(Math.random() * total_cards.length);
    const card = total_cards[randomIndex];
    const box = createcard(card);
    total_cards.splice(randomIndex,1);
    cards.append(box);

    /* const card = total_cards[i];
    const box = createcard(card);
    cards.append(box); */
}


