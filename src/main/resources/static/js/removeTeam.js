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

