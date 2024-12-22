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
    const url = `https://v3.football.api-sports.io/fixtures?league=${leagueId}&season=${season}`;
    const apiOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6467b905839bb394cd3c678dabff9d81',
            'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    fetch(url, apiOptions)
        .then(response => response.json())
        .then(data => done(data.response))
        .catch(error => console.error("Error al cargar los partidos:", error));
}

function appendMatches(container, matches) {
    const cont = document.querySelector(container);
    cont.querySelectorAll('.article-matches').forEach(articleMatches => articleMatches.remove());
    matches.forEach(match => {
        const date_ = match.fixture.date.split("T")[0];
        const [year, month, day] = date_.split("-");
        const formattedDate = `${day}-${month}-${year}`;
        const localTeamId = match.teams.home.id;
        const awayTeamId = match.teams.away.id;
        const localTeamName = match.teams.home.name;
        const localTeamLogo = match.teams.home.logo;
        const awayTeamName = match.teams.away.name;
        const awayTeamLogo = match.teams.away.logo;
        const resultHome = match.goals.home ?? '-';
        const resultAway = match.goals.away ?? '-';

        const article = document.createRange().createContextualFragment(`
            <article class="article-matches">
                <h2>${formattedDate}</h2>
                <div class="match-info">
                    <a href="/showTeam?id=${localTeamId}">
                        <p class="localName">${localTeamName}</p>
                    </a>
                    <div class="result">
                        <img src="${localTeamLogo}" alt="LocalLogo">
                        <p class="localResult">${resultHome}</p>
                        <p>-</p>
                        <p class="awayResult">${resultAway}</p>
                        <img src="${awayTeamLogo}" alt="AwayLogo">
                    </div>
                    <a href="/showTeam?id=${awayTeamId}">
                        <p class="awayName">${awayTeamName}</p>
                    </a>
                </div>
            </article>
        `);
        cont.append(article);
    });
}

function updateMatchWeek(season) {
    getMatches(season, matches => {
        allMatches = matches;
        filterByMW(1); // Mostrar la primera jornada por defecto
        textMW.innerText = "Jornada 1";
    });
}

function filterByMW(mw) {
    const filteredMatches = allMatches.filter(m => {
        if (m.league && m.league.round) {
            const roundParts = m.league.round.split(" - ");
            if (roundParts.length > 1) {
                const matchWeek = roundParts[1];
                return matchWeek === mw.toString();
            }
        }
        return false;
    });
    appendMatches(".matches", filteredMatches);
}

const defaultSeason = "2023/2024";
text.innerText = defaultSeason;
const defaultSeasonYear = defaultSeason.split("/")[0];
updateMatchWeek(defaultSeasonYear);

// Eventos para menús desplegables
select.addEventListener("click", () => optionMenu.classList.toggle("active"));
options.forEach(option => {
    option.addEventListener("click", () => {
        const selectedOption = option.innerText;
        text.innerText = selectedOption;
        const season = selectedOption.split("/")[0];
        updateMatchWeek(season);
        optionMenu.classList.remove("active");
    });
});

selectMW.addEventListener("click", () => optionMenuMW.classList.toggle("active"));
optionsMW.forEach(op => {
    op.addEventListener("click", () => {
        const selectedMW = op.innerText.split(" ")[1];
        textMW.innerText = op.innerText;
        filterByMW(selectedMW);
        optionMenuMW.classList.remove("active");
    });
});
