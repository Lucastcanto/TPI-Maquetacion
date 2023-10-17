const singupBtn = document.getElementById("registerBtn")

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

async function addUser(Unombre, Uapellido, Uemail, Upassword){
    const url = "https://api-tpi-production.up.railway.app/api/users"
    const options = {
        method: "POST",
        headers : {'Content-Type': 'application/json', 'charset': 'utf-8'},
        body: JSON.stringify(
            {
                nombre: Unombre,
                apellido: Uapellido,
                email: Uemail,
                contrasenia: Upassword
            }
        )
    }

    try{
        const response = await fetch(url, options)
        const data = await response.json()
        return data
    }
    catch(error){
        console.log(error)
    }
}


singupBtn.addEventListener("click", async (e)=>{
    e.preventDefault(); 
    const Unombre = document.getElementById("UserNombre").value
    const Uapellido = document.getElementById("UserApellido").value
    const Uemail = document.getElementById("UserEmail").value
    const Upassword = document.getElementById("UserPassword").value

    const response = await addUser(Unombre, Uapellido, Uemail, Upassword)
    const errorMessage = document.getElementById("error-message");
    console.log(response)
    if(response["message"]){
        console.log("ingrese un email valido")
        errorMessage.textContent = "Ingrese mail valido.";
    }
    else{
        errorMessage.textContent = "";
        console.log("usuario agregado con exito")
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
})