<?php 
require("../conexion/conn.php");
require("../utilidades/funciones.php");

$cargaRegiones = cargarRegiones($conn);

echo $cargaRegiones;
exit;