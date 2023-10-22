let html = document.querySelector('html')
let prefered = window.localStorage.getItem('theme')
if (prefered) {
    html.className=prefered
} else {
    html.className='theme-light'
}

function themeSwitchSetup() {
    prefered = window.localStorage.getItem('theme')
    if (prefered=="theme-light") {
        themeSwitch.style.backgroundImage = "url(images/moon.png)"
    } else {themeSwitch.style.backgroundImage = "url(images/sun.png)"}
}