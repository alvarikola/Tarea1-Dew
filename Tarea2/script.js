// Navegar entre pantallas
function navegarPantallas(pantalla) {
    switch (pantalla) {
        case "Ryanair": return window.location.href = 'ryanair.html';
        case "Binter": return window.location.href = 'binter.html';
        case "Iberia": return window.location.href = 'iberia.html';
        case "Inicio": return window.location.href = 'index.html';
    }
}


// Clase Avion
function Avion(rows, columns, compañia, precioBase) {
    this.rows = rows;
    this.columns = columns;
    this.compañia = compañia;
    this.precioBase = precioBase;
    this.asientos = [];

    const storedAsientos = localStorage.getItem(`asientos_${this.compañia}`);

    if (storedAsientos) {
        this.asientos = JSON.parse(storedAsientos);
    } else {
        // Inicializar matriz de asientos (todos libres)
        for (let i = 0; i < rows; i++) {
            this.asientos[i] = [];
            for (let j = 0; j < columns; j++) {
                this.asientos[i][j] = false; // false = libre
            }
        }
    }

    // Guardar asientos en localStorage
    this.guardarEstado = function () {
        localStorage.setItem(`asientos_${this.compañia}`, JSON.stringify(this.asientos));
    };

    // Mostrar tabla de asientos
    this.mostrarTabla = function () {
        document.write('<table class="asientos">');
        for (let i = 0; i < this.rows; i++) {
            document.write("<tr>");
            for (let j = 0; j < this.columns; j++) {

                let clase = "lowcost";
                if (j < 2) clase = "business";
                else if (j < 5) clase = "economica";

                let precioFinal = this.precioBase;
                if (clase === "business") precioFinal *= 2;
                else if (clase === "economica") precioFinal *= 1.5;

                let estado = this.asientos[i][j];
                let ocupado = estado === "reservado" || estado === "comprado";

                let letraFila = String.fromCharCode(65 + i);
                let numeroColumna = j + 1;

                let extraClase = ocupado ? 'ocupado' : 'libre';
                if (estado === "comprado") extraClase += " comprado";

                const onclickAttr = estado === "comprado"
                    ? ""
                    : `onclick="toggleReservaAsiento(${i},${j}, ${precioFinal})"`;

                document.write(`
                    <td ${onclickAttr} class="${clase} ${extraClase}">
                        ${letraFila}${numeroColumna}
                        <br>${precioFinal}€
                    </td>`);
            }
            document.write("</tr>");
        }
        document.write("</table>");
    };
}

let avion;
let precioTotal = 0;

function cargarPrecioTotal() {
    const almacenado = localStorage.getItem('precioTotal');
    if (almacenado) {
        precioTotal = parseFloat(almacenado);
    } else {
        precioTotal = 0;
    }
}

function guardarPrecioTotal() {
    localStorage.setItem('precioTotal', precioTotal.toString());
}

// Actualizar el precio total
function actualizarPrecio() {
    const contenedorPrecio = document.getElementById('precioTotal');
    contenedorPrecio.textContent = `Precio total: ${precioTotal}€`;
    guardarPrecioTotal();
}

// Crear avión
function crearAvion(filas, columnas, compañia, precio) {
    if (compañia == "Ryanair" || compañia == "Binter" || compañia == "Iberia") {
        avion = new Avion(filas, columnas, compañia, precio);
        avion.mostrarTabla();
        precioTotal = 0;
        cargarPrecioTotal();
        actualizarPrecio();
    } else {
        alert("Introduce una compañía válida");
    }
}

// Reservar o liberar asiento
function toggleReservaAsiento(fila, columna, precioFinal) {
    const estado = avion.asientos[fila][columna];

    if (estado === false) {
        avion.asientos[fila][columna] = "reservado";
        precioTotal += precioFinal;
        alert(`Asiento ${String.fromCharCode(65 + fila)}${columna + 1} reservado.`);
    } 
    else if (estado === "reservado") {
        avion.asientos[fila][columna] = false;
        precioTotal -= precioFinal;
        alert(`Asiento ${String.fromCharCode(65 + fila)}${columna + 1} liberado.`);
    }

    avion.guardarEstado();
    actualizarPrecio();
    location.reload();
}


// Confirmar compra
function terminar() {
    let respuesta = prompt("¿Confirmar compra? (si o no)");

    if (respuesta.toLowerCase().trim() == "si") {
        for (let i = 0; i < avion.rows; i++) {
            for (let j = 0; j < avion.columns; j++) {
                if (avion.asientos[i][j] === "reservado") {
                    avion.asientos[i][j] = "comprado";
                }
            }
        }

        avion.guardarEstado();

        // Reiniciar precio
        localStorage.removeItem('precioTotal');
        precioTotal = 0;
        actualizarPrecio();

        alert("Compra finalizada");
        navegarPantallas("Inicio");
    }
    else if (respuesta.toLowerCase().trim() == "no") {
        alert("Sigue seleccionando tus asientos");
    }
    else {
        alert("Introduce una respuesta válida");
    }
}
