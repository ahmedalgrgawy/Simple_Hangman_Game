const letters = 'abcdefghijklmnopqrstuvwxyz';

let lettersArray = Array.from(letters);

let lettersContainer = document.querySelector(".letters");

// Generate the letters

lettersArray.forEach(l => {

    let span = document.createElement("span");

    let letter = document.createTextNode(l);

    span.appendChild(letter);

    span.className = 'letter-box';

    lettersContainer.appendChild(span);

});

// Object of Words

const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
};

// Random Categories

let allKeys = Object.keys(words);

// Random Num Foe Category 
let randomCatNum = Math.floor(Math.random() * allKeys.length);

// Category Random Name
let randomCatName = allKeys[randomCatNum];

// Category Random Value
let randomCatValue = words[randomCatName];

// Random Num For Values Of The Category
let randomCatValueNum = Math.floor(Math.random() * randomCatValue.length);

// Random Category Word
let randomCatValueWord = randomCatValue[randomCatValueNum];

// Set Category Info
let wordSpan = document.querySelector(".category span");
wordSpan.innerHTML = randomCatName;

// =======================================================

let lettersGuessContainer = document.querySelector(".letters-guess");

// Convert the word ro array of letters
let lettersAndSpace = Array.from(randomCatValueWord);

// create span of the letters
lettersAndSpace.forEach(l => {

    let emptyspan = document.createElement('span');

    if (l === ' ') {

        // add space class
        emptyspan.className = 'SpaceLetter';
    }

    // add span to guess container

    lettersGuessContainer.appendChild(emptyspan);

});

// =======================================================

// Handle Clicking on Letters

let guessSpans = document.querySelectorAll(".letters-guess span");

let wrongCounter = 0;

let theDraw = document.querySelector('.hangman-draw')

document.addEventListener('click', (e) => {

    if (e.target.className === 'letter-box') {

        // add clicked class
        e.target.classList.add("clicked");

        // the clicked letter
        let chosenLetter = e.target.innerHTML.toLowerCase();

        // the chosen random word
        let chosenWord = Array.from(randomCatValueWord.toLowerCase());

        // set statues
        let statue = false;

        // looping the word letters
        chosenWord.forEach((wordLetter, wordIndex) => {

            // checking the match
            if (chosenLetter === wordLetter) {

                // setting the status to true
                statue = true;

                // Loop The Span and check the indexing
                guessSpans.forEach((span, spanIndex) => {

                    if (wordIndex === spanIndex) {

                        // adding the letter to the square (span)
                        span.innerHTML = wordLetter;

                    }

                })

            }
        });


        if (statue !== true) {

            // increase the wrong counter
            wrongCounter++;

            // add class wrong
            theDraw.classList.add(`Wrong-${wrongCounter}`)

            document.getElementById("fail").play();


            if (wrongCounter === 8) {

                lettersContainer.classList.add("finished");

                endGame();

            }

        } else {

            document.getElementById("success").play();
        }

    }



});

// End Game Fun
function endGame() {

    // Pop
    let PopUp = document.createElement('div');

    // text of popup
    let PopUpTxt = document.createTextNode(`Game Over, The Word Is ${randomCatValueWord}`);

    // add txt to popup
    PopUp.appendChild(PopUpTxt);

    // class .popup
    PopUp.className = "popup";

    // add popup to body
    document.body.appendChild(PopUp);

}