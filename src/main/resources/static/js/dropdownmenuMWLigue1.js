const optionMenu = document.querySelector(".select-menu");
const select = optionMenu.querySelector(".select-button");
const options = optionMenu.querySelectorAll(".option");
const text = optionMenu.querySelector(".text");

const optionMenuMW = document.querySelector(".select-menuMW");
const selectMW = optionMenuMW.querySelector(".select-buttonMW");
const optionsMW = optionMenuMW.querySelectorAll(".optionMW");
const textMW = optionMenuMW.querySelector(".textMW");

let allMatches = [];

function getMatches(season, done) {
    const url = `https://v3.football.api-sports.io/fixtures?league=61&season=${season}`;
    const apiOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '62814ce7392f82d3441e6c84135d1f70',
            'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    const results = fetch(url, apiOptions);
    results.then(response => response.json()).then(data => {
        done(data.response);
    });
}

function appendMatches(container, matches) {
    const cont = document.querySelector(container);
    cont.innerHTML = '';
    matches.forEach(match => {
        const date_ = match.fixture.date.split("T")[0];
        const [year, month, day] = date_.split("-");
        const date2_ = `${day}-${month}-${year}`;
        const localTeamName = match.teams.home.name;
        const localTeamLogo = match.teams.home.logo;
        const awayTeamName = match.teams.away.name;
        const awayTeamLogo = match.teams.away.logo;
        const resultHome = match.goals.home;
        const resultAway = match.goals.away;
        const article = document.createRange().createContextualFragment(`
            <article>
                <h2>${date2_}</h2>
                <div class="match-info">
                    <p class="localName">${localTeamName}</p>
                    <div class="result">
                    <img src="${localTeamLogo}" alt="LocalLogo">
                        <p class="localResult">${resultHome}</p>
                        <p>-</p>
                        <p class="awayResult">${resultAway}</p>
                        <img src="${awayTeamLogo}" alt="AwayLogo">
                    </div>
                    <p class="awayName">${awayTeamName}</p>
                </div>
            </article>
        `);
        cont.append(article);
    })
}

function updateMatchWeek(season) {
    getMatches(season, matches => {
        allMatches = matches;
        filterByMW(1);
        textMW.innerText = "Jornada 1";
    });
}

function filterByMW(mw) {
    const filteredMatches = allMatches.filter(m => {
        const num = m.league.round.split(" - ")[1];
        return num === mw.toString();
    });
    appendMatches(".matches", filteredMatches);
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
    });
});

selectMW.addEventListener("click", () => optionMenuMW.classList.toggle("active"));

optionsMW.forEach(op => {
    op.addEventListener("click", () => {
        let selectedMW = op.innerText.split(" ")[1];
        textMW.innerText = op.innerText;
        filterByMW(selectedMW);
        optionMenuMW.classList.remove("active");
    });
});