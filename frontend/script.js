function guardar(){

    let nota=0.0;
    let apellidos='';
    let datoingresado = document.getElementById("correo").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    event.preventDefault();

    //variable estructurada transformando el frontend 
    let raw = JSON.stringify({
      "nombre": document.getElementById("nombre").value,
      "apellidos": document.getElementById("apellidos").value,
      "email": document.getElementById("email").value,
      "contrasena": document.getElementById("contrasena").value,
      "contrasenaC": document.getElementById("contrasenaC").value
      
    });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://ejemplodedsws.netlify.app/.netlify/functions/estudiantes", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}

//Ejemplo cuando se devuelve algo
function cargar(resultado){
    let transformado = JSON.parse(resultado);
    var salida="";
    var elemento="";
 

    for (let vc in transformado){
        elemento =  "<br>Nombre: " + transformado[vc].nombre;
        elemento = elemento + "<br>Apellidos: " + transformado[vc].apellidos;
        elemento = elemento + "<br>Correo electrónico: " + transformado[vc].email;
        salida = salida  + elemento + "<br><br>";
    }

    document.getElementById("rta").innerHTML = salida;
}

function listar(){
    event.preventDefault();
    const requestOptions = {
      method: "GET",
      redirect: "follow"
    };
    fetch("https://ejemplodedsws.netlify.app/.netlify/functions/estudiantes", requestOptions)
      .then((response) =>
        response.text())
      .then((result) =>
        cargar(result))
      .catch((error) =>
        console.error(error));
}