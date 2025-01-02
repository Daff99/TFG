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
		const height = element.player.height;
		const weight = element.player.weight;
		const nationality = element.player.nationality;
		const fichaTecnica = document.createRange().createContextualFragment(`
			<article class="article-player">
				<div class="player-data">
					<h3>Edad: <span id="agePlayer">${agePlayer}</span></h3>
					<h3>Fecha de nacimiento: <span id="birthDate">${birthDate}</span></h3>
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
		let operation = element.type;
		const date = element.date;
        const [year, month, day] = date.split("-");
        const formattedDate = `${day}-${month}-${year}`;
		switch (operation) {
			case 'N/A':
				operation = 'Fin de cesión';
				break;
			case 'Loan':
				operation = 'Cedido';
				break;
            case 'Free':
                operation = 'Gratis';
                break;
		}
		const allTransfers = document.createRange().createContextualFragment(`
			<article class="article-transfers">
                <div class="transfer-info">
                    <img class="out-Team" src="${outTeam}" alt="Logo del equipo">
                    <div class="operation-type">
                        <h1>${operation}</h1>
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                        <h1>${formattedDate}</h1>
                    </div>
                    <img class="in-Team" src="${inTeam}" alt="Logo del equipo">
                </div>
			</article>`);
		const main = document.querySelector(".transfers-container");
		main.append(allTransfers);
	});
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
    } else {
        console.error('No se encontró el ID del equipo en la URL');
    }
});