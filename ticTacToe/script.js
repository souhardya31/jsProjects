const X_class = 'x';
const O_class = 'o';
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winning-message')
const winningMessageText = document.querySelector('[data-winning-message-text]')
const restartButton = document.getElementById('restartButton')

let circleTurn;

startGame();

restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_class);
        cell.classList.remove(O_class);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setBoardHoverClass();

    winningMessageElement.classList.remove('show');
}



function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? O_class : X_class;
    placeMark(cell, currentClass);
    //Check for win
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns();
        setBoardHoverClass();
    }
    //Check for draw
    //Switch Turns

}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_class) || cell.classList.contains(O_class);
    })

}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerText = `Match Drawn`;
    } else {
        winningMessageText.innerText = `${circleTurn ? "O" : "X"} Wins!`;
    }
    winningMessageElement.classList.add('show')
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(X_class);
    board.classList.remove(O_class);
    if (circleTurn) {
        board.classList.add('o');
    } else {
        board.classList.add('x');
    }
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}


