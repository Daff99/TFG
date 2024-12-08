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
