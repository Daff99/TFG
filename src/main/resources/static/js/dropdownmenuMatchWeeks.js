const optionMenu = document.querySelector(".select-menuMW");
const select = optionMenu.querySelector(".select-buttonMW");
const options = optionMenu.querySelectorAll(".optionMW");
const text = optionMenu.querySelector(".textMW");

select.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => { //Por cada opcion del desplegable añado un evento de click
    option.addEventListener("click", () => { 
        let selectedOption = option.innerText; //Cojo la opcion seleccionada
        text.innerText = selectedOption; //La coloco en el contenido de mi select-menu
        optionMenu.classList.remove("active") //Dejo de visualizar las demas opciones del desplegable
    })
}) 