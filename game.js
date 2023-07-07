let board; // array of 9 col arrays
let gameOver; // null = no winner; 1 = winner
let lives; //lives = 5 to start
let isBoardFull;

const solution = [
    [7, 2, 8, 4, 6, 3, 9, 5, 1], // col 0
    [4, 1, 3, 5, 9, 7, 6, 8, 2], // col 1
    [5, 9, 6, 8, 1, 2, 7, 4, 3], // col 2
    [3, 8, 9, 7, 5, 4, 1, 2, 6], // col 3
    [1, 5, 2, 9, 8, 6, 4, 3, 7], // col 4
    [6, 7, 4, 2, 3, 1, 5, 9, 8], // col 5
    [8, 4, 1, 6, 2, 5, 3, 7, 9], // col 6
    [9, 3, 5, 1, 7, 8, 2, 6, 4], // col 7
    [2, 6, 7, 3, 4, 9, 8, 1, 5], // col 8
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
        [0, 2, 0, 0, 6, 0, 0, 5, 1], // col 0
        [0, 0, 3, 5, 0, 0, 6, 0, 0], // col 1
        [0, 9, 0, 8, 1, 0, 7, 4, 0], // col 2
        [0, 8, 0, 0, 0, 0, 1, 0, 6], // col 3
        [0, 5, 0, 0, 0, 6, 0, 3, 0], // col 4
        [6, 0, 4, 2, 0, 0, 0, 9, 0], // col 5
        [0, 4, 1, 0, 2, 5, 3, 0, 0], // col 6
        [0, 0, 5, 0, 7, 8, 0, 0, 0], // col 7
        [2, 6, 0, 0, 4, 0, 0, 1, 0], // col 8
    ];
    
    gameOver = null;
    lives = 5;
    render();
}


function handlePlayerInput(evt) {
    const cellIdx = evt.target;
    const cellId = cellIdx.id;
    const colIdx = parseInt(cellId.charAt(1));
    const rowIdx = parseInt(cellId.charAt(3));

    if (board[colIdx][rowIdx] === 0) {
        const numberInput = document.getElementById('numberInput');
        const inputValue = parseInt(numberInput.value);
        
        // Check if the input is a valid number between 1 and 9
        if (!isNaN(inputValue) && inputValue >= 1 && inputValue <= 9) {
            // Clear the error message
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = '';

            if (inputValue === solution[colIdx][rowIdx]) {
                board[colIdx][rowIdx] = inputValue;
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
                const gratsMessage = document.getElementById('gratsMessage');
                gratsMessage.textContent = 'Nice job!!';
                gameOver = true;
            }
        } else {
            // Set the error message in the h2 element
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.textContent = 'Please enter a valid number between 1 and 9';
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
    messageEl.innerHTML = lives > 0 ? `LIVES: ${lives}` : 'You are out of lives.'
}

function renderControls() {
    playAgainBtn.style.visibility = gameOver ? 'visible' : 'hidden';
}


