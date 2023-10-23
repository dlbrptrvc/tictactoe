//gen player class
function Player(type,tiles) {
    this.type = type||'human'
    this.tiles = tiles||[]
}

//gen game class and currentGame
function Game(board) {
    this.board = board||[[[],[],[]],[[],[],[]],[[],[],[]]]
    this.player = [new Player('human'),new Player('human')]
    this.turn = 0
    this.state = 'off'
    this.piece = ['x','o']
    this.winCheck = function () {
        let result = 'playing'
        let winsit = [['0,0','0,1','0,2'],['1,0','1,1','1,2'],['2,0','2,1','2,2'],
        ['0,0','1,0','2,0'],['0,1','1,1','2,1'],['0,2','1,2','2,2'],
        ['0,0','1,1','2,2'],['0,2','1,1','2,0']];
        for (let j=0;j<8;j++){
            if (winsit[j].every(i=>this.player[this.turn].tiles.includes(i))) {
                result = 'Player '+(this.turn+1)+' wins!'
            }
        }
        let alltiles = this.player[0].tiles.concat(this.player[1].tiles)
        if (result=='playing' && alltiles.length==9) {
            result = "It's a draw..."
        }
        return result
    }
}
let currentGame = new Game()

//declare victory
function declare(msg) {
    menudisplay0.style.width = "500px"
    menudisplay0.style.backgroundColor = 'var(--color-secondary-a)'
    playmsg.textContent = msg
    ++gamesplayedstat.textContent
    if (msg.includes('1')) {
        ++xwonstat.textContent
    }
    if (msg.includes('2')) {
        ++owonstat.textContent
    }
}

//get sliding menus
for(let i=1;i<4;i++) {
    window['menubtn'+i.toString()].addEventListener('click', ()=>{
        for(let j=0;j<4;j++){
            window['menudisplay'+j.toString()].style.width = "0px"
        }
        if (i!==2) {window['menudisplay'+i.toString()].style.width = "500px"}
        else if (currentGame.state=="off") {
            menudisplay0.style.width = "500px"
        } else if (currentGame.state=='over') {
            menudisplay2.style.width = "500px"
            menudisplay0.style.width = "500px"
        } else {menudisplay2.style.width = "500px"}
        
    })
}
//set slide to play
menudisplay0.style.width = "500px"

//theme switch
themeSwitch.addEventListener('click',()=>{
    if (html.className=='theme-light') {
        html.className = 'theme-dark'
        window.localStorage.setItem('theme','theme-dark')
    } else {
        html.className='theme-light'
        window.localStorage.setItem('theme','theme-light')
    }
})

//setup board click dynamic
for (let i=0;i<3;i++){
    for (let j=0;j<3;j++){
        window['boardTile'+i.toString()+j.toString()].addEventListener('click',(event)=>{
            if (currentGame.state=='on' && currentGame.board[i][j].length==0
            && currentGame.player[currentGame.turn].type=='human') {
                currentGame.board[i][j]=currentGame.turn
                event.target.textContent = currentGame.piece[currentGame.turn]
                currentGame.player[currentGame.turn].tiles.push([i,j].toString())
                let status = currentGame.winCheck()
                if (status !== 'playing') {
                    currentGame.state = 'over'
                    declare(status)
                }
                currentGame.turn = (currentGame.turn+1)%2
            }
        })
    }
}

//allow ingame settings change
let radios = Array.from(document.querySelectorAll('input'))
radios.forEach((item)=>{
    item.addEventListener('click',()=>{
        currentGame.player[0].type = document.querySelector('input[name="p1radio"]:checked').value
        currentGame.player[1].type = document.querySelector('input[name="p2radio"]:checked').value        
    })
})

// initialize game
playbtn.addEventListener('click',()=>{
    currentGame = new Game()
    currentGame.player[0].type = document.querySelector('input[name="p1radio"]:checked').value
    currentGame.player[1].type = document.querySelector('input[name="p2radio"]:checked').value
    currentGame.state = 'on'
//display board
    Array.from(boardDisplay.querySelectorAll('*')).forEach(item=>item.textContent = '')
    playmsg.textContent = ''
    menudisplay0.style.backgroundColor = 'var(--color-secondary)'
    menubtn2.click()
})


