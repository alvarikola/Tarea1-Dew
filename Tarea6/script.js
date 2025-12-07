// Expresiones regulares
const patterns = {
    nombre: /^[A-ZÁÉÍÓÚÜ][a-záéíóúü\d]+$/,
    apellido: /^[A-ZÁÉÍÓÚÜ][a-záéíóúü]+(?:\s[A-ZÁÉÍÓÚÜ][a-záéíóúü]+)?$/,
    dni: /^[x]*\d{8}[a-zA-Z]$/,
    fecha: /^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/,
    cp: /^([0-4][0-9]|5[0-2])(\d{3})$/,
    correo: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/,
    telefono: /^([89]\d{2}(\s?\d{2}){3})$/,
    movil: /^([67]\d{2}(\s?\d{2}){3})$/,
    iban: /[a-zA-Z]{2}[0-9]{20}$/,
    tarjeta: /^(\d{4}[\s]?){3}\d{4}$/,
    contrasena: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$?¡_\-\*])[A-Za-z\d@$?¡_\-\*]{12,}$/
};

// Objeto del formulario
const formulario = {
  nombre: "",
  apellido: "",
  dni: "",
  fecha: "",
  cp: "",
  correo: "",
  telefono: "",
  movil: "",
  iban: "",
  tarjeta: "",
  contrasena: ""
};

// Elementos del html (inputs y botones)
const inputs = document.querySelectorAll('input, .normales');
const contrasenas = document.querySelectorAll('.contrasena');
const botonRecuperarJson = document.querySelector('#recuperarJson');
const botonGuardarPhp = document.querySelector('#guardarPhp')
const botonRecuperarPhp = document.querySelector('#recuperarPhp')
const botonGuardarDb = document.querySelector('#guardarDb');
const botonRecuperarDb = document.querySelector('#recuperarDb');



// Recorrer los inputs uno por uno
inputs.forEach((input) => {

  // Controlar el comportamiento por defecto al pulsar tecla
  input.addEventListener('beforeinput', (e) => e.preventDefault());
  input.addEventListener('keydown',teclea);

  function teclea(evento){
    let key = evento.key;

    // Solo teclas de un carácter
    if (key.length === 1) { 
      input.value += key;
    } else if (key === 'Backspace') {
      // Borrar la última letra
      input.value = input.value.slice(0, -1);
    }
  }

  // Validar cada input con diferentes métodos:
  input.addEventListener('keyup', (e) => { 
    // Para todos los inputs comparando que la expresion regular tenga el mismo nombre
    validate(e.target, patterns[e.target.attributes.name.value]);

    console.log(contrasenas[0].value);
    console.log(contrasenas[1].value);

    // Para el repetir contraseña comprando si el valor de las dos contraseñas es el mismo
    if(contrasenas[1].value == contrasenas[0].value) {
      contrasenas[1].className = 'valido';
    } else {
      contrasenas[1].className = 'invalido';
    }

    // Guardar el valor en el objeto formulario
    if (formulario.hasOwnProperty(e.target.name)) {
        formulario[e.target.name] = e.target.value;
    }

  });
});

// Función de validación 'validate' para validar el valor del campo del formulario (variable 'campo') utilizando la expresión regular (variable 'regex').  
function validate(campo, regex) {
    // El método 'test' comprueba que el valor del campo recibido (e.target) cumple la expresión regular recibida (patterns[e.target.attributes.name.value]) como parámetros  
    if(regex.test(campo.value)) {
      campo.className = 'valido';
    } else {
      campo.className = 'invalido';
    }
}

// Función para rellenar el formulario
function rellenarFormulario(datos) {
    for (let campo in datos) {
        let input = document.querySelector(`input[name="${campo}"]`);
        if (input) {
            input.value = datos[campo];
            formulario[campo] = datos[campo];

            // validar cada campo
            if (patterns[campo]) {
                validate(input, patterns[campo]);
            }
        }
    }

    // validar repetir contraseña
    if (contrasenas[1].value === contrasenas[0].value) {
        contrasenas[1].className = 'valido';
    } else {
        contrasenas[1].className = 'invalido';
    }
}

