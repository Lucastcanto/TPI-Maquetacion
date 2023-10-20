const usuario=JSON.parse(localStorage.getItem("usuario"));
const nombre = usuario["nombre"];
const apellido = usuario["apellido"];
const email = usuario["email"]
const contrasenia = usuario["contrasenia"];

document.getElementById("nombre").placeholder=nombre;
document.getElementById("apellido").placeholder=apellido;
document.getElementById("email").placeholder=email;
document.getElementById("contrasenia").placeholder=contrasenia;



