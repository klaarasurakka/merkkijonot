const input = document.querySelector('input');
const output = document.querySelector('output');
const span = document.querySelector('span');

const words = [
    "programming",
    "javascript",
    "database",
    "markup",
    "framework",
    "variable",
    "stylesheet",
    "library",
    "asynchronous",
    "hypertext"
];

let randomizeWord = '';
let maskedWord = '';
let guesses = 0;

const newGame = () => {
    const random = Math.floor(Math.random() * words.length);
    randomizeWord = words[random];
    maskedWord = "*".repeat(randomizeWord.length);
    console.log(randomizeWord);
    output.innerHTML = maskedWord;
    guesses = 0;
    span.innerHTML = guesses;
};

const win = () => {
    alert(`You have guessed right, the word is ${randomizeWord}.It took you ${guesses} guesses.`);
    newGame ();
};

const replaceFoundChars = (guess) => {
    let newString = maskedWord.split('');
    let found = false;

    for (let i = 0; i < randomizeWord.length; i++) {
        const char = randomizeWord[i];
        if (char.toLowerCase() === guess.toLowerCase()) {
            if (newString[i] === '*') { // Update only if it's still a '*'
                newString[i] = char;
                found = true;
            }
        }
    }

    maskedWord = newString.join('');
    output.innerHTML = maskedWord;
    return found;
};

newGame();

input.addEventListener('keypress',(e) => {
    if (e.key === 'Enter') {
        e.preventDefault(); 

        const guess = input.value;

        guesses++;
        span.innerHTML = guesses;

        if (guess.toLowerCase() === randomizeWord.toLowerCase()) {
            win();
        } else if (guess.length === 1) {
            const found = replaceFoundChars(guess);
            if (maskedWord.toLowerCase() === randomizeWord.toLowerCase()){
                win();
            } else if (!found) {
                alert("You guessed wrong!");
            }
        } else {
            alert("You guessed wrong!");
        }
        input.value='';
    }
});