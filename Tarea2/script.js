function navegarPantallas(pantalla){
    switch(pantalla){
        case "Ryaner": return window.location.href = 'ryaner.html'
        case "Binter": return window.location.href = 'binter.html'
        case "Iberia": return window.location.href = 'iberia.html'
        case "Inicio": return window.location.href = 'index.html'
    }
}



//Declarar un objeto
var Avion = function(rows, columns, compañia, price) {
    this.rows = rows;
    this.columns = columns;
    this.compañia = compañia;
    this.price = price;
    this.asiento = [];
    document.write("<div class='avion'>");
    for (let r = 0; r < rows; r++) {
        document.write("<div class='filas'>");
        this.asiento[r] = [];
        for (let c = 0; c < columns; c++) {
            document.write("<div class=''>" + c + "</div>")
            this.asiento[r][c] = false;
        }
        document.write("</div>");
    }
    document.write("</div>");
    this.reservar =function() {
        console.log("Buy Theatre ticket "+this.price+" €");
    };
    this.liberar =function() {
        console.log("Buy Theatre ticket "+this.price+" €");
    };
}

let avion1 = new Avion(4, 45, "binter", 10);


