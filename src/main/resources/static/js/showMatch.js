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
    const homeTeamLogo = datos.response[0].team.logo;
    const homeTeamName = datos.response[0].team.name;
    const awayTeamLogo = datos.response[1].team.logo;
    const awayTeamName = datos.response[1].team.name;

    const homeTeamId = datos.response[0].team.id;
    const awayTeamId = datos.response[1].team.id;

    // Crear un ColorThief
    const colorThief = new ColorThief();

    // Crear imágenes de los escudos
    const homeImg = new Image();
    const awayImg = new Image();
    homeImg.crossOrigin = "Anonymous";
    awayImg.crossOrigin = "Anonymous";
    homeImg.src = homeTeamLogo;
    awayImg.src = awayTeamLogo;

    // Esperar a que las imágenes carguen
    homeImg.onload = () => {
        awayImg.onload = () => {
            const homeColor = colorThief.getColor(homeImg);
            const awayColor = colorThief.getColor(awayImg);

            // Convertir colores a formato CSS
            const homeColorCss = `rgb(${homeColor[0]}, ${homeColor[1]}, ${homeColor[2]})`;
            const awayColorCss = `rgb(${awayColor[0]}, ${awayColor[1]}, ${awayColor[2]})`;

            // Crear encabezado
            const headerArticle = document.createRange().createContextualFragment(`
                <article class="article-header">
                    <div class="header-statistics">
                        <div class="homeTeam-container">
                            <img class="homeTeamLogo" src="${homeTeamLogo}" alt="${homeTeamName}">
                            <a href="/showTeam?id=${homeTeamId}">
                                <h1>${homeTeamName}</h1>
                            </a>       
                        </div>
                        <h1 class="resulth1">${matchResult}</h1>
                        <div class="awayTeam-container">
                            <img class="awayTeamLogo" src="${awayTeamLogo}" alt="${awayTeamName}">
                            <a href="/showTeam?id=${awayTeamId}">
                                <h1>${awayTeamName}</h1>
                            </a>
                        </div>
                    </div>
                </article>`);
            main.append(headerArticle);

            // Crear estadísticas
            datos.response[0].statistics.forEach((element1, index) => {
                let action = element1.type;
                switch (action) {
                    case 'Shots on Goal':
                        action = 'Tiros a puerta';
                        break;
                    case 'Shots off Goal':
                        action = 'Tiros fuera';
                        break;
                    case 'Total Shots':
                        action = 'Tiros totales';
                        break;
                    case 'Blocked Shots':
                        action = 'Tiros bloqueados';
                        break;
                    case 'Shots insidebox':
                        action = 'Tiros dentro del área';
                        break;
                    case 'Shots outsidebox':
                        action = 'Tiros fuera del área';
                        break;
                    case 'Fouls':
                        action = 'Faltas';
                        break;
                    case 'Corner Kicks':
                        action = 'Córners';
                        break;
                    case 'Offsides':
                        action = 'Fuera de juego';
                        break;
                    case 'Ball Possession':
                        action = 'Posesión';
                        break;
                    case 'Yellow Cards':
                        action = 'Tarjetas amarillas';
                        break;
                    case 'Red Cards':
                        action = 'Tarjetas rojas';
                        break;
                    case 'Goalkeeper Saves':
                        action = 'Paradas del portero';
                        break;
                    case 'Total passes':
                        action = 'Pasas totales';
                        break;
                    case 'Passes accurate':
                        action = 'Pases acertados';
                        break;
                    case 'Passes %':
                        action = 'Porcentaje de pases completado';
                        break;
                    case 'expected_goals':
                        action = 'Goles esperados (xG)';
                        break;
                }

                const element2 = datos.response[1].statistics[index];
                const valueHome = parseFloat(element1.value) || 0;
                const valueAway = parseFloat(element2.value) || 0;
                let normalizedValueHome, normalizedValueAway;
                if (action === 'Ball Possession' || action === 'Passes %') {
                    normalizedValueHome = valueHome;
                    normalizedValueAway = valueAway;
                } else {
                    const maxStatValue = Math.max(valueHome, valueAway, 1);
                    normalizedValueHome = (valueHome / maxStatValue) * 100;
                    normalizedValueAway = (valueAway / maxStatValue) * 100;
                }
                const allStatisticsHome = document.createRange().createContextualFragment(`
                    <article class="article-statistics">
                        <span class="stat-name">${action}</span>
                        <div class="bars">
                            <span class="bar-value home-value">${valueHome}</span>
                            <div class="bar bar-homeTeam" style="width: ${Math.max(normalizedValueHome, 10)}%; background-color: ${homeColorCss};"></div>
                            <div class="bar bar-awayTeam" style="width: ${Math.max(normalizedValueAway, 10)}%; background-color: ${awayColorCss};"></div>
                            <span class="bar-value away-value">${valueAway}</span>
                        </div>
                    </article>`);
                main.append(allStatisticsHome);
            });
        };
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
    datos.response.forEach((element, index) => {
        const isHomeTeam = index === 0;
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

    datos.response.forEach(element => {
        const team = element.team.name;
        const logoTeam = element.team.logo;
        const time = element.time.elapsed || '';
        const extraTime = element.time.extra ? `+${element.time.extra}` : ''; 
        const playerName = element.player.name || 'No disponible';
        const assistPlayerName = element.assist && element.assist.name ? element.assist.name : '';
        let typeEvent = element.type;
        switch (typeEvent) {
            case 'Card':
                typeEvent = 'Tarjeta';
                break;
            case 'Goal':
                typeEvent = 'Gol';
                break;
            case 'subst':
                typeEvent = 'Sustitución';
                break;
            case 'Var':
                typeEvent = 'VAR';
                break;
            default:
                typeEvent = typeEvent;
        }
        let detailEvent = element.detail;
        switch (detailEvent) {
            case 'Yellow Card':
                detailEvent = 'Tarjeta Amarilla';
                break;
            case 'Red Card':
                detailEvent = 'Tarjeta Roja';
                break;
            case 'Normal Goal':
                detailEvent = 'Gol Normal';
                break;
            case 'Penalty':
                detailEvent = 'Penalti';
                break;
            case 'Substitution 1':
                detailEvent = 'Primer cambio';
                break;
            case 'Substitution 2':
                detailEvent = 'Segundo cambio';
                break;
            case 'Substitution 3':
                detailEvent = 'Tercer cambio';
                break;
            case 'Substitution 4':
                detailEvent = 'Cuarto cambio';
                break;
            case 'Substitution 5':
                detailEvent = 'Quinto cambio';
                break;
            case 'Penalty confirmed':
                detailEvent = 'Penalti concedido';
                break;
            case 'Penalty cancelled':
                detailEvent = 'Penalti cancelado';
                break;
            default:
                detailEvent = detailEvent || '';
        }

        const eventIcon = {
            'Tarjeta': '⚠️',
            'Gol': '⚽',
            'Sustitución': '🔄',
            'VAR': '📺',
        }[typeEvent] || 'ℹ️';

        // Crear HTML
        const eventsInfo = document.createRange().createContextualFragment(`
            <article class="article-events">
                <div class="event-header">
                    <img class="team-logo" src="${logoTeam}" alt="${team}">
                    <h1 class="event-time">${time}' ${extraTime}</h1>
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
        main.append(eventsInfo);
    });
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

