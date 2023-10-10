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

    if(respuesta["message"]){
        console.log(respuesta["message"])
        //agregar aviso al lado del bloque email
    }else{
        const UserP = respuesta["contrasenia"]
        if(UserP === password){
            console.log("logueado")
            //agregar alert
        }
        else{
            console.log("contraseña incorrecta")
            //agregar aviso al lado del bloque de pass
        }
    }
}


loginBTN.addEventListener("click", async () =>{
    const email = document.getElementById("UserEmail").value
    const password = document.getElementById("UserPass").value

    console.log("email: "+email+" pass:"+password)

    await Login(email, password)
})



