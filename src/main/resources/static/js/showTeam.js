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

// Función para mostrar las estadísticas en la página
function appendData(container, datos) {
    const cont = document.querySelector(container);
    cont.querySelectorAll(".article-data-team, .article-data-team-no-stats").forEach(article => article.remove());
    const winsTotal = datos.fixtures.wins.total;
    const winsHome = datos.fixtures.wins.home;
    const winsAway = datos.fixtures.wins.away;
    const drawsTotal = datos.fixtures.draws.total;
    const drawsHome = datos.fixtures.draws.home;
    const drawsAway = datos.fixtures.draws.away;
    const losesTotal = datos.fixtures.loses.total;
    const losesHome = datos.fixtures.loses.home;
    const losesAway = datos.fixtures.loses.away;
    const form = datos.form || "";
    const colors = form.split('').map(char => {
        let clase = '';
        switch (char) {
            case 'W':
                clase = 'win';
                break;
            case 'D':
                clase = 'draw';
                break;
            case 'L':
                clase = 'lose';
                break;
        }
        return `<span class="${clase}">${char}</span>`;
    }).join('');
    //Aquí voy a añadir una clase para cada letra de form, con el fin de cambiar de color cada letra 
    const goalsConceded = datos.goals.against.total.total;
    const goalsScored = datos.goals.for.total.total;
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
    let formationsHTML = ""; 
    datos.lineups.forEach(lineup => {
        const formation = lineup.formation;
        const frecuencyFormation = lineup.played;
        formationsHTML += `
            <h2>Formación: <span class="sp">${formation}</span></h2>
            <h2>Frecuencia de la formación: <span v>${frecuencyFormation}</span></h2>
        `;
    });
    const cleanSheetsTotal = datos.clean_sheet.total;
    const homeCleanSheets = datos.clean_sheet.home;
    const awayCleanSheets = datos.clean_sheet.away;
    const dataTeam = document.createRange().createContextualFragment(`
        <article class="article-data-team">
            <h1>PARTIDOS</h1>
            <h2>Partidos ganados: <span class="sp">${winsTotal}</span></h2>
            <h2>Partidos ganados local: <span class="sp">${winsHome}</span></h2>
            <h2>Partidos ganados visitante: <span class="sp">${winsAway}</span></h2>
            <h2>Partidos empatados: <span class="sp">${drawsTotal}</span></h2>
            <h2>Partidos empatados local: <span class="sp">${drawsHome}</span></h2>
            <h2>Partidos empatados visitante: <span class="sp">${drawsAway}</span></h2>
            <h2>Partidos perdidos: <span class="sp">${losesTotal}</span></h2>
            <h2>Partidos perdidos local: <span class="sp">${losesHome}</span></h2>
            <h2>Partidos perdidos visitante: <span class="sp">${losesAway}</span></h2>
            <h2>Resumen de partidos: <span class="form">${colors}</span></h2>
            <h1>GOLES</h1>
            <h2>Goles a favor: <span class="sp">${goalsScored}</span></h2>
            <h2>Goles en contra: <span class="sp">${goalsConceded}</span></h2>
            <h2>Goles de penalti: <span class="sp">${penaltyScored}</span></h2>
            <h2>Penaltis fallados: <span class="sp">${penaltyMissed}</span></h2>
            <h1>ALINEACIONES FRECUENTES</h1>
            ${formationsHTML}
            <h1>PORTERÍAS A CERO</h1>
            <h2>Porterías a cero: <span class="sp">${cleanSheetsTotal}</span></h2>
            <h2>Porterías a cero local: <span class="sp">${homeCleanSheets}</span></h2>
            <h2>Porterías a cero visitante: <span v>${awayCleanSheets}</span></h2>
        </article>
    `);
    cont.append(dataTeam);
}
