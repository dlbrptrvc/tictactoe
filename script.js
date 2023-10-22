let game = {}
game.state = "off"

//get sliding menus
for(let i=1;i<4;i++) {
    window['menubtn'+i.toString()].addEventListener('click', ()=>{
        for(let j=0;j<4;j++){
            window['menudisplay'+j.toString()].style.width = "0px"
        }
        if (i!==2) {window['menudisplay'+i.toString()].style.width = "500px"}
        else if (game.state=="off") {
            menudisplay0.style.width = "500px"
        } else {menudisplay2.style.width = "500px"}
        
    })
}
//set slide to play
menudisplay0.style.width = "500px"

//theme switch
themeSwitchSetup()
themeSwitch.addEventListener('click',()=>{
    if (html.className=='theme-light') {
        html.className = 'theme-dark'
        window.localStorage.setItem('theme','theme-dark')
    } else {
        html.className='theme-light'
        window.localStorage.setItem('theme','theme-light')
    }
    themeSwitchSetup()
})

