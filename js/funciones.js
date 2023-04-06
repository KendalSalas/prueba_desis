/**
 * Función asincrona para obtener y llenar las regiones al momento de cargar la página
 * @param {String} destino Identificador del elemento HTML donde se insertará 
 */
export const cargarRegiones = async (destino) => {
    const urlFetch = 'ajax/carga_regiones.php';

    const dataFech = {
        method: 'POST'
    }

    try {
        const res = await fetch(urlFetch, dataFech);

        const json = await res.json();
        const success = json.success; //Será un boolean, si todo sale bien, true, caso contrario, false, para este ultimo caso, levantaré una ventana indicando el error
        const detail = json.detail; //Mensaje relacionado a la respuesta, lo puedo usar para mostrarlo en caso de error, o para iterarlo y desplegar las options relacionados al input

        if (!success) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: detail,
            })
            return;
        }

        detail.map(({ id_region, nombre_region }) => {
            let opt = document.createElement('option');
            opt.value = id_region;
            opt.innerHTML = nombre_region;
            destino.append(opt);
        })

    } catch (err) {
        console.error(err);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error inesperado',
        })
    }
}
/**
 * Función asincrona para obtener y llenar las comunas al momento de seleccionar una región
 * @param {String} destino Identificador del elemento HTML donde se insertará
 * @param {Int} idRegion
 */
export const cargarComunas = async (destino, idRegion) => {
    const urlFetch = 'ajax/carga_comunas.php';
    const dataFetch = new URLSearchParams();
    dataFetch.append('id_region', idRegion);

    try {
        spinner('show');
        const dataFech = {
            method: 'POST',
            body: dataFetch
        }

        const res = await fetch(urlFetch, dataFech);

        const json = await res.json();
        const success = json.success; //Será un boolean, si todo sale bien, true, caso contrario, false, para este ultimo caso, levantaré una ventana indicando el error 
        const detail = json.detail; //Mensaje relacionado a la respuesta, lo puedo usar para mostrarlo en caso de error, o para iterarlo y desplegar las options relacionados al input

        if (!success) {
            spinner('hide')
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: detail,
            })
            return;
        }

        destino.innerHTML = '';

        detail.map(({ id_comuna, nombre_comuna }) => {
            let opt = document.createElement('option');
            opt.value = id_comuna;
            opt.innerHTML = nombre_comuna;
            destino.append(opt);
        })

        spinner('hide')

    } catch (err) {
        console.error(err);
        spinner('hide')
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error inesperado',
        })
    }
}

/**
 * Función asincrona para obtener y llenar los candidatos al momento de cargar la página
 * @param {String} destino Identificador del elemento HTML donde se insertará 
 */
export const cargarCandidatos = async (destino) => {
    const urlFetch = 'ajax/carga_candidatos.php';

    const dataFech = {
        method: 'POST'
    }

    try {
        const res = await fetch(urlFetch, dataFech);

        const json = await res.json();
        const success = json.success; //Será un boolean, si todo sale bien, true, caso contrario, false, para este ultimo caso, levantaré una ventana indicando el error
        const detail = json.detail; //Mensaje relacionado a la respuesta, lo puedo usar para mostrarlo en caso de error, o para iterarlo y desplegar las options relacionados al input

        if (!success) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: detail,
            })
            return;
        }

        detail.map(({ id_candidato, nombre_candidato }) => {
            let opt = document.createElement('option');
            opt.value = id_candidato;
            opt.innerHTML = nombre_candidato;
            destino.append(opt);
        })

    } catch (err) {
        console.error(err);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error inesperado',
        })
    }
}

/**
 * Función para validar un campo en específico y su valor
 * @param {String} nombreCampo Nombre del campo a validar (nombre_apellido, email, alias, rut, region, comuna, candidato)
 * @param {String} valor Valor del campo
 * @returns {Boolean}
 */
