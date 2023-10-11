function toggleMenu() {
    var menu = document.getElementById("main-menu");
    if (menu.style.display === "block" || menu.style.display === "") {
        menu.style.display = "none";
    } else {
        menu.style.display = "block";
    }
}
  
function handleClick(event) {
    var menu = document.getElementById("main-menu");
    // check if the clicked element is not the menu button or the menu itself
    if (!event.target.matches('.menu-button') && !event.target.closest('.menu') && menu.style.display === "block") {
        toggleMenu();
    }
}

document.addEventListener('click', handleClick);