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
