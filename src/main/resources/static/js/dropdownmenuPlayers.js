const optionMenu = document.querySelector(".select-menu");
const select = optionMenu.querySelector(".select-button");
const options = optionMenu.querySelectorAll(".option");
const text = optionMenu.querySelector(".text");

const premierId = 39;
const laligaId = 140;
const bundesligaId = 78;
const serieAId = 135;
const ligue1Id = 61;

function getPlayersAndLogo(leagueId, season, done) {
    const url = `https://v3.football.api-sports.io/players/topscorers?season=${season}&league=${leagueId}`;;
    const apiOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '62814ce7392f82d3441e6c84135d1f70',
            'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    const results = fetch(url, apiOptions);
    results.then(response => response.json()).then(data => {
        done(data);
    });
}

function appendPlayers(container, players) {
    const cont = document.querySelector(container);
    cont.querySelectorAll('.player-card').forEach(playerCard => playerCard.remove());
    players.forEach(player => {
        const playerName = player.player.name;
        const playerLogo = player.player.photo;
        const playerId = player.player.id;
        const teamStats = player.statistics[0];
        const teamName = teamStats.team.name;
        const teamLogo = teamStats.team.logo;
        const article = document.createRange().createContextualFragment(`
            <article class="player-card">
                <a href="/showPlayer?id=${playerId}">
                    <img class="photo" src="${playerLogo}" alt="name">
                </a>
                <div class="player-details">
                    <div class="name-star">
                        <h2>${playerName}</h2>
                        ${isLog ? `
                        <span class="star-icon" sec:authorize="isAuthenticated()">
                            <ion-icon name="star-outline"></ion-icon>
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
            starIcon.addEventListener('click', function() {
                const playerData = {id: playerId, name: playerName, logo: playerLogo};
                if (this.getAttribute('name') === 'star-outline') {
                    this.setAttribute('name', 'star');
                    this.classList.add('marked');
                } else {
                    this.setAttribute('name', 'star-outline');
                    this.classList.remove('marked');
                }
                fetch('/addFavouritePlayer', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRF-Token': document.querySelector('input[name=_csrf]').value
                    }, 
                    body: `id=${playerId}` 
                })
                .catch(error => console.error('Error al actualizar favoritos'));
            });
        }
    });
}

function updatePlayersForSeason(season) {
    getPlayersAndLogo(premierId, season, data => {
        appendPlayers('.premier-players', data.response);
    });
    
    getPlayersAndLogo(laligaId, season, data => {
        appendPlayers('.laliga-players', data.response);
    });
    
    getPlayersAndLogo(bundesligaId, season, data => {
        appendPlayers('.bundesliga-players', data.response);
    });
    
    getPlayersAndLogo(serieAId, season, data => {
        appendPlayers('.serieA-players', data.response);
    });
    
    getPlayersAndLogo(ligue1Id, season, data => {
        appendPlayers('.ligue1-players', data.response);
    });
}

const defaultSeason = "2023/2024"; //Por defecto, cada vez que cargue la pagina aparecerá la temporada 2023/2024
text.innerText = defaultSeason;
const defaultSeasonYear = defaultSeason.split("/")[0];
updatePlayersForSeason(defaultSeasonYear);

select.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => { //Por cada opcion del desplegable añado un evento de click
    option.addEventListener("click", () => { 
        let selectedOption = option.innerText; //Cojo la opcion seleccionada
        text.innerText = selectedOption; //La coloco en el contenido de mi select-menu
        const season = selectedOption.split("/")[0]; //Obtengo el año de la temporada seleccionada
        updatePlayersForSeason(season);
        optionMenu.classList.remove("active") //Dejo de visualizar las demas opciones del desplegable
    });
});

