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

    // undraw a piece


    undraw() {
        this.fill(vacant);
    }

    // move Down the piece

    moveDown(){
    if(!this.collision(0,1,this.activeTetromino)){
        this.undraw();
        this.y++;
        this.draw();
    }else{
        // we lock the piece and generate a new one
        this.lock();
        p = randomPiece();
    }
    
}

    // move Right the piece
    moveRight() {
        if (!this.collision(1, 0, this.activeTetromino)) {
            this.undraw();
            this.x++;
            this.draw();
        }
    }

    // move Left the piece
    moveLeft() {
        if (!this.collision(-1, 0, this.activeTetromino)) {
            this.undraw();
            this.x--;
            this.draw();
        }
    }

    // rotate the piece
    rotate() {
        let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
        let kick = 0;

        if (this.collision(0, 0, nextPattern)) {
            if (this.x > column / 2) {
                // it's the right wall
                kick = -1; // we need to move the piece to the left
            } else {
                // it's the left wall
                kick = 1; // we need to move the piece to the right
            }
        }

        if (!this.collision(kick, 0, nextPattern)) {
            this.undraw();
            this.x += kick;
            this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length; // (0+1)%4 => 1
            this.activeTetromino = this.tetromino[this.tetrominoN];
            this.draw();
        }
    }
}


// random pieces

function randomPiece() {
    let r = randomN = Math.floor(Math.random() * pieces.length) // 0 -> 6
    return new Piece(pieces[r][0], pieces[r][1]);
}

let p = randomPiece();


// CONTROL the piece

document.addEventListener("keydown",control);

function control(event){
    if(event.keyCode == 37){
        p.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        p.rotate();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        p.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        p.moveDown();
    }
}

