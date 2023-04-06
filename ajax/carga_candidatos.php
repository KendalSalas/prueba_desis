<?php 
require("../conexion/conn.php");
require("../utilidades/funciones.php");

$cargaCandidatos = cargarCandidatos($conn);

echo $cargaCandidatos;
exit;