var numTiendas = prompt ("¿Cuátas tiendas hay?")
var numDeTienda = prompt ("¿Qué número tiene la primera tienda?")
var nombresTiendas = ["Game", "Zara", "Hiperdino", "Mercadona", "Burger King", "McDonald's", "Worten", "Electron"]

//Pinta el cartel para cada tienda
document.write("<div class='contenedorCartel'>")
console.log("Generando carteles")
for (let n = 0; n < numTiendas; n++) {
  document.write("<div class='cartel'>");
  document.write("<div class='nombre'>" + nombresTiendas[n] + "</div>");
  document.write("<img src='imagenCartel.jpg' alt='Imagen de cartel'>");
  document.write("</div>");
}
document.write("</div>")


//Pinta el numero de cada tienda
document.write("<div class='contenedorNumPuerta'>")
console.log("Generando numPuerta")
for (let n=0; n < numTiendas; n++) {
    document.write("<div class='numPuerta'>" + numDeTienda + "</div>")
    numDeTienda = parseInt(numDeTienda) + 2
} 
document.write("</div>")


//Pinta la tienda
document.write("<div class='imagenTienda'>")
console.log("Generando tienda")
for (let n=0; n < numTiendas; n++) {
    document.write("<img src='imagenTienda.jpg' alt='Imagen de tienda'>")
} 
document.write("</div>")


var colorSemaforo = prompt ("¿Qué color tiene el semáforo?")
var hora = prompt("¿Qué hora es?")

//Pinta el semáforo con su respectivo color y el reloj
switch (colorSemaforo) {
  case "rojo":
    document.write("<img src='semaforoRojo.png' alt='Imagen de semáforo'>");
    console.log (colorSemaforo);
    break;
  case "amarillo":
    document.write("<img src='semaforoAmarillo.png' alt='Imagen de semáforo'>");
    console.log (colorSemaforo);
    break;
  case "verde":
    document.write("<img src='semaforoVerde.png' alt='Imagen de semáforo'>");
    console.log (colorSemaforo);
    break;
  default:
    document.write("No se encuentra el color");
    console.log (colorSemaforo);
}
document.write("<div class='reloj'>");
document.write("<div class='hora'>" + hora + "</div>")
document.write("<img src='imagenReloj.png' alt='Imagen de reloj'>");
document.write("</div>")


var numCoches = prompt ("¿Cuántos coches hay?");

//Pinta los coches
document.write("<div class='contenedorCoche'>")
for (let n=0; n < numCoches; n++) {
    console.log("Generando coche")
    document.write("<img src='imagenCoche.png' alt='Imagen de coche'>")
} 
document.write("</div>")
