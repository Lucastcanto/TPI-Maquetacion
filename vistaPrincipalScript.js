const usuario = JSON.parse(localStorage.getItem('usuario'));
const pokedex = JSON.parse(localStorage.getItem('pokedex'));
if (usuario)
{
    document.getElementById('usuario').innerText = `¡Coleccion de: ${usuario["nombre"]}!`; 
}
else
{
    console.log("usuario no llego");
}

const userPerfil = document.getElementById("userPerfil");
