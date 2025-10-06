function navegarPantallas(pantalla){
    switch(pantalla){
        case "Ryaner": return window.location.href = 'ryaner.html'
        case "Binter": return window.location.href = 'binter.html'
        case "Iberia": return window.location.href = 'iberia.html'
        case "Inicio": return window.location.href = 'index.html'
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
        // Inicializa matriz de asientos (todos libres)
        for (let i = 0; i < rows; i++) {
            this.asientos[i] = [];
            for (let j = 0; j < columns; j++) {
                this.asientos[i][j] = false; // false = libre
            }
        }
    }

    // Guardar asientos en localStorage
    this.guardarEstado = function() {
        localStorage.setItem(`asientos_${this.compañia}`, JSON.stringify(this.asientos));
    };

    // Reservar asiento
    this.reservarAsiento = function (fila, columna) {
        if (!this.asientos[fila][columna]) {
            this.asientos[fila][columna] = true;
            this.guardarEstado();
            return true;
        } else {
            alert("Asiento ya ocupado");
            return false;
        }
    };

    // Liberar asiento
    this.liberarAsiento = function (fila, columna) {
        if (this.asientos[fila][columna]) {
            this.asientos[fila][columna] = false;
            this.guardarEstado();
            return true;
        }
        return false;
    };

    // Mostrar tabla de asientos
    this.mostrarTabla = function () {
        document.write(`<table class="asientos">`);
        for (let i = 0; i < this.rows; i++) {
            document.write("<tr>");
            for (let j = 0; j < this.columns; j++) {
                let clase = "lowcost";
                if (i < 2) clase = "business";
                else if (i < 5) clase = "economica";

                let precioFinal = this.precioBase;
                if (clase === "business") precioFinal *= 2;
                else if (clase === "economica") precioFinal *= 1.5;

                const ocupado = this.asientos[i][j];

                // Convertimos fila a letra (A, B, C...) y columna a número (1, 2, 3...)
                const letraFila = String.fromCharCode(65 + i); // A = 65
                const numeroColumna = j + 1;
                document.write(`
                    <td onclick="toggleReservaAsiento(${i},${j})" class="${clase} ${ocupado ? 'ocupado' : 'libre'}">
                        ${letraFila}${numeroColumna}
                        <br>${precioFinal}€
                    </td>`);
            }
            document.write("</tr>");
        }
        document.write("</table>");
    };
}






let avion = new Avion(6, 45, "Binter", 10)
avion.mostrarTabla();

// Función global para reservar o liberar asiento con toggle
function toggleReservaAsiento(fila, columna) {
    if (!avion.asientos[fila][columna]) {
        // Si está libre, reservar
        if (avion.reservarAsiento(fila, columna)) {
            alert(`Asiento ${String.fromCharCode(65 + fila)}${columna + 1} reservado correctamente.`);
        }
    } else {
        // Si está ocupado, liberar
        if (avion.liberarAsiento(fila, columna)) {
            alert(`Asiento ${String.fromCharCode(65 + fila)}${columna + 1} liberado correctamente.`);
        }
    }
    location.reload(); // Refresca para actualizar visualmente
}