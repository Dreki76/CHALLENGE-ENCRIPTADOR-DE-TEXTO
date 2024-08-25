const d = document;
const textArea = d.querySelector(".ingreso__texto")
const imagenMuñeco = d.querySelector(".imagen__resultado");
const loaderReloj = d.querySelector(".loader");
const tituloResultado = d.querySelector(".titulo__resultado");
const textoResultado = d.querySelector(".texto__resultado");
const botonEncriptar = d.querySelector(".boton__encriptar");
const botonDesencriptar = d.querySelector(".boton__desencriptar");
const botonCopiar = d.querySelector(".boton__copiar");

const llaves=[
    ["e", "enter"],
    ["i", "imes"],
    ["a", "ai"],
    ["o", "ober"],
    ["u", "ufat"]
];

//Función para Encriptar
function encriptarMensaje(mensaje){
    let mensajeEncriptado = "";
    for(let i = 0; i < mensaje.length; i++){
        let letra = mensaje[i];
        let encriptada = letra;
        for(let j = 0; j < llaves.length; j++){
            if (letra === llaves[j][0]){
                encriptada = llaves[j][1]; //Reemplaza la letra por su equivalente encriptado
                break; //Termina el bucle cuando se encuentra la correspondencia
            }
        }
        mensajeEncriptado += encriptada;
    }
    return mensajeEncriptado
}

function desencriptarMensaje(mensaje) {
    let mensajeDesencriptado = mensaje;
    for(let i = 0; i < llaves.length; i++) {
        let Regex = new RegExp(llaves[i][1], "g");
        mensajeDesencriptado = mensajeDesencriptado.replace(Regex, llaves[i][0]);
}
    return mensajeDesencriptado;
}
//Ocultar elementos dinamicamente
textArea.addEventListener("input", (e)=>{
    imagenMuñeco.style.display = "none";
    loaderReloj.classList.remove("hidden");
    tituloResultado.textContent = "Capturando Mensaje";
    textoResultado.textContent = "";
});
//Función del boton encriptar
botonEncriptar.addEventListener("click",(e)=>{
e.preventDefault();
let mensaje = textArea.value.toLowerCase();
let mensajeEncriptado = encriptarMensaje(mensaje);
textoResultado.textContent = mensajeEncriptado;
botonCopiar.classList.remove("hidden");
tituloResultado.textContent = "El resultado es:";
});
//Función del boton desencriptar
botonDesencriptar.addEventListener("click",(e)=>{
e.preventDefault();
let mensaje = textArea.value.toLowerCase();
let mensajeDesencriptado = desencriptarMensaje(mensaje);
textoResultado.textContent = mensajeDesencriptado;
botonCopiar.classList.remove("hidden");
});

botonCopiar.addEventListener("click", ()=>{
    let textoCopiado = textoResultado.textContent;
    navigator.clipboard.writeText(textoCopiado).then(()=> {
        imagenMuñeco.style.display = "block";
        loaderReloj.classList.add("hidden");
        tituloResultado.textContent = "El texto se copió";
        botonCopiar.classList.add("hidden");
        textoResultado.textContent = "";
    })
});