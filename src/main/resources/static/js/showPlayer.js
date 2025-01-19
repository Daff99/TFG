function getInfo(idPlayer, done) {
	const url = `https://v3.football.api-sports.io/players/profiles?player=${idPlayer}`;
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
        .catch(error => console.error('Error al obtener informacion del jugador:', error));
}

function appendInfo(container, datos) {
    const cont = document.querySelector(container);
    cont.innerHTML = '';
    datos.response.forEach(element => {
        //Ficha tecnica
		const agePlayer = element.player.age;
		const birthDate = element.player.birth.date;
        const [year, month, day] = birthDate.split("-");
        const formattedDate = `${day}-${month}-${year}`; //Cambio el formato de la fecha
		const height = element.player.height;
		const weight = element.player.weight;
		const nationality = element.player.nationality;
		const fichaTecnica = document.createRange().createContextualFragment(`
			<article class="article-player">
				<div class="player-data">
					<h3>Edad: <span id="agePlayer">${agePlayer}</span></h3>
					<h3>Fecha de nacimiento: <span id="birthDate">${formattedDate}</span></h3>
					<h3>Altura: <span id="height">${height}</span></h3>
					<h3>Peso: <span id="weight">${weight}</span></h3>
					<h3>País: <span id="nationality">${nationality}</span></h3>
				</div>
			</article>`); 
		const main = document.querySelector(".info-player");
		main.append(fichaTecnica);
    });
}

function getTransfers(playerId, done) {
	const url = `https://v3.football.api-sports.io/transfers?player=${playerId}`;
    const apiOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6467b905839bb394cd3c678dabff9d81',
            'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    fetch(url, apiOptions)
        .then(response => response.json())
        .then(data => done(data))
        .catch(error => console.error('Error al obtener jugadores:', error));
}

function appendTranfers(container, data) {
    const cont = document.querySelector(container);
    cont.querySelectorAll('.transfers-container').forEach(transfersContainer => transfersContainer.remove());
	data.response[0].transfers.forEach(element => {
		const inTeam = element.teams.in.logo;
		const outTeam = element.teams.out.logo;
        const inNameTeam = element.teams.in.name;
		const outNameTeam = element.teams.out.name;
        const idinTeam = element.teams.in.id;
        const idoutTeam = element.teams.out.id;
		const date = element.date;
        const [year, month, day] = date.split("-");
        const formattedDate = `${day}-${month}-${year}`;
        const translations = getTranslations();
        const operation = translations[element.type] || element.type; 
		const allTransfers = document.createRange().createContextualFragment(`
			<article class="article-transfers">
                <div class="transfer-info">
                    <a href="/showTeam?id=${idoutTeam}">
                        <p class="outName">${outNameTeam}</p>   
                    </a>
                    <img class="out-Team" src="${outTeam}" alt="Logo del equipo">
                    <div class="operation-type">
                        <h1>${operation}</h1>
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                        <h1>${formattedDate}</h1>
                    </div>
                    <img class="in-Team" src="${inTeam}" alt="Logo del equipo">
                    <a href="/showTeam?id=${idinTeam}">
                        <p class="inName">${inNameTeam}</p>    
                    </a>
                </div>
			</article>`);
		const main = document.querySelector(".transfers-container");
		main.append(allTransfers);
	});
}

function getTranslations() {
    return {
        'N/A' : 'Fin de cesión',
        'Loan': 'Cedido',
        'Free': 'Gratis'
    };
}

function getTrophies(playerId, done) {
    const url = `https://v3.football.api-sports.io/trophies?player=${playerId}`;
    const apiOptions = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '6467b905839bb394cd3c678dabff9d81',
            'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    fetch(url, apiOptions)
        .then(response => response.json())
        .then(data => done(data))
        .catch(error => console.error('Error al obtener jugadores:', error));
}

function appendTrophies(container, data) {
    const cont = document.querySelector(container);
    cont.querySelectorAll('.trophies-container').forEach(trophiesContainer => trophiesContainer.remove());
    if (data.response.length === 0) {
        appendNoTrophiesArticle(cont);
        return;
    }
    const sortedTrophies = data.response.sort((a, b) => b.season - a.season); //Ordeno los trofeos que mas reciente a menos reciente
    sortedTrophies.forEach(t => {
        const trophyDetails = getTrophyDetails(t);
        appendTrophyCard('.trophies-container', trophyDetails);
    });
}

function getTrophyDetails(trophy) {
    const translations = {
        'Winner': 'Campeón',
        '2nd Place': 'Subcampeón'
    };
    return {
        championship: trophy.league,
        country: trophy.country,
        season: trophy.season === 'Peru 2011' ? '2010/2011' : trophy.season,
        place: translations[trophy.place] || trophy.place
    };
}

function appendTrophyCard(containerSelector, { championship, country, season, place }) {
    const main = document.querySelector(containerSelector);
    const trophyCard = document.createRange().createContextualFragment(`
        <article class="trophies">
            <h1>${championship}</h1>
            <h2>País: <span class="sp">${country}</span></h2>
            <h2>Temporada: <span class="sp">${season}</span></h2>
            <h2>Lugar: <span class="sp">${place}</span></h2>
        </article>
    `);
    main.append(trophyCard);
}

function appendNoTrophiesArticle(cont) {
    const noTrophies = document.createRange().createContextualFragment(`
        <article class="trophies">
            <h1>Sin trofeos</h1>
            <span class="sp">Este jugador no tiene trofeos registrados.</span>
        </article>
    `);
    cont.append(noTrophies);
}

function getPlayerIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

document.addEventListener("DOMContentLoaded", () => {
    const playerId = getPlayerIdFromURL();
    if (playerId) {
        getInfo(playerId, data => {
            appendInfo('.info-player', data);
        });
        getTransfers(playerId, data => {
            appendTranfers('.transfers-container', data);
        });
        getTrophies(playerId, data => {
            appendTrophies('.trophies-container', data);
        });
    } else {
        console.error('No se encontró el ID del equipo en la URL');
    }
});