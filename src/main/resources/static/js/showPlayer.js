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
			<article class="ficha-tecnica">
				<h1>FICHA TÉCNICA</h1>
				<div class="player-data">
					<span>Edad: <span>${agePlayer}</span></span>
					<span>Fecha de nacimiento: <span>${birthDate}</span></span>
					<span>Altura: <span>${height}</span></span>
					<span>Peso: <span>${weight}</span></span>
					<span>Nacionalidad: <span>${nationality}</span></span>
				</div>
			</article>`); 
		const main = document.querySelector(".info-player");
		main.append(fichaTecnica);
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
    } else {
        console.error('No se encontró el ID del equipo en la URL');
    }
});