// Función para comprobar que el formulario esta correcto
function todosValidos() {
    const allInputs = document.querySelectorAll('input');

    for (let input of allInputs) {
        if (!input.classList.contains('valido')) {
            return false;
        }
    }
    return true;
}

// Función para limpiar el formulario
function limpiarFormulario() {
    // Vaciar inputs
    const allInputs = document.querySelectorAll('input');
    allInputs.forEach(input => {
        input.value = '';
        input.className = ''; // quitar clases valido/invalido
    });

    // Vaciar objeto formulario
    for (let campo in formulario) {
        formulario[campo] = '';
    }
}


// Ponerle la función recuperar al clicar el boton
botonRecuperarJson.addEventListener('click', recuperarJson);

// Función para recuperar los datos del archivo JSON
function recuperarJson() {

    var ourRequest = new XMLHttpRequest();
    ourRequest.open('GET', 'formulario.json');
    ourRequest.onload = function() {
        if (ourRequest.status >= 200 && ourRequest.status < 400) {
            var ourData = JSON.parse(ourRequest.responseText);
            console.log(ourRequest.responseText);
            
            // rellenar formulario
            rellenarFormulario(ourData);

        } else {
            console.log("We connected to the server, but it returned an error.");
        }
    };

    ourRequest.onerror = function() {
        console.log("Connection error");
    };

    ourRequest.send();
}

// Ponerle la función guardar en php al clicar el boton
botonGuardarPhp.addEventListener('click', guardarPhp);

// Función para guardar los datos en PHP
function guardarPhp() {

  if (!todosValidos()) {
    console.log("No se puede enviar: hay campos inválidos");
    return;
  }

  formData = JSON.stringify(formulario);

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(JSON.parse(this.responseText));

      // limpiar formulario
      limpiarFormulario()
    }
  };

  xmlhttp.open("POST", "index.php", true);
  xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xmlhttp.send("x=" + formData); 
}

// Ponerle la función recuperar en php al clicar el boton
botonRecuperarPhp.addEventListener('click', recuperarPhp);

// Función para recuperar los datos en PHP
function recuperarPhp() {
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

      //console.log(this.responseText);

      var myObj = JSON.parse(this.responseText);

      console.log(myObj)

      // rellenar formulario
      rellenarFormulario(myObj);
    }
  };

  xmlhttp.open("GET", "index.php", true);
  xmlhttp.send();
}

// Ponerle la función guardar en base de datos al clicar el boton
botonGuardarDb.addEventListener('click', guardarDb);

// Función para guardar los datos en base de datos
function guardarDb() {

  if (!todosValidos()) {
    console.log("No se puede enviar a BD: hay campos inválidos");
    return;
  }

  var nombre = formulario.nombre;
  var apellido = formulario.apellido;
  var dni = formulario.dni;
  var fecha = formulario.fecha;
  var cp = formulario.cp;
  var correo = formulario.correo;
  var telefono = formulario.telefono;
  var movil = formulario.movil;
  var iban = formulario.iban;
  var tarjeta = formulario.tarjeta;
  var contrasena = formulario.contrasena;

  console.log ('Asking server with POST method...');
  var params = "nombre="+nombre+"&apellido="+apellido+"&dni="+dni+"&fecha="+fecha+"&cp="+cp+"&correo="+correo+"&telefono="+telefono+"&movil="+movil+"&iban="+iban+"&tarjeta="+tarjeta+"&contrasena="+contrasena;

  var xhr = new XMLHttpRequest();
  xhr.open('POST','index.php', true);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');//add an HTTP header with setRequestHeader(). Specify the data you want to send in the send() method:

  xhr.onload = function(){
    console.log(this.responseText);

    // limpoiar formulario
    limpiarFormulario()
  }

  xhr.send(params);
}

botonRecuperarDb.addEventListener('click', recuperarDb);

function recuperarDb() {
  var xhttp;
  var dni = formulario.dni;
  console.log(dni)
  xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      var myObj = JSON.parse(this.responseText);

      console.log(myObj)

      // rellenar formulario
      rellenarFormulario(myObj);
    }
  };
  xhttp.open("GET", "index.php?dni="+dni, true);
  xhttp.send();
}