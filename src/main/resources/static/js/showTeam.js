function getInfo(teamId, done) {
	const url = `https://v3.football.api-sports.io/teams?id=${teamId}`;
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
        .catch(error => console.error('Error al obtener informacion del equipo:', error));
}
function appendInfo(container, datos) {
    const cont = document.querySelector(container);
    cont.innerHTML = '';
    datos.response.forEach(element => {
        let nameStadium = element.venue.name;
        let imageStadium = element.venue.image;
        const capacity = element.venue.capacity;
        const city = element.venue.city;
        switch (element.team.name) {
            case 'Borussia Dortmund':
                nameStadium = 'Signal Iduna Park';
                break;
            case 'AC Milan':
                nameStadium = 'San Siro';
                break;
            case 'Tottenham':
                imageStadium = '/assets/img/teams/spurs.jpg';
                break;
            case 'SC Freiburg':
                imageStadium = '/assets/img/teams/freiburg.jpg';
                break;
            case 'Brentford':
                imageStadium = '/assets/img/teams/brentford.jpg';
                break;
            case 'Atletico Madrid':
                imageStadium = '/assets/img/teams/atleti.jpg';
                break;
            case 'Cagliari':
                imageStadium = '/assets/img/teams/cagliari.jpg';
                break;
            case 'Nimes':
                imageStadium = '/assets/img/teams/nimes.jpg';
                break;
        }
        const address = element.venue.address; 	
        const article = document.createRange().createContextualFragment(`
            <article class="article-team">
                <div class="image-container">
                    <img src="${imageStadium}" alt="Imagen">
                </div>
                <div class="team-data">
                    <h3>Nombre: <span>${nameStadium}</span></h3>
                    <h3>Ciudad: <span>${city}</span></h3>
                    <h3>Capacidad: <span>${capacity}</span></h3>
                    <h3>Dirección: <span>${address}</span></h3>
                </div>
            </article>`); 
        const main = document.querySelector(".info-team");
        main.append(article);
    });
}

function getTeamIdFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

document.addEventListener("DOMContentLoaded", () => {
    const teamId = getTeamIdFromURL();
    if (teamId) {
        getInfo(teamId, data => {
            appendInfo('.info-team', data);
        });
    } else {
        console.error('No se encontró el ID del equipo en la URL');
    }
});