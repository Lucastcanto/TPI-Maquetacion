const HTMLlist = document.getElementById("pokemon-list")
const HTMLimg = document.getElementById("pokemon-img")
const HTMLname = document.getElementById("pokemon-name")
const HTMLtypesList = document.getElementById("types-list")
const HTMLdesc = document.getElementById("pokemon-desc")

const pokedex = JSON.parse(localStorage.getItem("pokedex"))

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
    pokedex.push({"id" : id ,"name" : pokemonName, "img" : pokemonImg, "type" : pokemonTypes, "desc" : pokemonDesc})

}

async function updatePokemon(){

    const pokemon = pokedex[(this.id)-1]   
    console.log(pokemon)

    HTMLimg.src = pokemon["img"]
    HTMLdesc.innerText = pokemon["desc"]
    HTMLname.innerText = pokemon["name"].toUpperCase();

    //clear previous types
    while(HTMLtypesList.firstChild){
        HTMLtypesList.firstChild.remove();
    }

    //update types
    for(let i = 0; i< pokemon["type"].length; i++){
        let type = document.createElement("li")
        type.innerText = pokemon["type"][i]
        type.classList.add("type-box")
        type.classList.add(pokemon["type"][i])

        HTMLtypesList.appendChild(type)
    }
}

window.onload = async function() {
    //for (let index = 0; index < 151; index++) {
    //    await getPokemon(index+1)
    //}
    pokedex.forEach(pokemon => {
        console.log(pokemon)
        const item = document.createElement("button")
        item.classList.add("pokemon-list")
        item.id = pokemon["id"]
        item.innerText = pokemon["id"]+". "+ pokemon["name"].toUpperCase();
        HTMLlist.appendChild(item)

        item.addEventListener("click", updatePokemon)
    }); 
}

