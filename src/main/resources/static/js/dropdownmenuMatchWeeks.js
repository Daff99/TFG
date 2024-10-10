const optionMenu = document.querySelector(".select-menu");
const select = optionMenu.querySelector(".select-button");
const options = optionMenu.querySelectorAll(".option");
const text = optionMenu.querySelector(".text");

function getMatches(season, done) {
    const url = `https://v3.football.api-sports.io/fixtures?league=39&season=${season}`;
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

function appendMatches(container, matches) {
    const cont = document.querySelector(container);
    cont.innerHTML = '';
    matches.forEach(match => {
        const matchweek = match.league.round;
        const localTeamName = match.teams.home.name;
        const localTeamLogo = match.teams.home.logo;
        const awayTeamName = match.teams.away.name;
        const awayTeamLogo = match.teams.away.logo;
        const resultHome = match.goals.home;
        const resultAway = match.goals.away;
        const article = document.createRange().createContextualFragment(`
            <article>
                <div class="image-container-localLogo">
                    <img src="${localTeamLogo}" alt="LocalLogo">
                </div>
                <div class="image-container-awayLogo">
                    <img src="${awayTeamLogo}" alt="AwayLogo">
                </div>
                <p>${matchweek}</p>
                <p>${localTeamName}</p>
                <p>${awayTeamName}</p>
                <p>${resultHome}</p>
                <p>${resultAway}</p>
            </article>
        `);
        cont.append(article);
    })
}

function updateMatchWeek(season) {
    getMatches(season, data => {
        appendMatches('.matches', data.response);
    });
}

const defaultSeason = "2023/2024"; //Por defecto, cada vez que cargue la pagina aparecerá la temporada 2023/2024
text.innerText = defaultSeason;

const defaultSeasonYear = defaultSeason.split("/")[0];
updateMatchWeek(defaultSeasonYear);

select.addEventListener("click", () => optionMenu.classList.toggle("active"));

options.forEach(option => { //Por cada opcion del desplegable añado un evento de click
    option.addEventListener("click", () => { 
        let selectedOption = option.innerText; //Cojo la opcion seleccionada
        text.innerText = selectedOption; //La coloco en el contenido de mi select-menu
        const season = selectedOption.split("/")[0];
        updateMatchWeek(season);
        optionMenu.classList.remove("active") //Dejo de visualizar las demas opciones del desplegable
    })
}) 