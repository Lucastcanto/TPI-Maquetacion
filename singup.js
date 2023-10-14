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
        localStorage.setItem('usuario', JSON.stringify(respuesta));
        window.location.href = "/vistaPrincipal.html";
    }
})