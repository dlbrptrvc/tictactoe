let html = document.querySelector('html')
let prefered = window.localStorage.getItem('theme')
if (prefered) {
    html.className=prefered
} else {
    html.className='theme-light'
}