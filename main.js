const toggle = document.querySelector('header img');
const body = document.querySelector('body');
const main = document.querySelector('main');
const menu = document.querySelector('#menu');
const navegacion = document.querySelector('.navegacion');
const cierre = document.querySelector('#close');
const elementos = document.querySelectorAll('.hidden');
const translate = document.querySelector('#translater');

//Cargando Traducciones
translate.addEventListener('click', reloadTranslations)

async function reloadTranslations() {
    let language = localStorage.getItem('traduction') || translate.textContent
    const response = await fetch("translations.json");
    const data = await response.json();

    //Traducir pagina
    translatePage(language, data);
}

const textColors = {
    "databases":"Bases De Datos:",
    "project-description": "App de veterinaria donde puede gestionar los pacientes contando con registro, login y recuperacion de clave",
    "project2-description":"App de blog con registro, login y recuperacion de clave",
    "project3-description":"Busca la temperatura del pais con su pais y capital",
    "project4-description":"Convertir a los visitantes en clientes mediante compaña de marketing o publicidad",
    "date":"2023 - Febrero",
    "data2":"2023 - Agosto",
    "data3":"2024 - Febrero",
    "date4":"2024 - Septiembre"
}

function translatePage(language, data){
    let traduction = localStorage.getItem('traduction') || translate.textContent
    document.querySelectorAll("[data-key]").forEach((element) => {
        //Transicion
        element.classList.add("fade-out");
        setTimeout(()=> {
            const key = element.getAttribute("data-key");
            if (data[language][key]) {
                if (textColors[key]) {
                    element.innerHTML = `<span class='colors'>${data[language][key]}</span>`;
                    element.classList.remove("fade-out");
                    element.classList.add("fade-in");
                    setTimeout(()=> {
                        element.classList.remove("fade-in");
                    },600);
                    return;
                }
                element.innerHTML = data[language][key];
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

menu.addEventListener('click', () => {
    navegacion.style.width = "200px";
})

main.addEventListener('click', () => {
    navegacion.style.width = "0";
    navegacion.style = "none";
})

