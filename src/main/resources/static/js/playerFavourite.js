//Obtengo los equipos favoritos desde el backend
function getFavouritePlayers(done) {
    fetch('/favouritePlayers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return []; //Devuelve una lista vacía si el usuario no está autenticado
        }
        return response.json();
    })
    .then(data => done(data))
    .catch(error => console.error('Error al obtener favoritos:', error));
}

function updateFavouriteState(favouritePlayers) {
    const starIcons = document.querySelectorAll('.star-icon ion-icon');
    starIcons.forEach(starIcon => {
        const playerId = parseInt(starIcon.getAttribute('data-id'));
        const isFavourite = favouritePlayers.includes(playerId);
        starIcon.setAttribute('name', isFavourite ? 'star' : 'star-outline');
        starIcon.classList.toggle('marked', isFavourite);
    });
}

function initializeFavourites() {
    getFavouritePlayers(favouritePlayers => {
        updateFavouriteState(favouritePlayers);
        const starIcons = document.querySelectorAll('.star-icon ion-icon');
        starIcons.forEach(starIcon => {
            starIcon.addEventListener('click', function () {
                const playerId = parseInt(this.getAttribute('data-id'));
                const isMarked = this.getAttribute('name') === 'star';
                this.setAttribute('name', isMarked ? 'star-outline' : 'star');
                this.classList.toggle('marked', !isMarked);
                fetch(isMarked ? '/removeFavouritePlayer' : '/addFavouritePlayer', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRF-Token': document.querySelector('input[name=_csrf]').value
                    },
                    body: `id=${playerId}`
                }).catch(error => console.error('Error al actualizar favoritos:', error));
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeFavourites();
});
