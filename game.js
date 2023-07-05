let board; // array of 9 col arrays
let winner; // null = no winner; 1 = winner
let lives; //lives = 5 to start

const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const cellsEls = [...document.querySelectorAll('#board > div')];

document.getElementById('board').addEventListener('click', handleDrop);

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

// in response to UI, update all impacted state, then call render()
function handleDrop(evt) {
    console.log(evt.target);
    
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
            if (cellVal > 0) {
                cellEl.textContent = cellVal;
                cellEl.style.color = 'black';
            } else {
                cellEl.textContent = '';
                cellEl.style.color = 'transparent';               
            }
            cellEl.style.display = 'flex';
            cellEl.style.justifyContent = 'center';
            cellEl.style.alignItems = 'center';
            cellEl.style.fontSize = '4vmin';
        });
    });
}

function renderMessage() {
    messageEl.innerHTML = lives > 0 ? `LIVES: ${lives}` : "You are out of lives."
}

function renderControls() {
    playAgainBtn.style.visibility = winner ? 'visible' : 'hidden';
}

