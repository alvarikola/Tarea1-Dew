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

// para cada posición, qué posiciones son adyacentes
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
    // usar la variable correcta
    contadorElement.textContent = `Movimientos: ${movimientos}`;
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
    // versión simple que por lo menos evita dejarlo ya ordenado
    let arr = array.slice();
    do {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        // mantener bucle si por casualidad quedó igual que imagenOrdenada
    } while (arr.every((val, idx) => val === imagenOrdenada[idx]));
    return arr;
}

function obtenerPosicionHueco() {
    for (let i = 1; i <= 9; i++) {
        const celda = document.getElementById(i);
        if (!celda.querySelector("img")) {
            return i;
        }
    }
    return 9;
}

function intercambiar(pos1, pos2) {
    const celda1 = document.getElementById(pos1);
    const celda2 = document.getElementById(pos2);

    const contenido1 = celda1.innerHTML;
    const contenido2 = celda2.innerHTML;

    celda1.innerHTML = contenido2;
    celda2.innerHTML = contenido1;
}

function manejarClic(event) {
    const celda = event.target.closest("td");
    if (!celda) return;

    const posClic = parseInt(celda.id, 10);
    const posHueco = obtenerPosicionHueco();

    if (posClic === posHueco) return;

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
        // comparo el src tal y como está en el atributo (no la URL absoluta)
        const src = img ? img.getAttribute('src') : null;
        if (!img || src !== `${i}.jpeg`) {
            correcto = false;
            break;
        }
    }
    // la casilla 9 debe estar vacía
    const celda9 = document.getElementById(9);
    if (celda9.querySelector("img")) correcto = false;

    if (correcto) {
        detenerTemporizador();
        guardarRecord(minutos, segundos);
        juegoIniciado = false;
        // desactivar clicks para evitar más movimientos
        document.querySelectorAll("td").forEach(td => td.removeEventListener("click", manejarClic));
        alert(`¡Felicidades! Has resuelto el rompecabezas con ${movimientos} movimientos en ${formatearTiempo(minutos, segundos)}.`);
    }
}

function guardarPartida() {
    const estado = [];
    for (let i = 1; i <= 9; i++) {
        const celda = document.getElementById(i);
        const img = celda.querySelector("img");
        estado.push(img ? img.getAttribute('src') : null);
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

    for (let i = 1; i <= 9; i++) {
        const celda = document.getElementById(i);
        const archivo = estado[i - 1];
        if (archivo) {
            celda.innerHTML = `<img src="${archivo}" alt="${archivo.split('.')[0]}">`;
        } else {
            celda.innerHTML = "";
        }
    }

    movimientos = mov;
    minutos = min;
    segundos = seg;
    juegoIniciado = iniciado;

    actualizarContador();
    actualizarTemporizador();

    if (juegoIniciado) {
        detenerTemporizador();
        iniciarTemporizador();
    }

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

    document.querySelectorAll("td").forEach(td => {
        td.addEventListener("click", manejarClic);
    });
}

/* ---------- UTILIDADES PARA PROBAR RÁPIDO ---------- */
/* Añade un botón "Auto-resolver" y "Casi-resuelto" para probar la detección de victoria. */
function crearBotonesPrueba() {
    const container = document.createElement('div');
    container.style.margin = '8px 0';

    const btnAuto = document.createElement('button');
    btnAuto.textContent = 'Auto-resolver (prueba)';
    btnAuto.addEventListener('click', autoResolver);

    const btnCasi = document.createElement('button');
    btnCasi.textContent = 'Casi resuelto (1 movimiento)';
    btnCasi.addEventListener('click', dejarCasiResuelto);

    container.appendChild(btnAuto);
    container.appendChild(document.createTextNode(' '));
    container.appendChild(btnCasi);

    document.body.appendChild(container);
}

function autoResolver() {
    // Pone el tablero en estado resuelto y fuerza la comprobación de victoria
    for (let i = 1; i <= 8; i++) {
        const celda = document.getElementById(i);
        celda.innerHTML = `<img src="${i}.jpeg" alt="${i}">`;
    }
    document.getElementById(9).innerHTML = "";
    movimientos = 0;
    minutos = 0;
    segundos = 0;
    actualizarContador();
    actualizarTemporizador();
    verificarVictoria();
}

function dejarCasiResuelto() {
    // Estado resuelto salvo que las posiciones 7 y 8 estén intercambiadas (requiere 1 movimiento)
    for (let i = 1; i <= 8; i++) {
        const celda = document.getElementById(i);
        celda.innerHTML = `<img src="${i}.jpeg" alt="${i}">`;
    }
    // intercambiamos 8 y 7 para dejar 1 movimiento posible
    const temp = document.getElementById(8).innerHTML;
    document.getElementById(8).innerHTML = "";
    document.getElementById(9).innerHTML = temp;

    movimientos = 0;
    minutos = 0;
    segundos = 0;
    actualizarContador();
    actualizarTemporizador();
}

/* ---------- FIN UTILIDADES ---------- */

btnIniciar.addEventListener("click", iniciar);
btnGuardar.addEventListener("click", guardarPartida);
btnCargar.addEventListener("click", cargarPartida);

//cargarRecord();
//crearBotonesPrueba();
