function runAIDUMB(game) {
    let x = 0
    let y = 0
    let empty = false
    do {
        x = Math.floor(Math.random()*3)
        y = Math.floor(Math.random()*3)
        if (game.board[x][y].length==0) {empty=true}
    } while (!empty)
    setTimeout(()=>{placeMark(x,y,game)},900)
}