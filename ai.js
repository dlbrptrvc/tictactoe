let aiOnTheMove = 0

function runAIDUMB(game) {
    aiOnTheMove++
    let x = 0
    let y = 0
    let empty = false
    do {
        x = Math.floor(Math.random()*3)
        y = Math.floor(Math.random()*3)
        if (game.board[x][y].length==0) {empty=true}
    } while (!empty)
    setTimeout(()=>{
        placeMark(x,y,game)
        aiOnTheMove--
    },900)
}


function runAISMART(somegame) {
    let status = somegame.winCheck()
    let toplay = currentGame.turn
    if (status!=='playing'){
        if (status.includes((toplay+1).toString())){
            return 1
        } else if (status.includes((((toplay+1)%2)+1).toString())){
            return -1
        } else {
            return 0
        }
    } else {
//get posible moves and default values
        let posmov = []
        let notmov = somegame.player[0].tiles.concat(somegame.player[1].tiles)
        for(let i=0;i<3;i++){
            for(let j=0;j<3;j++) {
                if (!notmov.includes([i,j].toString())) {
                    posmov.push([[i,j].toString(),1])
                }
            }
        }
// get move values
        posmov.forEach(move=>{
            let newGame = new Game
            newGame.turn = somegame.turn
            newGame.player[0].type = somegame.player[0].type
            newGame.player[1].type = somegame.player[1].type
            newGame.player[0].tiles = newGame.player[0].tiles.concat(somegame.player[0].tiles)
            newGame.player[1].tiles = newGame.player[1].tiles.concat(somegame.player[1].tiles)
            newGame = placeMarkAI(move[0].split(',')[0],move[0].split(',')[1],newGame)
            move[1] = runAISMART(newGame)
        })
// select the best move
        if (somegame.turn==currentGame.turn) {
            posmov.sort((a,b) => {return (b[1]-a[1])})
        } else {
            posmov.sort((a,b) => {return (a[1]-b[1])})
        }
        
        if (somegame===currentGame) {
            setTimeout(()=>{
                placeMark(posmov[0][0].split(',')[0],posmov[0][0].split(',')[1],currentGame)
            },500)
        }
        return posmov[0][1]
    }

}

function placeMarkAI(a,b,gm) {
    gm.player[gm.turn].tiles.push([a,b].toString())
    gm.turn = (gm.turn+1)%2
    return gm
}