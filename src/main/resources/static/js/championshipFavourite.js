function toggleFavourites(icon) {
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
