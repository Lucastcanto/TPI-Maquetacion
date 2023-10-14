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



