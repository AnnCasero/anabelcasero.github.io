const url = 'https://japceibal.github.io/japflix_api/movies-data.json'
const container = document.getElementById('lista')
const buscador = document.getElementById('inputBuscar')


function fetchData(funcion, url) {
    try {
        return fetch(url)
            .then(response => response.json())
            .then(data => {
                funcion(data);
            })
    } catch {
        console.log("Error");
    };
};

function stars(data) {
    estrellas = Math.round((data.vote_average) * 0.625)
    let starsToAppend = ""
    for (let i = 0; i < estrellas; i++) {
        starsToAppend += `<span class="fa fa-star checked"></span>`;
    };
    for (let i = 0; i < 5 - estrellas; i++) {
        starsToAppend += `<span class="fa fa-star" style="color: white"></span>`;
    };
    return starsToAppend;
};

function mostrarDatos(data) {
    let htmlContentToAppend = ''
    // for (const movie of data) 
    for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        htmlContentToAppend += `
        <li class="movie list-group-item rounded bg-transparent border border-secondary cursor-active" data-title='${data[i].title}' data-tagline='${data[i].tagline}' data-genres='${data[i].genres}' data-overview='${data[i].overview}' hidden>
        <div class="row">
          <div class="col-6">
            <h5 style="color: white"><strong>${data[i].title}</strong></h5>
          </div>
          <div class="col-2 offset-md-4">
            ${stars(data[i])}
          </div>
        </div>
        <div class="row">
          <h5 class="text-muted"><i>${data[i].tagline || ' '}</i></h5>
        </div>
        </li>
        ` }
    container.innerHTML = htmlContentToAppend
}
window.onload = () => {
    fetchData(mostrarDatos, url)
}

function busqueda(e) { // *el parámetro data no se utilizaba, probé a borrarlo aquí y en la escucha y no se rompió nada, por lo que podemos concluir que no era necesario.
    if (e.target.matches("#inputBuscar")) {
        const Movies = document.querySelectorAll(".movie");
        coincidencias = false
        Movies.forEach(movie => {
            if (movie.dataset.title.toLowerCase().includes(e.target.value.toLowerCase()) || movie.dataset.tagline.toLowerCase().includes(e.target.value.toLowerCase())
            || movie.dataset.genres.toLowerCase().includes(e.target.value.toLowerCase()) || movie.dataset.overview.toLowerCase().includes(e.target.value.toLowerCase())) {
                movie.removeAttribute("hidden");
                coincidencias = true
            } else {
            movie.setAttribute("hidden", "");
            };
        });
    };
    if (buscador.value === null || buscador.value === "") {
        mostrarDatos
    }
};
// function filterOn(element) {
//     element.setAttribute("hidden","");
//   };
//   function filterOff(element){
//     element.removeAttribute("hidden");
//   };
    buscador.addEventListener("keyup", e=> {
        fetchData(busqueda(e), url)
    })
