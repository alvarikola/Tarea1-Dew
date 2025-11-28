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
    exit;  // Asegúrate de terminar la ejecución para que no se envíe más código
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
