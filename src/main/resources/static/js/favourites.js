function toggleFavouritesChampionship(icon) {
    const isMarked = icon.getAttribute('name') === 'star';
    const championshipId = icon.getAttribute('data-id');

    icon.setAttribute('name', isMarked ? 'star-outline' : 'star');
    icon.classList.toggle('marked', !isMarked);

    fetch('/addFavouriteChampionship', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-Token': document.querySelector('input[name=_csrf]').value
        }, 
        body: `id=${championshipId}` 
    })
    .catch(error => console.error('Error al actualizar favoritos'));
}

function toggleFavouritesPlayer(icon) {
    const isMarked = icon.getAttribute('name') === 'star';
    const playerId = icon.getAttribute('data-id');

    icon.setAttribute('name', isMarked ? 'star-outline' : 'star');
    icon.classList.toggle('marked', !isMarked);

    fetch('/addFavouritePlayer', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-Token': document.querySelector('input[name=_csrf]').value
        }, 
        body: `id=${playerId}` 
    })
    .catch(error => console.error('Error al actualizar favoritos'));
}

function toggleFavouritesTeam(icon) {
    const isMarked = icon.getAttribute('name') === 'star';
    const teamId = icon.getAttribute('data-id');

    icon.setAttribute('name', isMarked ? 'star-outline' : 'star');
    icon.classList.toggle('marked', !isMarked);

    fetch('/addFavouriteTeam', {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-Token': document.querySelector('input[name=_csrf]').value
        }, 
        body: `id=${teamId}` 
    })
    .catch(error => console.error('Error al actualizar favoritos'));
}

function removePlayerFromFavorites(trashIcon) {
    const liElement = trashIcon.closest('li'); 
    const playerId = liElement.getAttribute('data-player-id'); 
    fetch('/removeFavouritePlayer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-Token': document.querySelector('input[name=_csrf]').value 
        },
        body: `id=${playerId}`
    })
    .then(response => {
        if (response.ok) {
            liElement.remove();
        }
    });
}

function removeTeamFromFavorites(trashIcon) {
    const liElement = trashIcon.closest('li'); 
    const teamId = liElement.getAttribute('data-team-id'); 
    fetch('/removeFavouriteTeam', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-Token': document.querySelector('input[name=_csrf]').value 
        },
        body: `id=${teamId}`
    })
    .then(response => {
        if (response.ok) {
            liElement.remove();
        }
    });
}

function removeChampionshipFromFavorites(trashIcon) {
    const liElement = trashIcon.closest('li'); 
    const championshipId = liElement.getAttribute('data-championship-id'); 
    fetch('/removeFavouriteChampionship', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-CSRF-Token': document.querySelector('input[name=_csrf]').value 
        },
        body: `id=${championshipId}`
    })
    .then(response => {
        if (response.ok) {
            liElement.remove();
        }
    });
}
