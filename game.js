// this is just an example until I can find the logic to make cellEl the players input
const COLOR = {
    '0': 'white',
    '1': 'purple'
}

let board; // array of 9 col arrays
let winner; // null = no winner; 1 = winner
let lives; //lives = 5 to start

const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');

init();

function init() {
    // 90 degree flip counter clockwise is my board
    board = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 0, 0, 0, 0, 0, 0, 0], // col 1
        [0, 0, 0, 0, 0, 0, 0, 0, 0], // col 2
        [0, 0, 0, 0, 0, 0, 0, 0, 0], // col 3
        [0, 0, 0, 0, 0, 0, 0, 0, 0], // col 4
        [0, 0, 0, 0, 0, 0, 0, 0, 0], // col 5
        [0, 0, 0, 0, 0, 0, 0, 0, 0], // col 6
        [0, 0, 0, 0, 0, 0, 0, 0, 0], // col 7
        [0, 0, 0, 0, 0, 0, 0, 0, 0], // col 8
    ];
    winner = null;
    lives = 5;
    render();
}

// visualize all state in the DOM
function render() {
    renderBoard();
    renderMessage();
    // hide/show UI elements()
    renderControls();
}

function renderBoard() {
    board.forEach(function(colArr, colIdx) {
        colArr.forEach(function(cellVal, rowIdx) {
            const cellId = `c${colIdx}r${rowIdx}`;
            const cellEl = document.getElementById(cellId);
            // need logic to make cellEl the players input value this is just color example
            cellEl.style.backgroundColor = COLOR[cellVal];
        });
    });
}

function renderMessage() {
    messageEl.innerHTML = lives > 0 ? `LIVES: ${lives}` : "You are out of lives."
}

function renderControls() {
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}