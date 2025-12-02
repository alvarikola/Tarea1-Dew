<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");

// Si llegan datos desde "GuardarPhp"
if(isset($_POST["x"])) {
    $obj = json_decode($_POST["x"]);
    echo json_encode($obj);
    exit;
}

// Si llegan datos desde "GuardarDb"
if(isset($_POST["nombre"])) {

    $servername = "localhost";
    $username = "phpuser";
    $password = "1234";
    $dbname = "dew";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die(json_encode(["error" => $conn->connect_error]));
    }

    $sql = "INSERT INTO usuarios (nombre, apellido, dni, fecha, cp, correo, telefono, movil, iban, tarjeta, contrasena) 
            VALUES (
                '{$_POST['nombre']}',
                '{$_POST['apellido']}',
                '{$_POST['dni']}',
                '{$_POST['fecha']}',
                '{$_POST['cp']}',
                '{$_POST['correo']}',
                '{$_POST['telefono']}',
                '{$_POST['movil']}',
                '{$_POST['iban']}',
                '{$_POST['tarjeta']}',
                '{$_POST['contrasena']}'
            )";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["error" => $conn->error]);
    }

    exit;
}

// Si es una petición GET con ?dni=... (llega desde "RecuperarDb")
if (isset($_GET["dni"])) {

    $dni = $_GET["dni"];

    $servername = "localhost";
    $username = "phpuser";
    $password = "1234";
    $dbname = "dew";

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        echo json_encode(["error" => $conn->connect_error]);
        exit;
    }

    $sql = "SELECT nombre, apellido, dni, fecha, cp, correo, telefono, movil, iban, tarjeta, contrasena 
        FROM usuarios 
        WHERE dni = '" . $conn->real_escape_string($_GET["dni"]) . "'";
    $result = $conn->query($sql);

    if ($result->num_rows === 0) {
        echo json_encode(["error" => "No existe un usuario con ese DNI"]);
        exit;
    }

    $row = $result->fetch_assoc();

    echo json_encode($row);
    exit;
}

// Si es una petición GET (desde "RecuperarPhp")
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

echo json_encode($myObj);
exit;
?>


<!-- CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    dni VARCHAR(12) NOT NULL UNIQUE,
    fecha VARCHAR(50) NOT NULL,
    cp CHAR(5) NOT NULL,
    correo VARCHAR(120) NOT NULL UNIQUE,
    telefono VARCHAR(15) NOT NULL,
    movil VARCHAR(15) NOT NULL,
    iban VARCHAR(34) NOT NULL,
    tarjeta VARCHAR(25) NOT NULL,
    contrasena VARCHAR(255) NOT NULL
); -->
