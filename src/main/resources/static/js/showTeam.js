document.addEventListener("DOMContentLoaded", () => {
    const teamId = getTeamIdFromURL();
    if (!teamId) {
        console.error("No se encontró el ID del equipo en la URL");
        return;
    }

    if (!leagueId) {
        console.error("No se encontró el League ID inyectado desde el backend");
        return;
    }

    // Cargar información del equipo
    getInfo(teamId, data => {
        appendInfo(".info-team", data);
    });

    // Temporada por defecto
    const defaultSeason = "2023/2024";
    const text = document.querySelector(".select-button .text");
    text.innerText = defaultSeason;
    const defaultSeasonYear = defaultSeason.split("/")[0];
    updateStatsForSeason(defaultSeasonYear, teamId, leagueId);

    // Controlador del menú desplegable
    const select = document.querySelector(".select-button");
    const options = document.querySelectorAll(".option");

    select.addEventListener("click", () => {
        const optionMenu = document.querySelector(".select-menu");
        optionMenu.classList.toggle("active");
    });

    options.forEach(option => {
        option.addEventListener("click", () => {
            const selectedOption = option.innerText;
            text.innerText = selectedOption;
            const season = selectedOption.split("/")[0];
            updateStatsForSeason(season, teamId, leagueId);
            document.querySelector(".select-menu").classList.remove("active");
        });
    });
});

// Función para actualizar los datos según la temporada y liga
function updateStatsForSeason(season, teamId, leagueId) {
    getData(season, teamId, leagueId, data => {
        if (data) {
            appendData(".data-team", data.response);
        } else {
            console.error("No se recibieron datos para la temporada seleccionada.");
        }
    });
}

// Función para obtener el ID del equipo desde la URL
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

// Función para mostrar la información del equipo
function appendInfo(container, datos) {
    const cont = document.querySelector(container);
    cont.innerHTML = ""; 
    datos.response.forEach(element => {
        let nameStadium = element.venue.name;
        let imageStadium = element.venue.image;
        const capacity = element.venue.capacity;
        const city = element.venue.city;
        const address = element.venue.address;
        switch (element.team.name) {
            case "Borussia Dortmund":
                nameStadium = "Signal Iduna Park";
                break;
            case "AC Milan":
                nameStadium = "San Siro";
                break;
            case "Tottenham":
                imageStadium = "/assets/img/teams/spurs.jpg";
                break;
            case "SC Freiburg":
                imageStadium = "/assets/img/teams/freiburg.jpg";
                break;
            case "Brentford":
                imageStadium = "/assets/img/teams/brentford.jpg";
                break;
            case "Atletico Madrid":
                imageStadium = "/assets/img/teams/atleti.jpg";
                break;
            case "Cagliari":
                imageStadium = "/assets/img/teams/cagliari.jpg";
                break;
            case "Nimes":
                imageStadium = "/assets/img/teams/nimes.jpg";
                break;
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

// Función para obtener los datos de jugadores y estadísticas
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
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error en la respuesta de la API: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => done(data))
        .catch(error => console.error("Error al obtener estadísticas del equipo:", error));
}

function appendData(container, datos) {
    const cont = document.querySelector(container);
    cont.querySelectorAll(".article-data-team, .article-data-team-no-stats").forEach(article => article.remove());

    const formationImages = {
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
    };

    const winsTotal = datos.fixtures.wins.total;
    const drawsTotal = datos.fixtures.draws.total;
    const losesTotal = datos.fixtures.loses.total;
    const form = datos.form || "";

    // Colores y emojis para la forma del equipo
    const colors = form.split('').map(char => {
        let clase = '';
        let emoji = '';
        switch (char) {
            case 'W':
                clase = 'win';
                emoji = '✅';
                break;
            case 'D':
                clase = 'draw';
                emoji = '➖';
                break;
            case 'L':
                clase = 'lose';
                emoji = '❌';
                break;
        }
        return `<span class="${clase}">${emoji}</span>`;
    }).join('');

    const goalsScored = datos.goals.for.total.total;
    const goalsConceded = datos.goals.against.total.total;

    if (goalsScored === 0 || !goalsScored) {
        const noStats = document.createRange().createContextualFragment(`
            <article class="article-data-team-no-stats">
                <h1>Sin estadísticas</h1>
                <span>No hay estadísticas disponibles para este equipo en la liga seleccionada.</span>
            </article>
        `);
        cont.append(noStats);
        return;
    }

    const penaltyScored = datos.penalty.scored.total;
    const penaltyMissed = datos.penalty.missed.total;

    // Formaciones frecuentes
    let formationsHTML = `<div class="formation-container">`; 
    const limitedLineups = datos.lineups.slice(0, 3); 
    limitedLineups.forEach(lineup => {
        const formation = lineup.formation;
        const frecuencyFormation = lineup.played;
        const fImage = formationImages[formation] || "assets/img/default.jpeg";
        formationsHTML += `
            <article class="article-formation">
                <img class="formation-image" src="${fImage}" alt="Formación ${formation}"> 
                <h2>Formación: <span class="sp">${formation}</span></h2>
                <h2>Veces utilizada: <span class="sp">${frecuencyFormation}</span></h2>
            </article>
        `;
    });
    formationsHTML += `</div>`;

    // Porterías a cero
    const cleanSheetsTotal = datos.clean_sheet.total;

    const dataTeam = document.createRange().createContextualFragment(`
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
            ${formationsHTML}
            <h1>🛡️ Porterías a Cero</h1>
            <h2>🔒 Total: <span class="sp">${cleanSheetsTotal}</span></h2>
        </article>
    `);
    cont.append(dataTeam);
}


