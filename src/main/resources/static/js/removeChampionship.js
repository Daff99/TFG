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