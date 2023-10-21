//get sliding menus
for(let i=1;i<4;i++) {
    window['menubtn'+i.toString()].addEventListener('click', ()=>{
        for(let i=1;i<4;i++){
            window['menudisplay'+i.toString()].style.width = "0px"
        }
        window['menudisplay'+i.toString()].style.width = "500px"
    })
}

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

