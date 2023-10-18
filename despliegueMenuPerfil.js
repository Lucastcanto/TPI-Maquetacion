///FOTO DE PERFIL.
function toggleProfileMenu() {
    const profileMenu = document.getElementById("profileMenu");
    console.log(profileMenu.style.display);
    if (profileMenu.style.display === "block") {
      profileMenu.style.display = "none"; // Oculta el menú si está visible
    } else {
        console.log(profileMenu.style.display);
      profileMenu.style.display = "block"; // Muestra el menú si está oculto
    }
  }
  
  