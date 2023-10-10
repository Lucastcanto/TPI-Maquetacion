const singupBtn = document.getElementById("registerBtn")

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


singupBtn.addEventListener("click", async ()=>{
    const Unombre = document.getElementById("UserNombre").value
    const Uapellido = document.getElementById("UserApellido").value
    const Uemail = document.getElementById("UserEmail").value
    const Upassword = document.getElementById("UserPassword").value

    const response = await addUser(Unombre, Uapellido, Uemail, Upassword)
    console.log(response)
    if(response["message"]){
        console.log("ingrese un email valido")
        //error en casilla mail
    }
    else{
        console.log("usuario agregado con exito")
        window.location.href = "/vistaPrincipal.html";
    }
})