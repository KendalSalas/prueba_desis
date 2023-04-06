<?php
require('conexion/conn.php');
require('utilidades/funciones.php');
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Prueba Desis</title>
    <link rel="stylesheet" href="css/spinner.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KK94CHFLLe+nY2dmCWGMq91rCGa5gtU4mk92HdvYe+M/SXH301p5ILy+dN9+nJOZ" crossorigin="anonymous">
</head>

<body>
    <div class="container">
        <h1>Formulario de Votación</h1>
        <hr>
        <div id="cover-spin"></div>
        <legend>
            <form action="" id="votacion_form">
                <div class="mb-3">
                    <label for="nombre_apellido" class="form-label">Nombre y Apellido</label>
                    <input type="text" class="form-control" id="nombre_apellido" required placeholder="John Doe">
                </div>
                <div class="mb-3">
                    <label for="alias" class="form-label">Alias</label>
                    <input type="text" class="form-control" id="alias" placeholder="JohnDoe15" pattern="[A-Za-z0-9]{5,}">
                </div>

                <div class="mb-3">
                    <label for="rut" class="form-label">RUT</label>
                    <input type="text" class="form-control" id="rut" placeholder="11111111-1">
                </div>

                <div class="mb-3">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" class="form-control" pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$" id="email" placeholder="correo@prueba.com">
                </div>

                <div class="mb-3">
                    <label for="region" class="form-label">Región</label>
                    <select name="inp_regiones" id="inp_regiones" class="form-select" aria-label="Región"></select>
                </div>

                <div class="mb-3">
                    <label for="comuna" class="form-label">Comuna</label>
                    <select name="inp_comunas" id="inp_comunas" disabled class="form-select" aria-label="Comuna">
                        <option value="0">Seleccione una región...</option>
                    </select>
                </div>

                <div class="mb-3">
                    <label for="candidato" class="form-label">Candidato</label>
                    <select name="inp_candidatos" id="inp_candidatos" class="form-select" aria-label="Candidato"></select>
                </div>

                <div class="mb-3">
                    <label for="como_nos_conocio" class="form-label">Como se enteró de nosotros</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="web">
                        <label class="form-check-label">
                            Web
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="tv">
                        <label class="form-check-label">
                            TV
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="rrss">
                        <label class="form-check-label">
                            Redes Sociales
                        </label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" value="amigos">
                        <label class="form-check-label">
                            Amigos
                        </label>
                    </div>
                </div>

                <button type="submit" id="btn_submit" class="btn btn-primary">Guardar Voto</button>
            </form>
        </legend>
    </div>
    <script src="js/main.js" type="module"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
</body>

</html>