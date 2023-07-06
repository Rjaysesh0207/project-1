let board; // array of 9 col arrays
let winner; // null = no winner; 1 = winner
let lives; //lives = 5 to start

const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const cellsEls = [...document.querySelectorAll('#board > div')];

document.getElementById('board').addEventListener('click', handlePlayerInput);

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

// in response to user intaract, update all impacted state, then call render()
function handlePlayerInput(evt) {
    const cellIdx = evt.target;
    // id the cell
    const cellId = cellIdx.id;
    // colIdx
    const colIdx = parseInt(cellId.charAt(1));
    // rowIdx
    const rowIdx = parseInt(cellId.charAt(3));

    // check if the cell is empty aka 0
    if (board[colIdx][rowIdx] === 0) {
        let input;
        do {
            input = prompt('Enter your number(1-9): ')
        } while (input !== null && (isNaN(parseInt(input)) || parseInt(input) < 1 || parseInt(input) > 9));

        //make sure the input is a valid number
        if (input !== null) {
            const number = parseInt(input);
            board[colIdx][rowIdx] = number;            
        }
    }
    // update the board state with cur player value

    console.log(cellIdx);
    
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

