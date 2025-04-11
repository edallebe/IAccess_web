//base de datos en local
const getUsersFromStorage = () => JSON.parse(localStorage.getItem('users')) || [];
const saveUsersToStorage = (users) => localStorage.setItem('users', JSON.stringify(users));

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
      "tipo": document.getElementById("tipo").value,
      "contrasena": document.getElementById("contrasena").value,
      "contrasenaC": document.getElementById("contrasenaC").value
    }

    let user =getUsersFromStorage();
    user.push(newUser)
    saveUsersToStorage(user)

    alert('Registrado');
    //listar();

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
  event.preventDefault();
  const users = getUsersFromStorage();
  const userlist = document.getElementById('userlist');
  userlist.innerHTML = '';

  users.forEach((p, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <strong>Usuario ${i + 1}</strong><br>
      Nombre: ${p.nombre}<br>
      Apellidos: ${p.apellidos}<br>
      Correo: ${p.email}<br>
      Tipo usuario: ${p.tipo}<br>
      <button type="button" onclick="editarUsuario(${i})">Editar</button>
      <button type="button" onclick="eliminarUsuario(${i})">Eliminar</button
      <br><br>
    `;
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

function editarUsuario(index) {
  const users = getUsersFromStorage();
  const user = users[index];

  // Guardar el índice temporalmente para actualizar después
  localStorage.setItem('editIndex', index);

  // Llenar los campos del formulario de modificación
  document.getElementById("nombreU").value = user.nombre;
  document.getElementById("apellidosU").value = user.apellidos;
  document.getElementById("emailU").value = user.email;
  document.getElementById("tipoU").value = user.tipo;
  document.getElementById("contrasenaU").value = user.contrasena;
  document.getElementById("contrasenaCU").value = user.contrasenaC;
}

function actualizar() {
  const index = localStorage.getItem('editIndex');
  if (index === null) {
    alert("Selecciona un usuario para modificar.");
    return;
  }

  let users = getUsersFromStorage();

  users[index] = {
    nombre: document.getElementById("nombreU").value,
    apellidos: document.getElementById("apellidosU").value,
    email: document.getElementById("emailU").value,
    tipo: document.getElementById("tipoU").value,
    contrasena: document.getElementById("contrasenaU").value,
    contrasenaC: document.getElementById("contrasenaCU").value
  };

  saveUsersToStorage(users);
  localStorage.removeItem('editIndex');
  listar();
  alert("Usuario actualizado correctamente");
  limpiarFormularioModificar();
}

function eliminarUsuario(index) {
  if (confirm("¿Estás seguro de que deseas eliminar este usuario?")) {
    let users = getUsersFromStorage();
    users.splice(index, 1); // Elimina el usuario en la posición 'index'
    saveUsersToStorage(users); // Guarda la nueva lista sin ese usuario
    listar(); // Actualiza la lista visual
    alert("Usuario eliminado con éxito.");
  }
}

function limpiarFormularioModificar() {
  document.getElementById("nombreU").value = "";
  document.getElementById("apellidosU").value = "";
  document.getElementById("emailU").value = "";
  document.getElementById("tipoU").value = "";
  document.getElementById("contrasenaU").value = "";
  document.getElementById("contrasenaCU").value = "";
}

