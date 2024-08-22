let randomNumber;
let guessesLeft;
let difficulty;

document.getElementById('easy').addEventListener('click', () => startGame(10, 'easy'));
document.getElementById('medium').addEventListener('click', () => startGame(5, 'medium'));
document.getElementById('hard').addEventListener('click', () => startGame(3, 'hard'));

document.getElementById('submitGuess').addEventListener('click', checkGuess);

function startGame(guesses, level) {
    guessesLeft = guesses;
    difficulty = level;
    randomNumber = Math.floor(Math.random() * 100) + 1;
    document.getElementById('message').textContent = `You have ${guessesLeft} guesses left. Good luck!`;
    document.getElementById('guessInput').value = '';
    document.body.className = level; // Change body class based on difficulty
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    if (isNaN(guess) || guess < 1 || guess > 100) {
        document.getElementById('message').textContent = 'Please enter a number between 1 and 100.';
        return;
    }

    guessesLeft--;

    if (guess === randomNumber) {
        showConfetti();
        Swal.fire({
            title: '🎉 Congratulations!',
            text: 'You guessed it right!',
            icon: 'success',
            confirmButtonText: 'Play Again'
        }).then(() => {
            resetGame();
        });
    } else if (guessesLeft === 0) {
        Swal.fire({
            title: '😢 Oops!',
            text: `You used all your guesses. The correct number was ${randomNumber}.`,
            icon: 'error',
            confirmButtonText: 'Play Again'
        }).then(() => {
            resetGame();
        });
    } else {
        const hint = guess < randomNumber ? 'too low' : 'too high';
        document.getElementById('message').textContent = `Your guess is ${hint}. You have ${guessesLeft} guesses left.`;
    }
}

function showConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function resetGame() {
    document.getElementById('message').textContent = '';
    document.getElementById('guessInput').value = '';
}
