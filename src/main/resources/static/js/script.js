const links = document.querySelectorAll('.menu-link');
const contentDiv = document.getElementById('container');

function loadPage(page) {
    fetch('/' + page).then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar la pagina');
        }
        return response.text();
    }).then(data => {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;
        const newContent = tempDiv.querySelector('#container');    
        if (newContent) {
            contentDiv.innerHTML = newContent.innerHTML;
        } else {
            contentDiv.innerHTML = 'Contenido no encontrado';
        }
    }).catch(error => {
        contentDiv.innerHTML = '<p>Error: ${error.message}</p>'
    });
}

links.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const page = event.target.getAttribute('data-page');
        loadPage(page);
    });
});
loadPage('live');