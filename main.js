const toggle = document.querySelector('header img');
const body = document.querySelector('body');
const main = document.querySelector('main');
const menu = document.querySelector('#menu');
const navegacion = document.querySelector('.navegacion');
const cierre = document.querySelector('#close');
const elementos = document.querySelectorAll('.hidden');
const translate = document.querySelector('#translater');


// Imagenes de los iconos
let moon = '/public/FamiconsMoon.svg';
let light = '/public/IconoirSunLight.svg';
let icon = localStorage.getItem('url');

load();

//Cargando Traducciones
translate.addEventListener('click', reloadTranslations)


async function reloadTranslations() {
    let language = localStorage.getItem('traduction') || translate.textContent
    const response = await fetch("translations.json");
    const data = await response.json();

    //Traducir pagina
    translatePage(language, data);
}

function translatePage(language, data){
    let traduction = localStorage.getItem('traduction') || translate.textContent

    document.querySelectorAll("[data-key]").forEach((element) => {

        //Transicion
        element.classList.add("fade-out");

        setTimeout(()=> {
            const key = element.getAttribute("data-key");
            if (data[language][key]) {
                element.textContent = data[language][key];
            }

            element.classList.remove("fade-out");
            element.classList.add("fade-in");

            setTimeout(()=> {
                element.classList.remove("fade-in");
            },600);
        },600)
    });

    if(traduction == "En"){
        translate.textContent = "Es"
        localStorage.setItem("traduction", "Es");
        return;
    }
    translate.textContent = "En"
    localStorage.setItem("traduction", "En")
}

const handleScroll = () => {
    elementos.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add('show');
        }
    });
};

window.addEventListener('scroll', handleScroll);


window.addEventListener('DOMContentLoaded', () => {
    console.log(toggle.src);
    
    toggle.src = icon == moon ? moon : light;
})

toggle.addEventListener('click', () => {
    const url = localStorage.getItem('url') || toggle.src.slice(21)

    body.classList.toggle('darkmode');
    store(body.classList.contains('darkmode'));
    if (url == light) {
        toggle.src = moon;
        storeImage('/public/FamiconsMoon.svg');
    }
    if (url == moon) {
        toggle.src = light
        storeImage('/public/IconoirSunLight.svg');
    }
})

function storeImage(value) {
    localStorage.setItem('url', value);
}

function load() {
    const darkmode = localStorage.getItem('darkmode');
    if (!darkmode) {
        store(false);
    }
    if (darkmode == 'true') {
        body.classList.add('darkmode');
    }
}

function store(value) {
    localStorage.setItem('darkmode', value);
}

menu.addEventListener('click', () => {
    navegacion.style.width = "200px";
})

main.addEventListener('click', () => {
    navegacion.style.width = "0";
    navegacion.style = "none";
})

