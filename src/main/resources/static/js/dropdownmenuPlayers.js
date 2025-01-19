const optionMenu = document.querySelector(".select-menu");
const select = optionMenu.querySelector(".select-button");
const options = optionMenu.querySelectorAll(".option");
const text = optionMenu.querySelector(".text");

const premierId = 39;
const laligaId = 140;
const bundesligaId = 78;
const serieAId = 135;
const ligue1Id = 61;

const searchBar = document.getElementById('search-bar');
const resultsContainer = document.getElementById('search-results');

//Obtengo los jugadores desde la API
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

//Obtengo los jugadores favoritos desde el backend
function getFavouritePlayers(done) {
    fetch('/favouritePlayers', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            return []; //Si el usuario no está autenticado, devuelve una lista vacía
        }
        return response.json();
    })
    .then(data => done(data))
    .catch(error => console.error('Error al obtener favoritos:', error));
}

function appendPlayers(container, players, favouritePlayers) {
    const cont = document.querySelector(container);
    cont.querySelectorAll('.player-card').forEach(playerCard => playerCard.remove()); //Me sirve para mantener el titulo en el div
    const limitedPlayers = players.slice(0, 10); //La API me devuelve 20 jugadores por liga, pero lo limito a 10
    const playerCards = limitedPlayers.map(player => createPlayerCard(player, favouritePlayers));
    playerCards.forEach(card => cont.append(card)); 
}

function createPlayerCard(player, favouritePlayers) {
    let playerName = player.player.name;
    const playerLogo = player.player.photo;
    const playerId = player.player.id;
    const teamStats = player.statistics[0];
    const teamName = teamStats.team.name;
    const teamLogo = teamStats.team.logo;
    const teamId = teamStats.team.id;
    const isFavourite = favouritePlayers.includes(playerId);
    const article = document.createRange().createContextualFragment(`
        <article class="player-card">
            <img class="photo" src="${playerLogo}" alt="${playerName}">
            <div class="player-details">
                <div class="name-star">
                    <a href="/showPlayer?id=${playerId}">
                        <h2>${playerName}</h2>
                    </a>    
                    ${isLog ? ` 
                    <span class="star-icon">
                        <ion-icon name="${isFavourite ? 'star' : 'star-outline'}" data-id="${playerId}" class="${isFavourite ? 'marked' : ''}"></ion-icon>
                    </span>` : ''}
                </div>
                <div class="team-info">
                    <a href="/showTeam?id=${teamId}">
                        <h3>${teamName}</h3>
                    </a>
                    <img class="teamLogo" src="${teamLogo}">
                </div>
            </div>
        </article>
    `);
    if (isLog) {
        setUpStarIcon(article, playerId);
    }
    return article;
}

function setUpStarIcon(article, playerId) {
    const starIcon = article.querySelector('.star-icon ion-icon');
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
    
function updatePlayersForSeason(season) {
    getFavouritePlayers(favouritePlayers => { //Segun la temporada que me llega, actualizo los jugadores
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

const defaultSeason = "2023/2024"; //Muestro esta temporada por defecto
text.innerText = defaultSeason;
const defaultSeasonYear = defaultSeason.split("/")[0]; //Las temporadas se enumeran como "2018/2019" pero necesito sacar el primer valor, ya que la API almacena las temporadas como un valor unico (2018, 2019 etc)
updatePlayersForSeason(defaultSeasonYear);

//Para desplegar las opciones del desplegable cuando hago click en el
select.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => { //A cada opcion del desplegable le añado un evento de click
    option.addEventListener("click", () => {
        let selectedOption = option.innerText; //Extraigo el texto de la opcion seleccionada
        text.innerText = selectedOption; //La coloco en el contenido de mi select-menu
        const season = selectedOption.split("/")[0]; //Saco la temporada
        updatePlayersForSeason(season);
        optionMenu.classList.remove("active"); //Cierro el desplegable cuando hago click
    });
});

//Cuando el usuario hace click fuera de la barra de busqueda, se cierra el div de resultados
document.addEventListener('click', function(event) {
    if (!searchBar.contains(event.target) && !resultsContainer.contains(event.target)) {
        resultsContainer.innerHTML = '';
    }
});

searchBar.addEventListener('focus', function() {
    if (this.value.length >= 3) {
        this.dispatchEvent(new Event('input'));
    }
});

searchBar.addEventListener('input', function() {
    const query = this.value; //Obtengo el valor del texto
    if (query.length < 3) { //Si el texto introducido es menor que 3 no se muestra nada
        resultsContainer.innerHTML = '';
        return;
    }
    fetch(`/searchPlayers?query=${query}`) //Se realiza una llamada al backend para buscar jugadores
        .then(response => response.json()).then(players => {
            resultsContainer.innerHTML = '';
            players.forEach(player => { //Por cada jugador se crea un div con los datos del jugador
                const resultDiv = document.createElement('div');
                resultDiv.innerHTML = `
                    <a href="/showPlayer?id=${player.id}">
                        <img class="searchPlayerImage" src="${player.image}" alt="${player.name}">
                        <h3 class="searchPlayerName">${player.name}</h3>
                    </a>
                `;
                resultsContainer.appendChild(resultDiv);
            });
        })
        .catch(error => console.error('Error al buscar jugadores:', error));
});

