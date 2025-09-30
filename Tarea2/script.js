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
    for (let r = 0; r < numRows; r++) {
        this.asiento[r] = [];
        for (let c = 0; c < numCols; c++) {
            this.asiento[r][c] = true;
        }
    }
    this.reservar =function() {
        console.log("Buy Theatre ticket "+this.price+" €");
    };
    this.liberar =function() {
        console.log("Buy Theatre ticket "+this.price+" €");
    };
}




