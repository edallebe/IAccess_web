//base de datos en local
const getProductsFromStorage = () => JSON.parse(localStorage.getItem('users')) || [];
const saveProductsToStorage = (users) => localStorage.setItem('users', JSON.stringify(users));

function guardar(event){

    let datoingresado = document.getElementById("email").value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    event.preventDefault();

    /*variable estructurada transformando el frontend 
    let raw = JSON.stringify({
      "nombre": document.getElementById("nombre").value,
      "apellidos": document.getElementById("apellidos").value,
      "email": document.getElementById("email").value,
      "contrasena": document.getElementById("contrasena").value,
      "contrasenaC": document.getElementById("contrasenaC").value
      
    });
    */
    let newUser ={
      "nombre": document.getElementById("nombre").value,
      "apellidos": document.getElementById("apellidos").value,
      "email": document.getElementById("email").value,
      "contrasena": document.getElementById("contrasena").value,
      "contrasenaC": document.getElementById("contrasenaC").value
    }

    let user =getProductsFromStorage();
    user.push(newUser)
    saveProductsToStorage(user)

    alert('Producto agregado');

    /*
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
    */
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
  const user = getProductsFromStorage();
  const userlist = document.getElementById('userlist');
  userlist.innerHTML = '';

  user.forEach((p) => {
    const li = document.createElement('li');
    li.textContent = `Nombre: ${p.nombre}, Apellidos: ${p.apellidos}, Correo: ${p.email}`;
    userlist.appendChild(li);
  });
    /*event.preventDefault();
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
    */
}