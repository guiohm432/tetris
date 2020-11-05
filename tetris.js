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

    constructor(tetromino, color) {
        this.tetromino = tetromino;
        this.color = color;
        this.tetrominoN = 0; // we start from the first pattern
        this.activeTetromino = this.tetromino[this.tetrominoN];

        // pieces first location above the canvas
        this.x = 3;
        this.y = -2;
    }

    collision(x, y, piece) {
        for (let r = 0; r < piece.length; r++) {
            for (let c = 0; c < piece.length; c++) {
                // if the square is empty, we skip it
                if (!piece[r][c]) {
                    continue;
                }
                // coordinates of the piece after movement
                let newX = this.x + c + x;
                let newY = this.y + r + y;

                // conditions
                if (newX < 0 || newX >= column || newY >= row) {
                    return true;
                }
                // skip newY < 0; board[-1] will crush our game
                if (newY < 0) {
                    continue;
                }
                // check if there is a locked piece already in place
                if (board[newY][newX] != vacant) {
                    return true;
                }
            }
        }
        return false;
    }

    // fill function

    fill(color) {
        for (let r = 0; r < this.activeTetromino.length; r++) {
            for (let c = 0; c < this.activeTetromino.length; c++) {
                // we draw only occupied squares
                if (this.activeTetromino[r][c]) {
                    drawSquare(this.x + c, this.y + r, color);
                }
            }
        }
    }

    // draw a piece to the board

    draw() {
        this.fill(this.color);
    }


}

// random pieces

function randomPiece() {
    let r = randomN = Math.floor(Math.random() * pieces.length) // 0 -> 6
    return new Piece(pieces[r][0], pieces[r][1]);
}

let p = randomPiece();
console.log(p)
