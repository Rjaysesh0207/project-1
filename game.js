let board; // array of 9 col arrays
let winner; // null = no winner; 1 = winner

init();

function init() {
    // 90 degree flip counter clockwise is my board
    board = [
        [0, 0, 0, 0, 0, 0, 0, 0], // col 0
        [0, 0, 0, 0, 0, 0, 0, 0], // col 1
        [0, 0, 0, 0, 0, 0, 0, 0], // col 2
        [0, 0, 0, 0, 0, 0, 0, 0], // col 3
        [0, 0, 0, 0, 0, 0, 0, 0], // col 4
        [0, 0, 0, 0, 0, 0, 0, 0], // col 5
        [0, 0, 0, 0, 0, 0, 0, 0], // col 6
        [0, 0, 0, 0, 0, 0, 0, 0], // col 7
        [0, 0, 0, 0, 0, 0, 0, 0], // col 8
    ];
    winner = null;
    render();
}

function render() {
    
}