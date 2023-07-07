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
const boxes =  [
[
    solution[0][0], solution[0][1], solution[0][2],
    solution[1][0], solution[1][1], solution[1][2],
    solution[2][0], solution[2][1], solution[2][2]
],
[
    solution[0][3], solution[0][4], solution[0][5],
    solution[1][3], solution[1][4], solution[1][5],
    solution[2][3], solution[2][4], solution[2][5]
],
[
    solution[0][6], solution[0][7], solution[0][8],
    solution[1][6], solution[1][7], solution[1][8],
    solution[2][6], solution[2][7], solution[2][8]
],
[
    solution[3][0], solution[3][1], solution[3][2],
    solution[4][0], solution[4][1], solution[4][2],
    solution[5][0], solution[5][1], solution[5][2]
],
[
    solution[3][3], solution[3][4], solution[3][5],
    solution[4][3], solution[4][4], solution[4][5],
    solution[5][3], solution[5][4], solution[5][5]
],
[
    solution[3][6], solution[3][7], solution[3][8],
    solution[4][6], solution[4][7], solution[4][8],
    solution[5][6], solution[5][7], solution[5][8]
],
[
    solution[6][0], solution[6][1], solution[6][2],
    solution[7][0], solution[7][1], solution[7][2],
    solution[8][0], solution[8][1], solution[8][2]
],
[
    solution[6][3], solution[6][4], solution[6][5],
    solution[7][3], solution[7][4], solution[7][5],
    solution[8][3], solution[8][4], solution[8][5]
],
[
    solution[6][6], solution[6][7], solution[6][8],
    solution[7][6], solution[7][7], solution[7][8],
    solution[8][6], solution[8][7], solution[8][8]
],
];

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
            cellEl.textContent = cellVal > 0 ? cellVal : '';
            cellEl.style.color = cellVal > 0 ? 'black' : 'transparent';
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


