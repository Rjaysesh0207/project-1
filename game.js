let board; // array of 9 col arrays
let gameOver; // null = no winner; 1 = winner
let lives; //lives = 5 to start

const solution = [
    [1, 2, 8, 5, 9, 7, 6, 4, 3], // col 0
    [4, 3, 5, 8, 6, 2, 7, 9, 1], // col 1
    [9, 6, 7, 1, 4, 3, 8, 2, 5], // col 2
    [8, 5, 6, 3, 2, 9, 1, 7, 4], // col 3
    [2, 4, 3, 7, 5, 1, 9, 6, 8], // col 4
    [7, 9, 1, 4, 8, 6, 3, 5, 2], // col 5
    [3, 8, 4, 6, 7, 5, 2, 1, 9], // col 6
    [6, 7, 2, 9, 1, 8, 4, 3, 6], // col 7
    [5, 1, 9, 2, 3, 4, 5, 8, 7], // col 8
]
const messageEl = document.querySelector('h1');
const playAgainBtn = document.querySelector('button');
const cellsEls = [...document.querySelectorAll('#board > div')];



playAgainBtn.addEventListener('click', init);
document.getElementById('board').addEventListener('click', handlePlayerInput);

init();

function init() {
    // 90 degree flip counter clockwise is my board
    board = [
        [0, 2, 0, 0, 9, 0, 0, 4, 3], // col 0
        [0, 0, 5, 8, 0, 0, 7, 0, 0], // col 1
        [0, 6, 0, 1, 4, 0, 8, 2, 0], // col 2
        [0, 5, 0, 0, 0, 0, 1, 0, 4], // col 3
        [0, 4, 0, 0, 0, 1, 0, 6, 0], // col 4
        [7, 0, 1, 4, 0, 0, 0, 5, 0], // col 5
        [0, 8, 4, 0, 7, 5, 2, 0, 0], // col 6
        [0, 0, 2, 0, 1, 8, 0, 0, 0], // col 7
        [5, 1, 0, 0, 3, 0, 0, 8, 0], // col 8
    ];
    
    gameOver = null;
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


    // update the board state with cur player value
    // check if the cell is empty aka 0
    if (board[colIdx][rowIdx] === 0) {
        let input;
        do {
            input = prompt('Enter your number (1-9');
        } while (input !== null && (isNaN(parseInt(input)) || parseInt(input) < 1 || parseInt(input) > 9));
        if (input !== null) {
            const number = parseInt(input);
            if (number === solution[colIdx][rowIdx]) {
                board[colIdx][rowIdx] = number;
            } else {
                lives -= 1;
            }
            let isBoardFull = true;
            for (let colArr of board) {
                if (colArr.includes(0)) {
                    isBoardFull = false;
                    break;
                }
            }

            if (isBoardFull) {
                gameOver = true;
            }
        }

        if (lives === 0) {
            gameOver = true;
        }           
    }

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
            cellEl.style.cursor = 'pointer';
        });
    });
}

function renderMessage() {
    messageEl.innerHTML = lives > 0 ? `LIVES: ${lives}` : "You are out of lives."
}

function renderControls() {
    playAgainBtn.style.visibility = gameOver ? 'visible' : 'hidden';
}


