const arrow = document.getElementById('arrow-src')
let count = 0
arrow.addEventListener('click', () => {
    count += 1
    console.log(count)
    if (count % 2 === 0) {
        arrow.src = "https://s2.svgbox.net/hero-solid.svg?color=black&ic=arrow-right"
        toggleNav()
    } else {
        arrow.src = "https://s2.svgbox.net/hero-solid.svg?color=white&ic=arrow-left"
        toggleNav()
    }
})

const app_name = document.getElementById('app-name')
console.log(app_name.textContent)

function toggleNav () {
    const nav = document.querySelector('#nav')
    const ul = document.querySelector('ul')

    nav.classList.toggle('vis-0')
    ul.classList.toggle('vis-1')
    nav.classList.toggle('hide-0')
    ul.classList.toggle('hide-1')
}

let h = document.getElementById('h2');
let c = document.querySelector('#header')
c.addEventListener('mouseover', function(ev){
    h.classList.add('slide-in')
    h.setAttribute('style','position:absolute;')
    h.style.transform += 'translateY('+(ev.clientY-150)+'px)';
    h.style.transform += 'translateX('+(ev.clientX-100)+'px)';
},false);
