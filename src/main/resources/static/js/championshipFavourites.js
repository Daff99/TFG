// Función para obtener equipos favoritos desde el backend
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

// Función para actualizar el estado de favoritos en el DOM
function updateFavouriteState(favouriteChampionships) {
    const starIcons = document.querySelectorAll('.star-icon ion-icon');
    starIcons.forEach(starIcon => {
        const championshipId = parseInt(starIcon.getAttribute('data-id'));
        const isFavourite = favouriteChampionships.includes(championshipId);
        starIcon.setAttribute('name', isFavourite ? 'star' : 'star-outline');
        starIcon.classList.toggle('marked', isFavourite);
    });
}

// Función para inicializar el comportamiento de favoritos
function initializeFavourites() {
    getFavouriteChampionships(favouriteChampionships => {
        updateFavouriteState(favouriteChampionships);

        const starIcons = document.querySelectorAll('.star-icon ion-icon');
        starIcons.forEach(starIcon => {
            starIcon.addEventListener('click', function () {
                const championshipId = parseInt(this.getAttribute('data-id'));
                const isMarked = this.getAttribute('name') === 'star';
                this.setAttribute('name', isMarked ? 'star-outline' : 'star');
                this.classList.toggle('marked', !isMarked);

                fetch(isMarked ? '/removeFavouriteChampionship' : '/addFavouriteChampionship', {
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

// Inicializar comportamiento de favoritos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    initializeFavourites();
});
