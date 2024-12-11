const optionMenu = document.querySelector(".select-menu");
const select = optionMenu.querySelector(".select-button");
const options = optionMenu.querySelectorAll(".option");
const text = optionMenu.querySelector(".text");

const premierId = 39;
const laligaId = 140;
const bundesligaId = 78;
const serieAId = 135;
const ligue1Id = 61;

function getTeamsAndLogo(leagueId, season, done) {
    const url = `https://v3.football.api-sports.io/teams?league=${leagueId}&season=${season}`;
    const apiOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6467b905839bb394cd3c678dabff9d81',
            'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    const results = fetch(url, apiOptions);
    results.then(response => response.json()).then(data => {
        done(data);
    });
}

function appendTeams(container, teams) {
    const cont = document.querySelector(container);
    cont.innerHTML = ''; 
    teams.forEach(team => {
        const teamName = team.team.name;
        const teamLogo = team.team.logo;
        const teamId = team.team.id;
        const article = document.createRange().createContextualFragment(`
            <article>
                <a href="/showTeam?id=${teamId}">
                    <img src="${teamLogo}" alt="${teamName}" loading="lazy">
                </a>
                <h2>${teamName}</h2>
                ${isLog ? `
                    <span class="star-icon" sec:authorize="isAuthenticated()">
                        <ion-icon name="star-outline"></ion-icon>
                    </span>` : ''}
            </article>
        `);
        cont.append(article);
        if (isLog) {
            const starIcon = cont.lastElementChild.querySelector('.star-icon ion-icon');
            starIcon.addEventListener('click', function() {
                const teamData = {id: teamId, name: teamName, logo: teamLogo};
                if (this.getAttribute('name') === 'star-outline') {
                    this.setAttribute('name', 'star');
                    this.classList.add('marked'); 
                } else {
                    this.setAttribute('name', 'star-outline');
                    this.classList.remove('marked');
                }
                fetch('/addFavouriteTeam', {
                    method: 'POST', 
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-CSRF-Token': document.querySelector('input[name=_csrf]').value
                    }, 
                    body: `teamId=${teamId}` 
                })
                .catch(error => console.error('Error al actualizar favoritos'));
            });
        }
    });
}

function updateTeamsForSeason(season) {
    getTeamsAndLogo(premierId, season, data => {
        appendTeams('.premier-teams', data.response);
    });
    
    getTeamsAndLogo(laligaId, season, data => {
        appendTeams('.laliga-teams', data.response);
    });
    
    getTeamsAndLogo(bundesligaId, season, data => {
        appendTeams('.bundesliga-teams', data.response);
    });
    
    getTeamsAndLogo(serieAId, season, data => {
        appendTeams('.serieA-teams', data.response);
    });
    
    getTeamsAndLogo(ligue1Id, season, data => {
        appendTeams('.ligue1-teams', data.response);
    });
}

const defaultSeason = "2023/2024"; //Por defecto, cada vez que cargue la pagina aparecerá la temporada 2023/2024
text.innerText = defaultSeason;
const defaultSeasonYear = defaultSeason.split("/")[0];
updateTeamsForSeason(defaultSeasonYear);

select.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => { //Por cada opcion del desplegable añado un evento de click
    option.addEventListener("click", () => { 
        let selectedOption = option.innerText; //Cojo la opcion seleccionada
        text.innerText = selectedOption; //La coloco en el contenido de mi select-menu
        const season = selectedOption.split("/")[0]; //Obtengo el año de la temporada seleccionada
        updateTeamsForSeason(season);
        optionMenu.classList.remove("active") //Dejo de visualizar las demas opciones del desplegable
    });
});

