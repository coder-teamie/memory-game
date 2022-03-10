const cardsArray = [
  {
    name: 'fries',
    img: 'images/fries.png',
  },
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png',
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png',
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.png',
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png',
  },
  {
    name: 'pizza',
    img: 'images/pizza.png',
  },
  {
    name: 'fries',
    img: 'images/fries.png',
  },
  {
    name: 'cheeseburger',
    img: 'images/cheeseburger.png',
  },
  {
    name: 'hotdog',
    img: 'images/hotdog.png',
  },
  {
    name: 'ice-cream',
    img: 'images/ice-cream.png',
  },
  {
    name: 'milkshake',
    img: 'images/milkshake.png',
  },
  {
    name: 'pizza',
    img: 'images/pizza.png',
  },
];

cardsArray.sort(() => 0.5 - Math.random());

// ** card arrays **
let cardsChosen = [];
let cardsChosenID = [];
const cardsWon = [];

// select elements
const gridDOM = document.getElementById('grid');
const resultDOM = document.getElementById('result');

// *** create board ***
const createBoard = () => {
  for (let i = 0; i < cardsArray.length; i++) {
    // create card(s)
    const card = document.createElement('img');
    card.setAttribute('src', 'images/blank.png');
    card.setAttribute('data-id', i);
    card.classList.add('card');

    // add event to all cards
    card.addEventListener('click', flipCard);
    gridDOM.append(card);
  }
};

createBoard();

// *** check for match***
const checkMatch = () => {
  // get all cards
  const cards = document.querySelectorAll('img');
  const optionOneID = cardsChosenID[0];
  const optionTwoID = cardsChosenID[1];

  if (cardsChosen[0] === cardsChosen[1]) {
    // prevent duplicate card click
    if (optionOneID === optionTwoID) {
      alert(`You were caught cheating. Game will restart in three seconds.`);

      // restart game
      setTimeout(() => {
        window.location.replace('index.html');
      }, 3000);
    } else {
      cards[optionOneID].setAttribute('src', 'images/white.png');
      cards[optionTwoID].setAttribute('src', 'images/white.png');
      cards[optionOneID].removeEventListener('click', flipCard);
      cards[optionTwoID].removeEventListener('click', flipCard);
      cardsWon.push(cardsChosen);
      alert('Yay! you found match 🎈.');
    }
  } else {
    cards[optionOneID].setAttribute('src', 'images/blank.png');
    cards[optionTwoID].setAttribute('src', 'images/blank.png');
    alert(`Opps, try again! You've got this😉!`);
  }
  resultDOM.innerHTML = cardsWon.length;
  cardsChosen = [];
  cardsChosenID = [];

  // check for all matches
  if (cardsWon.length === cardsArray.length / 2) {
    resultDOM.innerHTML = `Congratulations! You found all ${cardsArray.length} cards. The game will restart in 5 seconds`;

    // restart game
    setTimeout(() => {
      window.location.replace('index.html');
    }, 3000);
  }
};

// *** flipcard ***
function flipCard() {
  // get card data-id
  const cardID = this.getAttribute('data-id');

  // push selected cards into array
  cardsChosen.push(cardsArray[cardID].name);
  cardsChosenID.push(cardID);

  // flip image
  this.setAttribute('src', cardsArray[cardID].img);

  // check length of selected cards
  if (cardsChosen.length === 2) {
    setTimeout(checkMatch, 500);
  }
}
