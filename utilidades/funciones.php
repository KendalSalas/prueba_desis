<?php
/**
 * Función para obtener el listado de candidatos desde la base de datos
 * @return String $options
 */
function cargarCandidatos($conn)
{
    $dataResp = [];
    $exec = $conn->query("SELECT * FROM candidato");

    //Si hay un error al momento de lanzar la query o no hay registros en la tabla, devuelvo un error
    if (!$exec) {
        $dataResp["success"] = false;
        $dataResp["detail"] = "Ocurrió un error al intentar obtener los candidatos";
        return json_encode($dataResp);
    }

    $numCandidatos = $exec->num_rows;

    if ($numCandidatos == 0) {
        $dataResp["success"] = false;
        $dataResp["detail"] = "No hay candidatos para listar.";
        return json_encode($dataResp);
    }

    //Si llega a este punto, comenzare a llenar un arreglo con los datos de los candidatos para devolverlo
    $dataResp["success"] = true;
    $dataResp["detail"] = [];

    $dataResp["detail"][] = ["id_candidato" => 0, "nombre_candidato" => "Seleccione un candidato..."];

    while ($row = $exec->fetch_assoc()) {

        $tmp = [
            "id_candidato" => $row['id'],
            "nombre_candidato" => $row['nombre_candidato']
        ];

        array_push($dataResp["detail"], $tmp);
    }

    return json_encode($dataResp);
}

/**
 * Función para obtener el listado de regiones desde la base de datos
 * @return String $options
 */
function cargarRegiones($conn)
{
    $dataResp = [];
    $exec = $conn->query("SELECT region_id, region_nombre FROM regiones");

    //Si existe algun error al momento de lanzar la query o no hay registros, devuelvo un error
    if (!$exec) {
        $dataResp["success"] = false;
        $dataResp["detail"] = "Ocurrió un error al intentar obtener las regiones";
        return json_encode($dataResp);
    }

    $numRegiones = $exec->num_rows;

    if ($numRegiones == 0) {
        $dataResp["success"] = false;
        $dataResp["detail"] = "No hay regiones para listar.";
        return json_encode($dataResp);
    }

    //Si llego a este punto, comenzaré a llenar un arreglo con las regiones y su ID correspondiente para luego devolverlo
    $dataResp["success"] = true;
    $dataResp["detail"] = [];

    $dataResp["detail"][] = ["id_region" => 0, "nombre_region" => "Seleccione una región..."];

    while ($row = $exec->fetch_assoc()) {

        $tmp = [
            "id_region" => $row['region_id'],
            "nombre_region" => $row['region_nombre']
        ];

        array_push($dataResp["detail"], $tmp);
    }

    return json_encode($dataResp);
}

/**
 * Función para obtener un listado de comunas correspondientes a la región
 * @param Int $idRegion = ID de la región para filtrar
 * @return String $options
 */
function cargarComunas($conn, $idRegion)
{
    $dataResp = [];
    
    //Valido primero que el idRegion sea valido, caso contrario, lanzo un error
    if ($idRegion == 0) {
        $dataResp["success"] = false;
        $dataResp["detail"] = "Región inválida.";
        return json_encode($dataResp);
    }

    $exec = $conn->prepare("SELECT c.comuna_nombre, c.comuna_id FROM comunas c
    INNER JOIN provincias p ON p.provincia_id = c.provincia_id
    INNER JOIN regiones r ON r.region_id = p.region_id 
    WHERE r.region_id = ?
    ");

    $exec->bind_param("i", $idRegion);
    $exec->execute();

    //En caso de que haya un error con la query, o no hayan registros en la tabla, devuelvo un error
    if (!$exec) {
        $dataResp["success"] = false;
        $dataResp["detail"] = "Error al intentar obtener las comunas.";
        return json_encode($dataResp);
    }

    $data = $exec->get_result();
    $numRows = $data->num_rows;

    if ($numRows == 0) {
        $dataResp["success"] = false;
        $dataResp["detail"] = "No hay comunas para la región seleccionada.";
        return json_encode($dataResp);
    }

    //Si llega a este punto, comenzaré a llenar un array con las comunas y su ID correspondiente, para luego devolverlo
    $dataResp["success"] = true;
    $dataResp["detail"] = [];

    $dataResp["detail"][] = ["id_comuna" => 0, "nombre_comuna" => "Seleccione una comuna..."];

    while ($row = $data->fetch_assoc()) {

        $tmp = [
            "id_comuna" => $row['comuna_id'],
            "nombre_comuna" => $row['comuna_nombre']
        ];

        array_push($dataResp["detail"], $tmp);
    }

    return json_encode($dataResp);
}

/**
 * Función para guardar el voto del usuario en la tabla
 * @param JSON $jsonCampos = JSON con los valores a guardar en la tabla
 * @return String
 */
function guardarVoto($conn, $jsonCampos)
{
    $nombreApellido = $jsonCampos->nombre_apellido;
    $alias = $jsonCampos->alias;
    $rutCompleto = $jsonCampos->rut;
    $arrRut = explode("-", $rutCompleto);
    $rut = $arrRut[0];
    $rut_dv = $arrRut[1];
    $email = $jsonCampos->email;
    $idRegion = $jsonCampos->region;
    $idComuna = $jsonCampos->comuna;
    $idCandidato = $jsonCampos->candidato;
    $checkBoxValues = implode(",", $jsonCampos->checkBoxValues);

    try {
        //Primero valido que todos los campos sean validos
        //Caso contrario, lanzo el throw con un mensaje en especifico
        if (empty($nombreApellido) || empty($alias) || empty($rutCompleto) || empty($email) || $idRegion <= 0 || $idCandidato <= 0 || $idComuna <= 0 || empty($checkBoxValues)) {
            throw new Exception("No pueden haber campos vacíos al momento de guardar un voto.", 0);
        }

        $queryGuardar = $conn->prepare("INSERT INTO votos_usuario (nombre_apellido, alias, rut, rut_dv, email, id_region, id_comuna, como_se_entero, id_candidato) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)");
        $queryGuardar->bind_param("sssssiisi", $nombreApellido, $alias, $rut, $rut_dv, $email, $idRegion, $idComuna, $checkBoxValues, $idCandidato);
        $queryGuardar->execute();

        //En caso de que exista un error al momento de guardar, lanzo el throw con el código de error
        if (!$queryGuardar) {
            throw new Exception("Ocurrió un error al intentar guardar el registro.", $conn->errno);
        }

        //Si todo sale bien, retorno un json con success en true, para levantar la ventana de éxito
        return json_encode(["success" => true, "detail" => '']);
    } catch (Exception $e) {
        $errMsg = $e->getMessage();
        $errNum = $e->getCode();    

        //Si $errNum es 1062, significa que el error ocurrió al momento de guardar el registro, porque ya hay un voto registrado con ese rut
        //Modifico el mensaje de error para que sea claro para el usuario
        if($errNum == 1062){
            $errMsg = "Ya hay un voto guardado para el rut $rut";
        }

        return json_encode(["success" => false, "detail" => $errMsg, "err_code" => $errNum]);
    }
}
