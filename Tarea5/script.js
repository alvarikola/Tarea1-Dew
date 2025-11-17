// Expresiones regulares
const patterns = {
  nombre: /^[A-Z][a-z\d]+$/,
  apellidos: /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)?$/,
  dni: /^[x]*\d{8}[a-zA-Z]$/,
  fechaNacimiento: /^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/,
  codigoPostal: /^([0-4][0-9]|5[0-2])(\d{3})$/,
  email: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/,
  telefonoFijo: /^([89]\d{2}(\s?\d{2}){3})$/,
  telefonoMovil: /^([67]\d{2}(\s?\d{2}){3})$/,
  iban: /[a-zA-Z]{2}[0-9]{20}$/,
  tarjetaCredito: /^(\d{4}[\s]?){3}\d{4}$/,
  contrasena: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$?¡_\-])[A-Za-z\d@$?¡_\-]{12,}$/
};

// Lista con todos los inputs excepto el de contraseña
const inputs = document.querySelectorAll('input, .normales');
const contrasenas = document.querySelectorAll('input, .contrasena');

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

  // Validar cada input con la expresion regular que tenga el mismo nombre
  input.addEventListener('keyup', (e) => { 
    validate(e.target, patterns[e.target.attributes.name.value]);
    
    contrasenas.forEach((contrasena) => {
      console.log(contrasena[0])
      if(contrasena[0].attributes.value == contrasena[1].attributes.value) {
        contrasena[1].className = 'valido';
      } else {
        contrasena[1].className = 'invalido';
      }
    })

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