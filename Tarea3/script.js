const celdas = document.querySelectorAll("td");
const boton = document.querySelector("button");
const tabla = document.querySelector("table");

 
const imagenOrdenada = [
    "1.jpeg", "2.jpeg", "3.jpeg",
    "4.jpeg", "5.jpeg", "6.jpeg",
    "7.jpeg", "8.jpeg", "9.jpeg"
]

function shuffle(array) {
  array.sort(() => Math.random() - 0.5);
}

let imagenDesordenada = shuffle(imagenOrdenada);

function iniciar() {
    boton.addEventListener('click', function() {
            alert("FIRST EVENT LISTENER"); 
        }); //Event listener
}


iniciar()