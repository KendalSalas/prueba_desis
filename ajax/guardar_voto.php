<?php
require("../conexion/conn.php");
require("../utilidades/funciones.php");

$jsonVoto = json_decode($_POST['json_voto']);

$guardarVoto = guardarVoto($conn, $jsonVoto);
echo $guardarVoto;
exit;