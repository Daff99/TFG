const searchBar = document.getElementById('search-bar');
const resultsContainer = document.getElementById('search-results');

document.addEventListener('click', function(event) {
    if (!searchBar.contains(event.target) && !resultsContainer.contains(event.target)) {
        resultsContainer.innerHTML = '';
    }
});

searchBar.addEventListener('focus', function() {
    if (this.ariaValueMax.length >= 3) {
        this.dispatchEvent(new Event('input'));
    }
});

searchBar.addEventListener('input', function() {
    const query = this.value;
    if (query.length < 3) {
        resultsContainer.innerHTML = '';
        return;
    }
    fetch(`/searchTeams?query=${query}`)
        .then(response => response.json()).then(teams => {
            resultsContainer.innerHTML = '';
            teams.forEach(team => {
                const teamElement = document.createElement('div');
                teamElement.innerHTML = 
                `<a href="/showTeam?id=${team.apiId}">
                        <img class="searchTeamImage" src="${team.image}" alt="${team.name}">
                        <h3 class="searchTeamName">${team.name}</h3>
                    </a>`;
                resultsContainer.appendChild(teamElement);
            });
        })
        .catch(error => console.error('Error al buscar equipos:', error));
});