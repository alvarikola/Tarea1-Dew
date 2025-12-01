<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Asegúrate de que los datos lleguen correctamente
$nombre = $_POST['nombre'] ?? null;
$apellido = $_POST['apellido'] ?? null;
$dni = $_POST['dni'] ?? null;
$fecha = $_POST['fecha'] ?? null;
$cp = $_POST['cp'] ?? null;
$correo = $_POST['correo'] ?? null;
$telefono = $_POST['telefono'] ?? null;
$movil = $_POST['movil'] ?? null;
$iban = $_POST['iban'] ?? null;
$tarjeta = $_POST['tarjeta'] ?? null;
$contrasena = $_POST['contrasena'] ?? null;

// Si el parámetro 'x' existe en la solicitud, devolver los datos recibidos
if(isset($_POST["x"])) {
    $obj = json_decode($_POST["x"], false);
    echo json_encode($obj);
    exit;
}

// Si no es una solicitud con 'x', devolver datos predeterminados en formato JSON
$myObj = new stdClass;
$myObj->name = "Pepe";
$myObj->surname = "Lopez Perez";
$myObj->dni = "12345678X";
$myObj->date = "22/09/2000";
$myObj->cp = 35500;
$myObj->mail = "pepe@gmail.com";
$myObj->phone = "928666666";
$myObj->mobile = "666999666";
$myObj->card = "4539955085883327";
$myObj->iban = "ES7921000813610123456789";
$myObj->password = "Pepe123456789*";

// Convertir el objeto a JSON y devolverlo
echo json_encode($myObj);


/*
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(12) NOT NULL UNIQUE,
    fecha DATE NOT NULL,
    cp CHAR(5) NOT NULL,
    correo VARCHAR(120) NOT NULL UNIQUE,
    telefono VARCHAR(15) NOT NULL,
    movil VARCHAR(15) NOT NULL,
    iban VARCHAR(34) NOT NULL,
    tarjeta VARCHAR(25) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
);
*/

$servername = "localhost";
$username = "root";
$password = "alvin1881"; //es la contraseña del usuario ver si se puede cambiar
$dbname = "shop";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO messages (userid, message) VALUES('" . $_POST['user'] ."','" . $_POST['message'] . "')";

if ($conn->query($sql) === TRUE) {
  echo "New record created successfully";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();



?>
