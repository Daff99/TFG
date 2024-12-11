const optionMenu = document.querySelector(".select-menu");
const select = optionMenu.querySelector(".select-button");
const options = optionMenu.querySelectorAll(".option");
const text = optionMenu.querySelector(".text");

const premierId = 39;
const laligaId = 140;
const bundesligaId = 78;
const serieAId = 135;
const ligue1Id = 61;

// Función para obtener jugadores y sus logos desde la API
function getPlayersAndLogo(leagueId, season, done) {
    const url = `https://v3.football.api-sports.io/players/topscorers?season=${season}&league=${leagueId}`;
    const apiOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6467b905839bb394cd3c678dabff9d81',
            'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    fetch(url, apiOptions)
        .then(response => response.json())
        .then(data => done(data))
        .catch(error => console.error('Error al obtener jugadores:', error));
}

// Función para obtener jugadores favoritos desde el backend
function getFavouritePlayers(done) {
    fetch('/favouritePlayers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return []; // Si no está autenticado, devuelve una lista vacía
        }
        return response.json();
    })
    .then(data => done(data))
    .catch(error => console.error('Error al obtener favoritos:', error));
}

function appendPlayers(container, players, favouritePlayers) {
    const cont = document.querySelector(container);
    cont.querySelectorAll('.player-card').forEach(playerCard => playerCard.remove());
    players.forEach(player => {
        const playerName = player.player.name;
        const playerLogo = player.player.photo;
        const playerId = player.player.id;
        const teamStats = player.statistics[0];
        const teamName = teamStats.team.name;
        const teamLogo = teamStats.team.logo;

        const isFavourite = favouritePlayers.includes(playerId);

        const article = document.createRange().createContextualFragment(`
            <article class="player-card">
                <a href="/showPlayer?id=${playerId}">
                    <img class="photo" src="${playerLogo}" alt="${playerName}">
                </a>
                <div class="player-details">
                    <div class="name-star">
                        <h2>${playerName}</h2>
                        ${isLog ? `
                        <span class="star-icon">
                            <ion-icon name="${isFavourite ? 'star' : 'star-outline'}" data-id="${playerId}" class="${isFavourite ? 'marked' : ''}"></ion-icon>
                        </span>` : ''}
                    </div>
                    <div class="team-info">
                        <h3>${teamName}</h3>
                        <img class="teamLogo" src="${teamLogo}">
                    </div>
                </div>
            </article>
        `);
        cont.append(article);

        if (isLog) {
            const starIcon = cont.lastElementChild.querySelector('.star-icon ion-icon');
            starIcon.addEventListener('click', function () {
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
        }
    });
}

function updatePlayersForSeason(season) {
    console.log(`Actualizando para la temporada: ${season}`);
    getFavouritePlayers(favouritePlayers => {
        getPlayersAndLogo(premierId, season, data => {
            appendPlayers('.premier-players', data.response, favouritePlayers);
        });

        getPlayersAndLogo(laligaId, season, data => {
            appendPlayers('.laliga-players', data.response, favouritePlayers);
        });

        getPlayersAndLogo(bundesligaId, season, data => {
            appendPlayers('.bundesliga-players', data.response, favouritePlayers);
        });

        getPlayersAndLogo(serieAId, season, data => {
            appendPlayers('.serieA-players', data.response, favouritePlayers);
        });

        getPlayersAndLogo(ligue1Id, season, data => {
            appendPlayers('.ligue1-players', data.response, favouritePlayers);
        });
    });
}

const defaultSeason = "2023/2024"; // Temporada por defecto
text.innerText = defaultSeason;
const defaultSeasonYear = defaultSeason.split("/")[0];
updatePlayersForSeason(defaultSeasonYear);

// Controlador del menú desplegable
select.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => {
    option.addEventListener("click", () => {
        let selectedOption = option.innerText;
        text.innerText = selectedOption;
        const season = selectedOption.split("/")[0];
        updatePlayersForSeason(season);
        optionMenu.classList.remove("active");
    });
});
