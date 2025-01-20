document.addEventListener("DOMContentLoaded", () => {
    const teamId = getTeamIdFromURL();
    if (!validateTeamId(teamId)) return;
    loadTeamInfo(teamId);
    initializeSeasonDropdown(teamId, leagueId); 
});

function validateTeamId(teamId) {
    if (!teamId) {
        console.error("No se encontró el ID del equipo en la URL");
        return false;
    }
    return true;
}

function loadTeamInfo(teamId) {
    getInfo(teamId, data => {
        appendInfo(".info-team", data);
    });
}

//En otras partes de mi codigo no tengo esta funcion porque no necesito tener cargado el id del equipo o de la competicion sin tener cargada completamente mi pagina, pero aqui si, para poder ir mostrando los datos sin que haya referencias nulas
function initializeSeasonDropdown(teamId, leagueId) {
    const defaultSeason = "2023/2024";
    const text = document.querySelector(".select-button .text");
    text.innerText = defaultSeason;
    const defaultSeasonYear = defaultSeason.split("/")[0];
    updateStatsForSeason(defaultSeasonYear, teamId, leagueId);
    const select = document.querySelector(".select-button");
    const options = document.querySelectorAll(".option");
    setupDropdown(select, options, text, teamId, leagueId);
}

//Configuracion del menu desplegable
function setupDropdown(select, options, text, teamId, leagueId) {
    const optionMenu = document.querySelector(".select-menu");
    select.addEventListener("click", () => {
        optionMenu.classList.toggle("active");
    });
    options.forEach(option => {
        option.addEventListener("click", () => {
            const selectedOption = option.innerText;
            text.innerText = selectedOption;
            const season = selectedOption.split("/")[0];
            updateStatsForSeason(season, teamId, leagueId);
            optionMenu.classList.remove("active");
        });
    });
}

//Función para actualizar los datos según la temporada y liga
function updateStatsForSeason(season, teamId, leagueId) {
    getData(season, teamId, leagueId, data => {
        if (data) {
            appendData(".data-team", data.response);
        } else {
            console.error("No se recibieron datos para la temporada seleccionada.");
        }
    });
}

//Función para obtener el ID del equipo desde la URL
function getTeamIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("id");
}

// Función para obtener la información del equipo
function getInfo(teamId, done) {
    const url = `https://v3.football.api-sports.io/teams?id=${teamId}`;
    const apiOptions = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "6467b905839bb394cd3c678dabff9d81",
            "x-rapidapi-host": "sportapi7.p.rapidapi.com",
        },
    };
    fetch(url, apiOptions)
        .then(response => response.json())
        .then(data => done(data))
        .catch(error => console.error('Error al obtener jugadores:', error));
}

function appendInfo(container, datos) {
    const cont = document.querySelector(container);
    cont.innerHTML = ""; 
    //La informacion de la API es erronea en algunos equipos asi que he tenido que hacer algunos ajustes
    const changesInStadiums = {
        "Borussia Dortmund": { name: "Signal Iduna Park" },
        "AC Milan": { name: "San Siro" },
        "Tottenham": { image: "/assets/img/teams/spurs.jpg" },
        "SC Freiburg": { image: "/assets/img/teams/freiburg.jpg" },
        "Brentford": { image: "/assets/img/teams/brentford.jpg" },
        "Atletico Madrid": { image: "/assets/img/teams/atleti.jpg" },
        "Cagliari": { image: "/assets/img/teams/cagliari.jpg" },
        "Nimes": { image: "/assets/img/teams/nimes.jpg" }
    };

    datos.response.forEach(element => {
        let { name: nameStadium, image: imageStadium, capacity, city, address } = element.venue;
        if (changesInStadiums[element.team.name]) {
            nameStadium = changesInStadiums[element.team.name].name || nameStadium;
            imageStadium = changesInStadiums[element.team.name].image || imageStadium;
        }
        const article = document.createRange().createContextualFragment(`
            <article class="article-team">
                <div class="image-container">
                    <img src="${imageStadium}" alt="Imagen del estadio">
                </div>
                <div class="team-data">
                    <h3>Nombre: <span class="sp">${nameStadium}</span></h3>
                    <h3>Ciudad: <span class="sp">${city}</span></h3>
                    <h3>Capacidad: <span class="sp">${capacity}</span></h3>
                    <h3>Dirección: <span class="sp">${address}</span></h3>
                </div>
            </article>
        `);
        cont.append(article);
    });
}

//Función para obtener los datos de jugadores y estadísticas
function getData(season, teamId, leagueId, done) {
    const url = `https://v3.football.api-sports.io/teams/statistics?season=${season}&team=${teamId}&league=${leagueId}`;
    const apiOptions = {
        method: "GET",
        headers: {
            "x-rapidapi-key": "6467b905839bb394cd3c678dabff9d81",
            "x-rapidapi-host": "sportapi7.p.rapidapi.com",
        },
    };
    fetch(url, apiOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            done(data)
        })
        .catch(error => console.error('Error al obtener informacion del partido:', error));
}

