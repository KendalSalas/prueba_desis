<?php 

$server_name = "localhost";
$database = "prueba_desis";
$username = "root";
$password = "root";

$conn = mysqli_connect($server_name, $username, $password, $database);

if(!$conn){
    die("Ocurrio un error al intentar conectarse a la BBDD");
}
