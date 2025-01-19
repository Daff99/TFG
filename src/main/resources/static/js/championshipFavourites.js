//Obtengo los campeonatos favoritos desde el backend
function getFavouriteChampionships(done) {
    fetch('/favouriteChampionships', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return []; 
        }
        return response.json();
    })
    .then(data => done(data))
    .catch(error => console.error('Error al obtener favoritos:', error));
}

//Actualizar segun los favoritos que tiene el usuario, es decir, si un campeonato está guardado como favorito, la estrella aparecerá rellenada, si no, aparecerá sin rellenar
function updateFavouriteState(favouriteChampionships) {
    const starIcons = document.querySelectorAll('.star-icon ion-icon'); //Recojo todas las estrellas
    starIcons.forEach(starIcon => {
        const championshipId = parseInt(starIcon.getAttribute('data-id')); //Extraigo el id del campeonato
        const isFavourite = favouriteChampionships.includes(championshipId); //Compruebo que el campeonato esta en favoritos
        if (isFavourite) {
            starIcon.setAttribute('name', 'star');
        } else {
            starIcon.setAttribute('name', 'star-outline');
        }
        starIcon.classList.toggle('marked', isFavourite);
    });
}

//Inicializar los favoritos
function initializeFavourites() {
    getFavouriteChampionships(favouriteChampionships => {
        updateFavouriteState(favouriteChampionships);
        const starIcons = document.querySelectorAll('.star-icon ion-icon');
        starIcons.forEach(starIcon => {
            starIcon.addEventListener('click', function () { //Evento de click para cada estrella
                const championshipId = parseInt(this.getAttribute('data-id'));
                const isMarked = this.getAttribute('name') === 'star';
                this.setAttribute('name', isMarked ? 'star-outline' : 'star');
                this.classList.toggle('marked', !isMarked);
                fetch(isMarked ? '/removeFavouriteChampionship' : '/addFavouriteChampionship', { //Si la estrella esta marcada, al pulsar se llama al metodo de eliminar de favoritos, si no esta marcada, pues se llama al metodo de añadir a favoritos
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRF-Token': document.querySelector('input[name=_csrf]').value
                    },
                    body: `id=${championshipId}`
                }).catch(error => console.error('Error al actualizar favoritos:', error));
            });
        });
    });
}

//Inicializo comportamiento de favoritos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    initializeFavourites();
});
