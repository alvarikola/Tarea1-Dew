// Expresiones regulares
const patterns = {
  nombre: /^[A-Z][a-z\d]+$/,
  apellidos: /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)?$/,
  dni: /^[x]*\d{8}[a-zA-Z]$/,
  fechaNacimiento: /^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/,
  codigoPostal: /^([0-4][0-9]|5[0-2])(\d{3})$/,
  email: /^[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}$/,
  telefonoFijo: /^([89]\d{2}(\s?\d{2}){3})$/,
  telefonoMovil: /^([67]\d{2}(\s?\d{2}){3})$/,
  iban: /[a-zA-Z]{2}[0-9]{20}$/,
  tarjetaCredito: /^(\d{4}[\s]?){3}\d{4}$/,
  contrasena: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$?¡_\-])[A-Za-z\d@$?¡_\-]{12,}$/
};

// Objeto del formulario
const formulario = {
  nombre: "",
  apellidos: "",
  dni: "",
  fechaNacimiento: "",
  codigoPostal: "",
  email: "",
  telefonoFijo: "",
  telefonoMovil: "",
  iban: "",
  tarjetaCredito: "",
  contrasena: ""
};

// Elementos del html (inputs y botones)
const inputs = document.querySelectorAll('input, .normales');
const contrasenas = document.querySelectorAll('.contrasena');
const botonGuardar = document.querySelector('#guardar');
const botonRecuperar = document.querySelector('#recuperar');


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

// Ponerle la función guardar al clicar el boton
botonGuardar.addEventListener('click', guardar);

// Función para guardar el objeto en el sessionStorage
function guardar() {
  myJSON = JSON.stringify(formulario);
  sessionStorage.setItem("formulario1", myJSON);
  console.log("Formulario guardado")
}

// Ponerle la función recuperar al clicar el boton
botonRecuperar.addEventListener('click', recuperar);

// Función para recuperar los datos del sessionStorage
function recuperar() {

  // Recuperar
  const text = sessionStorage.getItem("formulario1");
  if (!text) return;

  const datos = JSON.parse(text);
  console.log("Formulario recuperado");

  // Rellenar los inputs del formulario
  for (let campo in datos) {
    let input = document.querySelector(`input[name="${campo}"]`);
    if (input) {
      input.value = datos[campo];

      // Actualizar el objeto formulario
      formulario[campo] = datos[campo];

      // Lanzar validación
      if (patterns[campo]) {
        validate(input, patterns[campo]);
      }
    }
  }

  // Validar las contraseñas entre sí
  if (contrasenas[1].value === contrasenas[0].value) {
    contrasenas[1].className = 'valido';
  } else {
    contrasenas[1].className = 'invalido';
  }
}

