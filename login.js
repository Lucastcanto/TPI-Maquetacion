const lista = document.getElementById("lista")

async function getUsers() {

    const url = "https://api-tpi-production.up.railway.app/api/login/"
    const options = {
        method: "GET"
    }

    try{
        const response = await fetch(url, options)
        const data = await response.json()

        console.log(data)

        console.log(data[0])
        
        data.forEach(user => {
            const nombre =  user["nombre"]
            
            const item = document.createElement("li")

            item.innerText = nombre

            lista.appendChild(item)
        });
        
    }
    catch(error){
        return error
    }
}

getUsers()