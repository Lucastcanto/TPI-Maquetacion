///FOTO DE PERFIL.
function toggleProfileMenu() {
    const profileMenu = document.getElementById("profileMenu");
    if (profileMenu.style.display === "block") {
      profileMenu.style.display = "none"; // Oculta el menú si está visible
    } else {
      profileMenu.style.display = "block"; // Muestra el menú si está oculto
    }
  }
  
  function logOut()
  {
    console.log(" hola");
    localStorage.clear();
  }