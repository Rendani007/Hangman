'use strict'; //so that you dont use undeclared variables by mistake

//capture all divisions and buttons
const letterDiv = document.querySelector('.letter-div');
const hintButton = document.querySelector('.hint-btn');
const resetButton = document.querySelector('.reset-btn');
const hintDiv = document.querySelector('.hint-div');
const hintText = document.querySelector('.hint-txt');
const liveSpan = document.querySelector('.lives');
const wordDiv = document.querySelector('.word-div');
const notif = document.querySelector('.notif');
const notifContent = document.querySelector('.notif-content');
const notifSpan = document.querySelector('.notif-span');
const playAgain = document.querySelector('.notif-btn');

//Letters
let letters;

//lives
let lives;

//Map(similar to array but with key and value pair) that will hold the word and its hint
const words = new Map([
    ['test','an event students prepare for'],
    ['exam','a similar word other than test'],
    ['supply', 'a word other than provide']
]);

//spread operator to get the keys from the Map above
const word_list = [...words.keys()];

//select any random word from the keys using M.f(M.r) * length of keys.
const getRandomWord = function (list) {
    return list[Math.floor(Math.random() * word_list.length)];
}

//random word will be selected upon every reset
let select_word;

const init = function (state) {
    wordDiv.innerHTML = '';
    if (state === 'start') {
        //adding all letters in HTML
        for (const i of 'abcdefghijklmnopqrstuvwxyz') {
            const html = `<button class = "alpha">${i.toUpperCase()}</button>`;
            letterDiv.insertAdjacentHTML('beforeend', html);
        }
    } else if (state === 'reset') {
        letters.foreach(btn => {
            btn.classList.remove('disabled');
        });
        hintDiv.classList.add('hidden');
        notif.classList.add('hidden');
    }
    lives = 5;
    //capturing letters div
    letters = document.querySelectorAll('.alpha');
    liveSpan.textContent = lives;
    
    //getting the random keyword
    select_word = getRandomWord(word_list);
    //adding selected word
    for (let i = 0; i < select_word.length; i++){
        const html = `<p class="word">_</p>`;
        wordDiv.insertAdjacentHTML('beforeend', html);
    }
};

init('start');

//check word function to check if word is completed or not
const checkWord = function () {
    let val = true;
    for (let i = 0; i < wordDiv.children.length; i++) {
        if (wordDiv.children[i].textContent === '_') {
            val = false;
        }
    }
    return val;
};

//defining the get index
//getting multiple matches for pressed letter
const getindexes = function (letter) {
    let indexes = [];
    [...select_word].forEach((val, i) => {
        if (val === letter) {
            const index = i;
            indexes.push(index);
        }
      
    });
    //logs indexes
    return indexes;
};

//show notification function (You Won)
const showNotif = function (msg) {
    notif.classList.remove('hidden');
    notifSpan.textContent = select_word;
    notifContent.textContent = `You ${msg}`;
}

//decrease life count function
const decreaseLife = function () {
    lives--;
    
    liveSpan.textContent = lives;
    if (lives === 0) {
        showNotif('lost');
    }
};

//function of letterpress
const letterPress = function () {
    const letter = this.textContent.toLowerCase();

    //if letter is present in the word
    if (select_word.includes(letter)) {
        const indexes_list = getindexes(letter);
        indexes_list.forEach((val, i) => {
            //adding the value in its respective index
            wordDiv.children[val].textContent = this.textContent;
        });
        //check the word if it is completed
        if (checkWord()) showNotif('won');

    } else {
        decreseLife();
    }
    this.classList.add('dissabled');

};
    
//capturing the button press
letters.foreach(btn => {
    btn.addEventListener('click', letterPress);
});

//Listening to Hint
hintButton.addEventListener('click', function () {
    hintDiv.classList.remove('hidden');
    hintText.textContent = words.get(select_word);
});

//Listening to Reset
resetButton.addEventListener('click', function () {
    init('reset');
});

//Listening to Play Again
playAgain.addEventListener('click', function () {
    init('reset');
});

