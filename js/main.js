import { cargarComunas, cargarRegiones, validarCampo, limpiarForm, cargarCandidatos, guardarVoto } from "./funciones.js";

const $inputRegiones = document.getElementById('inp_regiones'),
    $inputComunas = document.getElementById('inp_comunas'),
    $inputCandidatos = document.getElementById('inp_candidatos'),
    $btnSumbit = document.getElementById('btn_submit'),
    $nombreApellido = document.getElementById('nombre_apellido'),
    $alias = document.getElementById('alias'),
    $rut = document.getElementById('rut'),
    $email = document.getElementById('email'),
    $form = document.getElementById('votacion_form');

//Cada vez que se cargue o refresque la página, debo cargar las regiones, los candidatos, deshabilitar la opción de comunas y limpiar el formulario
document.addEventListener("DOMContentLoaded", () => {
    cargarRegiones($inputRegiones);
    cargarCandidatos($inputCandidatos);
    $inputComunas.disabled = true;
    limpiarForm($form);
})

//Cada vez que el usuario cambie de región, validaré que haya elegido una válida para luego obtener las comunas de la misma
$inputRegiones.onchange = (event) => {
    const idRegionSel = event.target.value;

    if (idRegionSel > 0) {
        $inputComunas.disabled = false;
        cargarComunas($inputComunas, idRegionSel);
    }
}

document.addEventListener('click', e => {

    //Cuando el usuario haga click en el botón de submit, evitaré que la página se recargue para hacer las validaciones y luego intentar guardar el voto
    if (e.target === $btnSumbit) {
        e.preventDefault();
        const nombreApellido = $nombreApellido.value,
            alias = $alias.value.replaceAll(' ', ''),
            rut = $rut.value.replaceAll('.', ''),
            email = $email.value,
            region = $inputRegiones.value,
            comuna = $inputComunas.value,
            candidato = $inputCandidatos.value;

        const validarNombreApellido = validarCampo('nombre_apellido', nombreApellido),
            validarAlias = validarCampo('alias', alias),
            validarRut = validarCampo('rut', rut),
            validarEmail = validarCampo('email', email),
            validarCheckBox = validarCampo('checkbox'),
            validarRegion = validarCampo('region', region),
            validarComuna = validarCampo('comuna', comuna),
            validarCandidato = validarCampo('candidato', candidato);

        //Valido que todos los campos sean validos antes de guardar el voto
        if (validarNombreApellido === false || validarAlias === false || validarRut === false || validarEmail === false || validarCheckBox === false || validarRegion === false || validarComuna === false || validarCandidato === false) {
            return;
        }

        //Obtengo los checkboxes seleccionados por el usuario para luego guardarlos en un arreglo diferente y agregarlo a la petición
        const checkBoxValues = [];
        const checkBoxesSelected = document.querySelectorAll('input[type=checkbox]:checked');

        checkBoxesSelected.forEach(check => {
            checkBoxValues.push(check.value)
        })

        //Creo un json con los datos del usuario para guardar su voto
        const votoUsuario = {
            nombre_apellido: nombreApellido,
            alias,
            rut,
            email,
            region,
            comuna,
            candidato,
            checkBoxValues
        }

        const jsonVoto = JSON.stringify(votoUsuario);
        guardarVoto(jsonVoto, $form);
    }
})