<?php 
require("../conexion/conn.php");
require("../utilidades/funciones.php");


$idRegion = $_POST['id_region'];

if($idRegion == 0){
    echo json_encode(["success" => false, "detail" => "Región invalida."]);
    exit;
}

$cargaComunas = cargarComunas($conn, $idRegion);

echo $cargaComunas;
exit;