function logear(){
    let user=document.getElementById("name").value;
    let password=document.getElementById("password").value;

    if(user=="Prog" && password==1234){
        window.location="./alta_prod.html";
    }
    else{
        alert("Ingrese usuario y contraseña correcto")
    }
}