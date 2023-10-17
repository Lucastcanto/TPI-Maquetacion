const lista = document.getElementById("lista")
const form = document.getElementById("loginForm")
const loginBTN = document.getElementById("loginBtn")

async function getUser(email) {

    const url = "https://api-tpi-production.up.railway.app/api/login/"+email
    const options = {
        method: "GET"
    }

    try{
        const response = await fetch(url, options)
        const data = await response.json()

        return data
    }
    catch(error){
        return error
    }
}

async function getPokemon(id){
    let url = "https://pokeapi.co/api/v2/pokemon/"+ id.toString();
    
    let res = await fetch(url)
    let pokemonInfo = await res.json();

    //name
    let pokemonName = pokemonInfo["name"];

    //type
    let pokemonTypes = []
    for (let index = 0; index < pokemonInfo["types"].length; index++) {
        const element = pokemonInfo["types"][index];
        pokemonTypes.push(element["type"]["name"])
    }

    //img
    let pokemonImg = pokemonInfo["sprites"]["front_default"]; // returns URL of img

    //desc
    res = await fetch(pokemonInfo["species"]["url"]);
    let pokemonDesc = await res.json();
    pokemonDesc = pokemonDesc["flavor_text_entries"];
    pokemonDesc = pokemonDesc.find(desc => desc["language"]["name"] == "es")
    pokemonDesc = pokemonDesc["flavor_text"]

    //push info in array
    return {"id" : id ,"name" : pokemonName, "img" : pokemonImg, "type" : pokemonTypes, "desc" : pokemonDesc}

}

async function getPokemonList(){
    const pokedex = []

    for (let index = 1; index <= 151; index++) {
        const pokemon = await getPokemon(index)
        //console.log(pokemon)
        pokedex.push(pokemon)
    }

    const data = JSON.stringify(pokedex)
    localStorage.setItem("pokedex", data)
}

async function Login (email, password){
    const respuesta = await getUser(email)
    const errorMessage = document.getElementById("error-message");

    if(respuesta["message"]){
        console.log(respuesta["message"])
        errorMessage.textContent = "Correo no encontrado.";
 
    }else{
        errorMessage.textContent = "";
        const UserP = respuesta["contrasenia"]
        if(UserP === password){
            console.log("logueado")
            await getPokemonList()
            localStorage.setItem('usuario', JSON.stringify(respuesta));
            swal("Usuario Logueado con Exito.",{
                icon: "success",
              });
            console.log(localStorage.getItem("user"));
            setTimeout(function () {
                window.location.href = "/vistaPrincipal.html";
            }, 2000);
        }
        else{
            console.log("contraseña incorrecta")
            errorMessage.textContent = "Contrasenia incorrecta.";
        }
    }
}


loginBTN.addEventListener("click", async (e) =>{
    e.preventDefault(); 
    const email = document.getElementById("UserEmail").value
    const password = document.getElementById("UserPass").value

    console.log("email: "+email+" pass:"+password)

    await Login(email, password)
})



