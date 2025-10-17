const boton = document.querySelector("button");

const imagenOrdenada = [
    "1.jpeg", "2.jpeg", "3.jpeg",
    "4.jpeg", "5.jpeg", "6.jpeg",
    "7.jpeg", "8.jpeg"
];

function shuffle(array) { 
  return array.sort(() => Math.random() - 0.5); 
}

function iniciar() {
  const imagenDesordenada = shuffle([...imagenOrdenada]);
  
  for(let i=1; i <= imagenDesordenada.length; i++) {
    const celda = document.getElementById(i);
    const img = celda.querySelector("img");
    img.src = imagenDesordenada[i - 1];
  }
}


boton.addEventListener("click", iniciar);