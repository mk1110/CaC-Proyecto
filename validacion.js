

const validarFormulario= (evento) => {
    evento.preventDefault()
    const primerNombre = document.getElementById("nom")
    const divErrorPrimerNombre = document.querySelector("#error-nom")
    divErrorPrimerNombre.innerHTML = ""

    if (primerNombre.value === "") {
        
        divErrorPrimerNombre.insertAdjacentText("afterbegin","El nombre no puede ser vacio!!!")
    }

    const ape = document.getElementById("ap")
    const divErrorap = document.querySelector("#error-ap")
    divErrorap.innerHTML = ""

    if (ape.value === "") {
        
        divErrorap.insertAdjacentText("afterbegin","El apellido no puede ser vacio!!!")
    }

    const em = document.getElementById("email")
    const divErroem = document.querySelector("#error-em")
    divErroem.innerHTML = ""

    if (em.value === "") {
        
        divErroem.insertAdjacentText("afterbegin","tienes que colocar un email")
    }



}
    const formularioRegistro = document.querySelector("#formRegister")
formularioRegistro.addEventListener('submit',validarFormulario);


function datosClientes(){
    let cliente = {
        nombre: document.getElementById("nom").value,
        apellido: document.getElementById("ap").value,
        email: document.getElementById("email").value,
        ciudad: document.getElementById("city").value,
        check: document.getElementById("check").checked,
        mensaje: document.getElementById("msj").value
    }
    console.log(cliente);


}