function appendData(container, datos) {
    const cont = document.querySelector(container);
    cont.querySelectorAll(".article-data-team, .article-data-team-no-stats").forEach(article => article.remove());
    const formationImages = getFormationImages();
    const winsTotal = datos.fixtures.wins.total;
    const drawsTotal = datos.fixtures.draws.total;
    const losesTotal = datos.fixtures.loses.total;
    const form = datos.form || "";
    const goalsScored = datos.goals.for.total.total;
    const goalsConceded = datos.goals.against.total.total;
    if (!goalsScored) {
        appendNoStats(cont);
        return;
    }
    const penaltyScored = datos.penalty.scored.total;
    const penaltyMissed = datos.penalty.missed.total;
    const cleanSheetsTotal = datos.clean_sheet.total;
    const formationsHTML = generateFormationsHTML(datos.lineups.slice(0, 3), formationImages);
    const colors = generateFormColors(form);
    const dataTeam = createDataTeamHTML({
        winsTotal,
        drawsTotal,
        losesTotal,
        colors,
        goalsScored,
        goalsConceded,
        penaltyScored,
        penaltyMissed,
        formationsHTML,
        cleanSheetsTotal
    });
    cont.append(dataTeam);
}

function getFormationImages() {
    return {
        "4-3-3": "assets/img/alineaciones/433.jpeg",
        "4-4-2": "assets/img/alineaciones/442.jpeg",
        "4-2-3-1": "assets/img/alineaciones/4231.jpeg",
        "3-5-2": "assets/img/alineaciones/352.jpeg",
        "5-4-1": "assets/img/alineaciones/541.jpeg",
        "4-2-4": "assets/img/alineaciones/424.jpeg",
        "5-3-2": "assets/img/alineaciones/532.jpeg",
        "3-4-1-2": "assets/img/alineaciones/3412.jpeg",
        "3-4-2-1": "assets/img/alineaciones/3421.jpeg",
        "3-5-1-1": "assets/img/alineaciones/3511.jpeg",
        "4-1-4-1": "assets/img/alineaciones/4141.jpeg",
        "4-2-2-2": "assets/img/alineaciones/4222.jpeg",
        "4-3-1-2": "assets/img/alineaciones/4312.jpeg",
        "4-3-2-1": "assets/img/alineaciones/4321.jpeg",
        "4-4-1-1": "assets/img/alineaciones/4411.jpeg",
        "4-1-2-1-2": "assets/img/alineaciones/41212.jpeg",
        "3-1-4-2": "assets/img/alineaciones/3142.jpeg",
        "3-2-4-1": "assets/img/alineaciones/3241.jpeg",
        "3-3-3-1": "assets/img/alineaciones/3331.jpeg",
        "3-4-3": "assets/img/alineaciones/343.jpeg"
    };
}

function appendNoStats(cont) {
    const noStats = document.createRange().createContextualFragment(`
        <article class="article-data-team-no-stats">
            <h1>Sin estadísticas</h1>
            <span>No hay estadísticas disponibles para este equipo en la liga seleccionada.</span>
        </article>
    `);
    cont.append(noStats);
}

function generateFormColors(form) {
    const emojis = {
        "W": { class: "win", emoji: "✅" },
        "D": { class: "draw", emoji: "➖" },
        "L": { class: "lose", emoji: "❌" }
    };
    return form.split('').map(char => {
        const { class: clase, emoji } = emojis[char] || {};
        return clase ? `<span class="${clase}">${emoji}</span>` : "";
    }).join('');
}

function generateFormationsHTML(lineups, formationImages) {
    return lineups.map(lineup => {
        const formation = lineup.formation;
        const frequencyFormation = lineup.played;
        const fImage = formationImages[formation] || "";
        return `
            <article class="article-formation">
                <img class="formation-image" src="${fImage}" alt="Formación ${formation}">
                <h2>Formación: <span class="sp">${formation}</span></h2>
                <h2>Veces utilizada: <span class="sp">${frequencyFormation}</span></h2>
            </article>
        `;
    }).join('');
}

function createDataTeamHTML({ winsTotal, drawsTotal, losesTotal, colors, goalsScored, goalsConceded, penaltyScored, penaltyMissed, formationsHTML, cleanSheetsTotal }) {
    return document.createRange().createContextualFragment(`
        <article class="article-data-team">
            <h1>📊 Estadísticas del Equipo</h1>
            <h2>✅ Partidos ganados: <span class="sp">${winsTotal}</span></h2>
            <h2>➖ Partidos empatados: <span class="sp">${drawsTotal}</span></h2>
            <h2>❌ Partidos perdidos: <span class="sp">${losesTotal}</span></h2>
            <h2>📋 Resumen: <span class="form">${colors}</span></h2>
            <h1>⚽ Goles</h1>
            <h2>🟢 Goles a favor: <span class="sp">${goalsScored}</span></h2>
            <h2>🔴 Goles en contra: <span class="sp">${goalsConceded}</span></h2>
            <h2>🎯 Penaltis convertidos: <span class="sp">${penaltyScored}</span></h2>
            <h2>❌ Penaltis fallados: <span class="sp">${penaltyMissed}</span></h2>
            <h1>📖 Alineaciones Frecuentes</h1>
            <div class="formation-container">${formationsHTML}</div>
            <h1>🛡️ Porterías a Cero</h1>
            <h2>🔒 Total: <span class="sp">${cleanSheetsTotal}</span></h2>
        </article>
    `);
}



