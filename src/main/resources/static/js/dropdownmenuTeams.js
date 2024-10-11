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
            'x-rapidapi-key': '62814ce7392f82d3441e6c84135d1f70',
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
        const article = document.createRange().createContextualFragment(`
            <article>
                <img src="${teamLogo}" alt="name">
                <h2>${teamName}</h2>
            </article>
        `);
        cont.append(article);
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

