const cvs = document.getElementById("tetris")
const ctx = cvs.getContext("2d")
const sq = 20

function drawSquare(x, y, color) {
    ctx.fillStyle = color
    ctx.fillRect(x * sq, y * sq, sq, sq)
    ctx.strokeStyle = "blacƒƒk"
    ctx.strokeRect(x * sq, y * sq, sq, sq)
}


const row = 20
const column = 10
const vacant = "white"
let board = []

for (let r = 0; r < row; r++) {
    board[r] = []
    for (let c = 0; c < column; c++) {
        board[r][c] = vacant
    }
}

function drawBoard() {
    for (let r = 0; r < row; r++) {
        for (let c = 0; c < column; c++) {
            drawSquare(c, r, board[r][c])
        }
    }
}

drawBoard()

// the pieces and their colors

const pieces = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];


class Piece {

    constructor (tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;
        this.tetrominoN = 0; // we start from the first pattern
        this.activeTetromino = this.tetromino[this.tetrominoN];

        // pieces first location above the canvas
        this.x = 3;
        this.y = -2;
    }

}

// random pieces

function randomPiece() {
    let r = randomN = Math.floor(Math.random() * pieces.length) // 0 -> 6
    return new Piece(pieces[r][0], pieces[r][1]);
}

let p = randomPiece();
