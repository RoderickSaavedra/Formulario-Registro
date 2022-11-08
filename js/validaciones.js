//blur evento sucede al quitar el foco del elemento

export function valida(input){
    const tipoDeInput = input.dataset.tipo;
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = " ";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input);
    }
}

const mensajeError = {
    nombre: {
        valueMissing: "Este campo nombre no puede estar vacio"
    },
    emial: {
        valueMissing: "Este campo correo no puede estar vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo contraseña no puede estar vacio",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe de contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres expeciales"
    },
    nacimiento: {
        customError: "Debes tener ser mayor +18"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "El formado requerido es XXXXXXXXXX 10 números"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La direccion debe contener entre 10 a 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacio",
        patternMismatch: "el estado debe contener entre 10 a 40 caracteres"
    },

}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];


function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach( (error) => {
        if(input.validity[error]){
            console.log(error);
            console.log(input.validity[error]);
            console.log(mensajeError[tipoDeInput][error]);
            mensaje = mensajeError[tipoDeInput][error];
        }
    });

    return mensaje;
}


const validadores = { //objeto
    nacimiento: (input) => validarNacimiento(input),
};

function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = "";
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos +18"
    }

    input.setCustomValidity(mensaje); //edita el mensaje que muestra html al quivocarte en un campo
}

function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFecha = new Date(fecha.getUTCFullYear() + 18, fecha.getUTCMonth(), fecha.getUTCDate());
    return(diferenciaFecha <= fechaActual);
}