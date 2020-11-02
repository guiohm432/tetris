const cvs = document.getElementById("tetris")
const ctx = cvs.getContext("2d")
const SQ = 20

function drawSquare (x,y,color) {
    ctx.fillStyle = color
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ)
    ctx.strokeStyle = "black"
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ)
}

drawSquare(2,1,"blue")