function getStatistics(idMatch, done) {
    const url = `https://v3.football.api-sports.io/fixtures/statistics?fixture=${idMatch}`;
    const apiOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6467b905839bb394cd3c678dabff9d81',
            'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    fetch(url, apiOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            done(data)
        })
        .catch(error => console.error('Error al obtener informacion del partido:', error));
}

function appendStatistics(container, datos) {
    const cont = document.querySelector(container);
    cont.innerHTML = '';
    const main = document.querySelector(".statistics-match-container");
    const homeTeam = datos.response[0].team;
    const awayTeam = datos.response[1].team;
    //Para el color de las barras de estadisticas, quiero extraer el color predominante que hay en los escudos de los equipos
    const colorThief = new ColorThief();
    const homeImg = loadImage(homeTeam.logo);
    const awayImg = loadImage(awayTeam.logo);
    homeImg.onload = () => {
        awayImg.onload = () => {
            const homeColorCss = getCssColor(colorThief.getColor(homeImg));
            const awayColorCss = getCssColor(colorThief.getColor(awayImg));
            createHeader(main, homeTeam, awayTeam);
            createStatistics(main, datos, homeColorCss, awayColorCss);
        };
    };
}

//Función para crear el encabezado
function createHeader(main, homeTeam, awayTeam) {
    const headerArticle = document.createRange().createContextualFragment(`
        <article class="article-header">
            <div class="header-statistics">
                <div class="homeTeam-container">
                    <img class="homeTeamLogo" src="${homeTeam.logo}" alt="${homeTeam.name}">
                    <a href="/showTeam?id=${homeTeam.id}">
                        <h1>${homeTeam.name}</h1>
                    </a>       
                </div>
                <h1 class="resulth1">${matchResult}</h1>
                <div class="awayTeam-container">
                    <img class="awayTeamLogo" src="${awayTeam.logo}" alt="${awayTeam.name}">
                    <a href="/showTeam?id=${awayTeam.id}">
                        <h1>${awayTeam.name}</h1>
                    </a>
                </div>
            </div>
        </article>
    `);
    main.append(headerArticle);
}

//Función para crear las estadísticas
function createStatistics(main, datos, homeColorCss, awayColorCss) {
    const translations = getTranslations();
    const homeStats = datos.response[0].statistics;
    const awayStats = datos.response[1].statistics;
    homeStats.forEach((stat, index) => {
        const action = translations[stat.type] || stat.type;
        const valueHome = parseFloat(stat.value) || 0;
        const valueAway = parseFloat(awayStats[index]?.value) || 0;
        const { normalizedValueHome, normalizedValueAway } = normalizeValues(action, valueHome, valueAway);
        const statArticle = document.createRange().createContextualFragment(`
            <article class="article-statistics">
                <span class="stat-name">${action}</span>
                <div class="bars">
                    <span class="bar-value home-value">${valueHome}</span>
                    <div class="bar bar-homeTeam" style="width: ${Math.max(normalizedValueHome, 10)}%; background-color: ${homeColorCss};"></div>
                    <div class="bar bar-awayTeam" style="width: ${Math.max(normalizedValueAway, 10)}%; background-color: ${awayColorCss};"></div>
                    <span class="bar-value away-value">${valueAway}</span>
                </div>
            </article>
        `);
        main.append(statArticle);
    });
}

//Las estadisticas de posesion y porcentaje de pases completado vienen en porcentajes asi que tengo que normalizarlos para que en las barras de estadisticas se muestre una diferencia en las longitudes acorde a los valores
function normalizeValues(action, valueHome, valueAway) {
    if (action === 'Posesión' || action === 'Porcentaje de pases completado') {
        return { normalizedValueHome: valueHome, normalizedValueAway: valueAway };
    }
    const maxStatValue = Math.max(valueHome, valueAway, 1);
    return {
        normalizedValueHome: (valueHome / maxStatValue) * 100,
        normalizedValueAway: (valueAway / maxStatValue) * 100
    };
}

//Función para cargar imágenes
function loadImage(src) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = src;
    return img;
}

//Función para convertir colores a CSS
function getCssColor(color) {
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
}

//La API me devuelve los valores en ingles, los traduzco para mostrarlos en la vista
function getTranslations() {
    return {
        'Shots on Goal': 'Tiros a puerta',
        'Shots off Goal': 'Tiros fuera',
        'Total Shots': 'Tiros totales',
        'Blocked Shots': 'Tiros bloqueados',
        'Shots insidebox': 'Tiros dentro del área',
        'Shots outsidebox': 'Tiros fuera del área',
        'Fouls': 'Faltas',
        'Corner Kicks': 'Córners',
        'Offsides': 'Fuera de juego',
        'Ball Possession': 'Posesión',
        'Yellow Cards': 'Tarjetas amarillas',
        'Red Cards': 'Tarjetas rojas',
        'Goalkeeper Saves': 'Paradas del portero',
        'Total passes': 'Pases totales',
        'Passes accurate': 'Pases acertados',
        'Passes %': 'Porcentaje de pases completado',
        'expected_goals': 'Goles esperados (xG)'
    };
}

