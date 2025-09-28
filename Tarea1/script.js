// Función para pedir un número entero válido
function pedirEntero(mensaje) {
    let valor;
    while (true) {
        valor = prompt(mensaje);
        if (valor === null || valor.trim() === "") {
            alert("No puedes dejar el campo vacío");
        } else if (isNaN(valor)) {
            alert("Introduce un número");
        } else if (!Number.isInteger(parseFloat(valor))) {
            alert("Introduce un número entero, no decimales");
        } else {
            return parseInt(valor);
        }
    }
}

// Función para pedir un color válido para el semáforo
function pedirColorSemaforo() {
    let color;
    while (true) {
        color = prompt("¿Qué color tiene el semáforo? (rojo, amarillo o verde)");
        if (!color) {
            alert("No puedes dejar el campo vacío");
        } else {
            color = color.toLowerCase().trim();
            if (["rojo", "amarillo", "verde"].includes(color)) {
                return color;
            } else {
                alert("Debes introducir rojo, amarillo o verde");
            }
        }
    }
}

// Solicitar valores con validación
var numTiendas = pedirEntero("¿Cuántas tiendas hay?");
var numDeTienda = pedirEntero("¿Qué número tiene la primera tienda?");
var numCoches = pedirEntero("¿Cuántos coches hay?");
var colorSemaforo = pedirColorSemaforo();
var hora = prompt("¿Qué hora es?");

var nombresTiendas = ["Game", "Zara", "Hiperdino", "Mercadona", "Burger King", "McDonald's", "Worten", "Electron"];

// Pinta el cartel para cada tienda
document.write("<div class='contenedorCartel'>");
console.log("Generando carteles");
for (let n = 0; n < numTiendas; n++) {
    document.write("<div class='cartel'>");
    document.write("<div class='nombre'>" + (nombresTiendas[n % nombresTiendas.length]) + "</div>");
    document.write("<img src='imagenCartel.jpg' alt='Imagen de cartel'>");
    document.write("</div>");
}
document.write("</div>");

// Pinta el número de cada tienda
document.write("<div class='contenedorNumPuerta'>");
console.log("Generando numPuerta");
for (let n = 0; n < numTiendas; n++) {
    document.write("<div class='numPuerta'>" + numDeTienda + "</div>");
    numDeTienda += 2;
}
document.write("</div>");

// Pinta la tienda
document.write("<div class='imagenTienda'>");
console.log("Generando tienda");
for (let n = 0; n < numTiendas; n++) {
    document.write("<img src='imagenTienda.jpg' alt='Imagen de tienda'>");
}
document.write("</div>");

// Pinta el semáforo con su respectivo color y el reloj
switch (colorSemaforo) {
    case "rojo":
        document.write("<img src='semaforoRojo.png' alt='Imagen de semáforo'>");
        break;
    case "amarillo":
        document.write("<img src='semaforoAmarillo.png' alt='Imagen de semáforo'>");
        break;
    case "verde":
        document.write("<img src='semaforoVerde.png' alt='Imagen de semáforo'>");
        break;
}
document.write("<div class='reloj'>");
document.write("<div class='hora'>" + hora + "</div>");
document.write("<img src='imagenReloj.png' alt='Imagen de reloj'>");
document.write("</div>");

// Pinta los coches
document.write("<div class='contenedorCoche'>");
for (let n = 0; n < numCoches; n++) {
    console.log("Generando coche");
    document.write("<img src='imagenCoche.png' alt='Imagen de coche'>");
}
document.write("</div>");