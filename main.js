// dropdown
const dropdowns = document.querySelectorAll('.dropdown');
const audio = document.getElementsByTagName('audio')[0];
const playPauseBTN = document.getElementById('playPauseBTN');
const warning = document.querySelector('.warning');
const control = document.querySelector('.control');
const form = document.querySelector('.form');
let count = 0;

// set up dropdown
dropdowns.forEach(dropdown => {
    const select = dropdown.querySelector('.select');
    const caret = dropdown.querySelector('.caret');
    const menu = dropdown.querySelector('.menu');
    const options = dropdown.querySelectorAll('.menu li');
    const selected = dropdown.querySelector('.selected');
    select.addEventListener('click', () => {
        select.classList.toggle('select-clicked');
        caret.classList.toggle('caret-rotate');
        menu.classList.toggle('menu-open');
    })
    options.forEach(option => {
        option.addEventListener('click', () => {
            selected.innerText = option.innerText;
            select.classList.remove('select-clicked');
            caret.classList.remove('caret-rotate');
            menu.classList.remove('menu-open');
            options.forEach(option => {
                option.classList.remove('active');
            })
            option.classList.add('active');
            let sourceMusic = option.getAttribute('src');
            audio.setAttribute('src', sourceMusic);
            if (!warning.classList.contains('display-none')) {
                warning.classList.add('display-none');
            }
        })
    })
})

// audio
function playPause() {
    if (audio.getAttribute('src')) {
        if (count == 0) {
            count = 1;
            audio.play();
            playPauseBTN.innerHTML = "Pause &#9208;";
        } else {
            count = 0;
            audio.pause();
            playPauseBTN.innerHTML = "Play &#9658;";
        }
    } else {
        warning.classList.remove('display-none');
    }
}

// restart time audio 
function restartAudio() {
    if (count == 1) {
        playPause();
    }
    audio.currentTime = 0;
}

// back to choose screen
function back() {
    let image = document.querySelector('img');
    if (image) {
        image.remove();
        restartAudio();
    }
    form.classList.remove('display-none');
    control.classList.add('display-none');
}

// fetch API Giphy
let APIKEY = "neX9r18pgQs0mqmXOt375kWTawSe9HqO";
document.addEventListener("DOMContentLoaded", init);
function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        if (audio.getAttribute('src')) {
            ev.preventDefault();
            let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=1&q=`;
            let str = document.getElementById("search").value.trim();
            url = url.concat(str);
            fetch(url)
                .then(response => response.json())
                .then(content => {
                    let fig = document.createElement("figure");
                    let img = document.createElement("img");
                    let fc = document.createElement("figcaption");
                    img.src = content.data[0].images.downsized.url;
                    img.alt = content.data[0].title;
                    form.classList.add('display-none');
                    control.classList.remove('display-none');
                    img.classList.add('display-fullscreen');
                    fig.appendChild(img);
                    fig.appendChild(fc);
                    let out = document.querySelector(".out");
                    out.insertAdjacentElement("afterbegin", fig);
                    document.querySelector("#search").value = "";
                    playPause();
                })
                .catch(err => {
                    console.error(err);
                });
        } else {
            warning.classList.remove('display-none');
        }
    });
}