export const validarCampo = (nombreCampo, valor = '') => {
    if (nombreCampo === 'nombre_apellido') {
        if (valor.trim().length === 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'El campo Nombre y Apellido no puede estar vacío',
            })
            return false;
        }
    } else if (nombreCampo === 'email') {
        const validEmailRegEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        if (!valor.match(validEmailRegEx)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar un email valido',
            })
            return false;
        }
    } else if (nombreCampo === 'alias') {
        const aliasRegEx = /^\w{5,}/;

        if (!valor.match(aliasRegEx)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar un alias alfanumerico, con un largo mínimo de 5.',
            })
            return false;
        }
    } else if (nombreCampo === 'rut') {
        const rutRegEx = /^[0-9]+[-|‐]{1}[0-9kK]{1}/;

        if (!valor.match(rutRegEx)) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar un RUT válido.',
            })
            return false;
        }

        const rutArr = valor.split('-');
        const dig_v = rutArr[1];
        const rut = rutArr[0];

        if (dig_v === 'K') dig_v = 'k'
        const dvValido = digitoVerificador(rut);

        if (dvValido != dig_v) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe ingresar un RUT válido.',
            })
            return false;
        }


    } else if (nombreCampo === 'checkbox') {
        const checkBoxesSelected = document.querySelectorAll('input[type=checkbox]:checked');

        if (checkBoxesSelected.length < 2) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Debe seleccionar al menos 2 opciones en el campo Como se enteró de nosotros.',
            })
            return false;
        }
    } else if (nombreCampo === 'region' || nombreCampo === 'comuna' || nombreCampo === 'candidato') {
        if (valor <= 0) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: `Debe seleccionar una opción válida en el campo de ${nombreCampo}.`,
            })
            return false;
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Nombre de campo inválido.',
        })
        return false;
    }
}

/**
 * Función para limpiar un formulario
 * @param {String} form Identificador del formulario a limpiar 
 */
export const limpiarForm = (form) => {
    form.reset();
    document.getElementById('inp_comunas').disabled = true;
}

/**
 * Función para intentar guardar el voto del usuario, recibiré un JSON con los datos de este y el form, para que, en caso de haberse guardado con éxito, resetearlo
 * @param {JSON} votoUsuario 
 * @param {String} form 
 * @returns 
 */
export const guardarVoto = async (votoUsuario, form) => {
    const urlFetch = 'ajax/guardar_voto.php';
    const dataFetch = new URLSearchParams();
    dataFetch.append('json_voto', votoUsuario);

    try {
        spinner('show');

        const dataFech = {
            method: 'POST',
            body: dataFetch
        }

        const res = await fetch(urlFetch, dataFech);

        const json = await res.json();
        const success = json.success; //Será un boolean, si todo sale bien, true, caso contrario, false, en ambos casos levantaré una ventana indicando si hubo éxito o no
        const detail = json.detail; //Mensaje relacionado a la respuesta, lo puedo usar para mostrarlo en caso de error, o para iterarlo y desplegar las options relacionados al input

        if (!success) {
            spinner('hide');
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: detail,
            })
            return;
        }

        spinner('hide');
        Swal.fire({
            icon: 'success',
            title: 'Voto Guardado',
            text: "Se guardó su voto correctamente"
        })

        limpiarForm(form);

    } catch (err) {
        console.error(err);
        spinner('hide');
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error inesperado',
        })
    }
}

/**
 * Función para mostrar u ocultar un spinner
 * @param {String} accion show Para desplegar spinner / hide para ocultarlo 
 */
const spinner = (accion) => {
    if (accion == 'show') {
        document.getElementById('cover-spin').style.display = 'block';
    } else if (accion == 'hide') {
        document.getElementById('cover-spin').style.display = 'none';
    }
}

/**
 * Función que calcula el digito verificador de un rut
 * @param {String} rut 
 * @returns {String} DV del rut ingresado
 */
const digitoVerificador = (rut) => {
    var M = 0, S = 1;
    for (; rut; rut = Math.floor(rut / 10))
        S = (S + rut % 10 * (9 - M++ % 6)) % 11;
    return S ? S - 1 : 'k';
}