function getLineups(idMatch, done) {
    const url = `https://v3.football.api-sports.io/fixtures/lineups?fixture=${idMatch}`;
    const apiOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6467b905839bb394cd3c678dabff9d81',
            'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    fetch(url, apiOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            done(data)
        })
        .catch(error => console.error('Error al obtener informacion del partido:', error));
}

function appendLineups(container, datos) {
    const cont = document.querySelector(container);
    cont.querySelectorAll('.lineups-match-container').forEach(lmc => lmc.remove());
    const main = document.querySelector(".lineups");
    datos.response.forEach(element => {
        const teamLogo = element.team.logo;
        const formation = element.formation;
        const lineUpContainer = document.createRange().createContextualFragment(`
            <article class="article-lineup">
                <div class="players-list">
                    <img src="${teamLogo}" alt="hola">
                    <h1>Formación: ${formation}</h1>
                </div>
            </article>
        `);
        element.startXI.forEach(e => {
            const playerId = e.player.id;
            const name = e.player.name;
            const backNumber = e.player.number;
            const playersinfo = document.createRange().createContextualFragment(`
                <div class="player-info">
                    <a href="/showPlayer?id=${playerId}">
                        <h1 class="backNumber">${backNumber}</h1>
                        <h1 class="namePlayer">${name}</h1>    
                    </a>   
                </div>
            `);
            lineUpContainer.querySelector(".players-list").appendChild(playersinfo);
        });
        main.appendChild(lineUpContainer);
    });
}

function getEvents(idMatch, done) {
    const url = `https://v3.football.api-sports.io/fixtures/events?fixture=${idMatch}`;
    const apiOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6467b905839bb394cd3c678dabff9d81',
            'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    fetch(url, apiOptions)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            done(data)
        })
        .catch(error => console.error('Error al obtener informacion del partido:', error));
}

function appendEvents(container, datos) {
    const cont = document.querySelector(container);
    cont.querySelectorAll('.events-match-container').forEach(e => e.remove());
    const main = document.querySelector('.events');
    const typeTranslations = {
        'Card': 'Tarjeta',
        'Goal': 'Gol',
        'subst': 'Sustitución',
        'Var': 'VAR',
    };
    const detailTranslations = {
        'Yellow Card': 'Tarjeta Amarilla',
        'Red Card': 'Tarjeta Roja',
        'Normal Goal': 'Gol Normal',
        'Penalty': 'Penalti',
        'Substitution 1': 'Primer cambio',
        'Substitution 2': 'Segundo cambio',
        'Substitution 3': 'Tercer cambio',
        'Substitution 4': 'Cuarto cambio',
        'Substitution 5': 'Quinto cambio',
        'Penalty confirmed': 'Penalti concedido',
        'Penalty cancelled': 'Penalti cancelado',
    };
    const eventIcons = {
        'Tarjeta': '⚠️',
        'Gol': '⚽',
        'Sustitución': '🔄',
        'VAR': '📺',
    };
    datos.response.forEach(event => {
        const {
            team: { name: team, logo: logoTeam },
            time: { elapsed: time = '', extra = '' },
            player: { name: playerName = 'No disponible' } = {},
            assist: { name: assistPlayerName = '' } = {},
            type,
            detail,
        } = event;
        const typeEvent = translateValue(type, typeTranslations);
        const detailEvent = translateValue(detail, detailTranslations);
        const eventIcon = eventIcons[typeEvent] || 'ℹ️';
        const eventHtml = createEventHtml(
            logoTeam,
            team,
            time,
            extra,
            playerName,
            assistPlayerName,
            typeEvent,
            detailEvent,
            eventIcon
        );
        main.append(eventHtml);
    });
}

function translateValue(value, translations) {
    return translations[value] || value || '';
}

function createEventHtml(
    logoTeam,
    team,
    time,
    extra,
    playerName,
    assistPlayerName,
    typeEvent,
    detailEvent,
    eventIcon
) {
    return document.createRange().createContextualFragment(`
        <article class="article-events">
            <div class="event-header">
                <img class="team-logo" src="${logoTeam}" alt="${team}">
                <h1 class="event-time">${time}' ${extra ? `+${extra}` : ''}</h1>
            </div>
            <div class="event-details">
                <span class="event-icon">${eventIcon}</span>
                <h2 class="player-name">${typeEvent === 'Sustitución' ? 'Sale del campo' : 'Jugador'}: ${playerName}</h2>
                ${typeEvent === 'Sustitución' && assistPlayerName ? `<h2 class="assist-name">Entra al campo: ${assistPlayerName}</h2>` : ''}
                ${typeEvent !== 'Sustitución' && assistPlayerName ? `<h3 class="assist-name">Asistencia: ${assistPlayerName}</h3>` : ''}
                <p class="event-type">Tipo de evento: ${typeEvent}</p>
                <p class="event-detail">Detalle: ${detailEvent}</p>
            </div>
        </article>
    `);
}


function getMatchIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

document.addEventListener('DOMContentLoaded', () => {
    const matchId = getMatchIdFromURL();
    if (matchId) {
        getStatistics(matchId, data => {
            appendStatistics('.statistics-match-container', data);
        });
        getLineups(matchId, data => {
            appendLineups('.lineups-match-container', data);
        });
        getEvents(matchId, data => {
            appendEvents('.events-match-container', data);
        });
    } else {
        console.error('No se encontró el id del partido');
    }
});

