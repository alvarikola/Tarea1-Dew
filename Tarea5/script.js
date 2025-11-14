const patterns = {
  nombre: /^[A-Z][a-z\d]$/i,
  apellidos: /^[A-Z][a-z]+(?:\s[A-Z][a-z]+)?$/i,
  dni: /^[x]*\d{8}[a-z]$/i,
  fechaNacimiento: /^([0-2][0-9]|3[0-1])(\/)(0[1-9]|1[0-2])\2(\d{4})$/i,
  codigoPostal: /^([0-4][0-9]|5[0-2])(\d{3})$/i,
  email: /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*[.][a-zA-Z]{2,5}/i,
  telefonoFijo: /^([89]\d{2}(\s?\d{2}){3})$/i,
  telefonoMovil: /^([67]\d{2}(\s?\d{2}){3})$/i,
  iban: /[a-zA-Z]{2}[0-9]{20}$/i,
  tarjetaCredito: /^(\d{4}[\s]?){3}\d{4}$/i,
  contrasena: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$?¡_\-])[A-Za-z\d@$?¡_\-]{12,}$/i
};

const inputs = document.querySelectorAll('input');

inputs.forEach((input) => {
  input.addEventListener('keyup', (e) => e.preventDefault());

  // input.addEventListener('keydown',teclea);
  // function teclea(evento){
  //   let key = evento.key;
  //   input.value+=key;
  // }

  input.addEventListener('keyup', (e) => { 
    validate(e.target, patterns[e.target.attributes.name.value]); 
  });
});


//// Declaración de la función de validación 'validate' para validar el valor del campo del formulario (variable 'campo') utilizando la expresión regular (variable 'regex').  
function validate(campo, regex) {
    // El método 'test' comprueba que el valor del campo recibido (e.target) cumple la expresión regular recibida (patterns[e.target.attributes.name.value]) como parámetros  
    if(regex.test(campo.value)) {
      campo.className = 'valido';
    } else {
      campo.className = 'invalido';
    }
}