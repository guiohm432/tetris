const cvs = document.getElementById("tetris")
const ctx = cvs.getContext("2d")
const sq = 20

function drawSquare (x,y,color) {
    ctx.fillStyle = color
    ctx.fillRect(x*sq,y*sq,sq,sq)
    ctx.strokeStyle = "black"
    ctx.strokeRect(x*sq,y*sq,sq,sq)
}


const row = 20
const column = 10
const vacant = "white"
let board = []

for (let r=0; r<row; r++){
    board[r] = []
    for (let c=0; c<column; c++){
        board[r][c] = vacant
    }
}

function drawBoard(){
    for (let r=0; r<row; r++){
        for (let c=0; c<column; c++){
            drawSquare(c,r,board[r][c])
        }
    }
}

drawBoard()

// the pieces and their colors

const pieces = [
    [Z,"red"],
    [S,"green"],
    [T,"yellow"],
    [O,"blue"],
    [L,"purple"],
    [I,"cyan"],
    [J,"orange"]
];