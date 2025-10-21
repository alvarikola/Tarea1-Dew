const btnIniciar = document.getElementById("btn-iniciar");
const btnGuardar = document.getElementById("btn-guardar");
const btnCargar = document.getElementById("btn-cargar");
const contadorElement = document.getElementById("contador");
const temporizadorElement = document.getElementById("temporizador");
const recordElement = document.getElementById("record");


const imagenOrdenada = [
    "1.jpeg", "2.jpeg", "3.jpeg",
    "4.jpeg", "5.jpeg", "6.jpeg",
    "7.jpeg", "8.jpeg"
];

//para cada posición, qué posiciones son adyacentes
const adyacentes = {
    1: [2, 4],
    2: [1, 3, 5],
    3: [2, 6],
    4: [1, 5, 7],
    5: [2, 4, 6, 8],
    6: [3, 5, 9],
    7: [4, 8],
    8: [5, 7, 9],
    9: [6, 8]
};

let movimientos = 0;
let segundos = 0;
let minutos = 0;
let intervalo = null;
let juegoIniciado = false;

function formatearTiempo(min, seg) {
    return `${String(min).padStart(2, '0')}:${String(seg).padStart(2, '0')}`;
}

function actualizarTemporizador() {
    temporizadorElement.textContent = `Tiempo: ${formatearTiempo(minutos, segundos)}`;
}

function actualizarContador() {
    contador.textContent = `Movimientos: ${movimientos}`;
}

function cargarRecord() {
    const record = localStorage.getItem("record");
    if (record) {
        const [min, seg] = record.split(":").map(Number);
        recordElement.textContent = `Récord: ${formatearTiempo(min, seg)}`;
    } else {
        recordElement.textContent = "Récord: --:--";
    }
}

function guardarRecord(min, seg) {
    const tiempoActual = min * 60 + seg;
    const recordGuardado = localStorage.getItem("record");
    
    if (!recordGuardado) {
        localStorage.setItem("record", `${min}:${seg}`);
        cargarRecord();
        return;
    }

    const [rMin, rSeg] = recordGuardado.split(":").map(Number);
    const tiempoRecord = rMin * 60 + rSeg;

    if (tiempoActual < tiempoRecord) {
        localStorage.setItem("record", `${min}:${seg}`);
        cargarRecord();
    }
}

function iniciarTemporizador() {
    if (intervalo) return; // ya está corriendo

    intervalo = setInterval(() => {
        segundos++;
        if (segundos === 60) {
            segundos = 0;
            minutos++;
        }
        actualizarTemporizador();
    }, 1000);
}

function detenerTemporizador() {
    if (intervalo) {
        clearInterval(intervalo);
        intervalo = null;
    }
}

function shuffle(array) { 
  return array.sort(() => Math.random() - 0.5); 
}

function obtenerPosicionHueco() {
    // El hueco es la celda sin imagen
    for (let i = 1; i <= 9; i++) {
        const celda = document.getElementById(i);
        if (!celda.querySelector("img")) {
            return i;
        }
    }
    return 9; // por defecto
}

function intercambiar(pos1, pos2) {
    const celda1 = document.getElementById(pos1);
    const celda2 = document.getElementById(pos2);

    // Guardar el contenido de ambas celdas
    const contenido1 = celda1.innerHTML;
    const contenido2 = celda2.innerHTML;

    // Intercambiar
    celda1.innerHTML = contenido2;
    celda2.innerHTML = contenido1;
}

function manejarClic(event) {
    // Si clickearon en una imagen, obtenemos su celda padre (td)
    const celda = event.target.closest("td");
    if (!celda) return;

    const posClic = parseInt(celda.id);
    const posHueco = obtenerPosicionHueco();

    // Si ya es el hueco, no hacer nada
    if (posClic === posHueco) return;

    // Verificar si son vecinos
    if (adyacentes[posHueco].includes(posClic)) {
      if (!juegoIniciado) {
            juegoIniciado = true;
            iniciarTemporizador();
      }
      intercambiar(posClic, posHueco);
      movimientos++;
      actualizarContador();
      verificarVictoria();
    }
}

function verificarVictoria() {
    let correcto = true;
    for (let i = 1; i <= 8; i++) {
        const celda = document.getElementById(i);
        const img = celda.querySelector("img");
        if (!img || img.src !== `${i}.jpeg`) {
            correcto = false;
            break;
        }
    }
    if (correcto) {
      detenerTemporizador();
      guardarRecord(minutos, segundos);
      alert(`¡Felicidades! Has resuelto el rompecabezas con ${movimientos} movimientos`);
    }
}

function guardarPartida() {
    const estado = [];
    for (let i = 1; i <= 9; i++) {
        const celda = document.getElementById(i);
        const img = celda.querySelector("img");
        estado.push(img ? img.src.split('/').pop() : null);
    }

    const partida = {
        estado,
        movimientos,
        minutos,
        segundos,
        juegoIniciado
    };

    localStorage.setItem("partidaGuardada", JSON.stringify(partida));
    alert("Partida guardada.");
}

function cargarPartida() {
    const partidaGuardada = localStorage.getItem("partidaGuardada");
    if (!partidaGuardada) {
        alert("No hay partida guardada");
        return;
    }

    const { estado, movimientos: mov, minutos: min, segundos: seg, juegoIniciado: iniciado } = JSON.parse(partidaGuardada);

    // Restaurar tablero
    for (let i = 1; i <= 9; i++) {
        const celda = document.getElementById(i);
        const archivo = estado[i - 1];
        if (archivo) {
            celda.innerHTML = `<img src="${archivo}" alt="${archivo.split('.')[0]}">`;
        } else {
            celda.innerHTML = "";
        }
    }

    // Restaurar estado
    movimientos = mov;
    minutos = min;
    segundos = seg;
    juegoIniciado = iniciado;

    actualizarContador();
    actualizarTemporizador();

    // Si el juego ya había empezado, reanudar temporizador
    if (juegoIniciado) {
        detenerTemporizador(); // por si acaso
        iniciarTemporizador();
    }

    // Reasignar eventos
    document.querySelectorAll("td").forEach(td => {
        td.removeEventListener("click", manejarClic);
        td.addEventListener("click", manejarClic);
    });

    alert("Partida cargada.");
}

function iniciar() {
    detenerTemporizador();

    movimientos = 0;
    segundos = 0;
    minutos = 0;
    juegoIniciado = false;

    actualizarContador();
    actualizarTemporizador();

    // Limpiar eventos
    document.querySelectorAll("td").forEach(td => {
        td.removeEventListener("click", manejarClic);
    });

    // Desordenar
    const imagenDesordenada = shuffle([...imagenOrdenada]);

    for (let i = 1; i <= 8; i++) {
        const celda = document.getElementById(i);
        celda.innerHTML = `<img src="${imagenDesordenada[i - 1]}" alt="${i}">`;
    }
    document.getElementById(9).innerHTML = "";

    // Reasignar eventos
    document.querySelectorAll("td").forEach(td => {
        td.addEventListener("click", manejarClic);
    });
}


btnIniciar.addEventListener("click", iniciar);
btnGuardar.addEventListener("click", guardarPartida);
btnCargar.addEventListener("click", cargarPartida);