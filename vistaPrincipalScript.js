const usuario = JSON.parse(localStorage.getItem('usuario'));
if (usuario)
{
    document.getElementById('usuario').innerText = `¡Coleccion de: ${usuario["nombre"]}!`; 
}
else
{
    console.log("usuario no llego");
}