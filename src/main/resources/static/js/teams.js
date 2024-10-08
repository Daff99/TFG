/* function getTeamsAndLogoPremier(done) {
    const url = 'https://v3.football.api-sports.io/teams?league=39&season=2022';
    const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '62814ce7392f82d3441e6c84135d1f70',
          'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    const results = fetch(url, options);
    results.then(response => response.json()).then(data => {
        done(data);
    });
}

function getTeamsAndLogoLaLiga(done) {
    const url = 'https://v3.football.api-sports.io/teams?league=140&season=2022';
    const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '62814ce7392f82d3441e6c84135d1f70',
          'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    const results = fetch(url, options);
    results.then(response => response.json()).then(data => {
        done(data);
    });
}

function getTeamsAndLogoBundesliga(done) {
    const url = 'https://v3.football.api-sports.io/teams?league=78&season=2022';
    const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '62814ce7392f82d3441e6c84135d1f70',
          'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    const results = fetch(url, options);
    results.then(response => response.json()).then(data => {
        done(data);
    });
}

function getTeamsAndLogoSerieA(done) {
    const url = 'https://v3.football.api-sports.io/teams?league=135&season=2022';
    const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '62814ce7392f82d3441e6c84135d1f70',
          'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    const results = fetch(url, options);
    results.then(response => response.json()).then(data => {
        done(data);
    });
}

function getTeamsAndLogoLigue1(done) {
    const url = 'https://v3.football.api-sports.io/teams?league=61&season=2022';
    const options = {
        method: 'GET',
        headers: {
          'x-rapidapi-key': '62814ce7392f82d3441e6c84135d1f70',
          'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    const results = fetch(url, options);
    results.then(response => response.json()).then(data => {
        done(data);
    });
}

getTeamsAndLogoPremier(data => {
    data.response.forEach(team => {
        const teamName = team.team.name;
        const teamLogo = team.team.logo;
        const article = document.createRange().createContextualFragment(`
            <article>
            <div class="image-container">
              <img src="${teamLogo}" alt="name">
            </div>
            <h2>${teamName}</h2>
            </article>
          `);
        const premierteams = document.querySelector(".premier-teams");
        premierteams.append(article);
        //console.log(team.team.name);
        //console.log(team.team.logo);
    });
})

getTeamsAndLogoLaLiga(data => {
    data.response.forEach(team2 => {
        const teamName2 = team2.team.name;
        const teamLogo2 = team2.team.logo;
        const article2 = document.createRange().createContextualFragment(`
            <article>
            <div class="image-container">
              <img src="${teamLogo2}" alt="name">
            </div>
            <h2>${teamName2}</h2>
            </article>
          `);
        const laligateams = document.querySelector(".laliga-teams");
        laligateams.append(article2);
    });
})

getTeamsAndLogoBundesliga(data => {
    data.response.forEach(team3 => {
        const teamName3 = team3.team.name;
        const teamLogo3 = team3.team.logo;
        const article3 = document.createRange().createContextualFragment(`
            <article>
            <div class="image-container">
              <img src="${teamLogo3}" alt="name">
            </div>
            <h2>${teamName3}</h2>
            </article>
          `);
        const bundesligateams = document.querySelector(".bundesliga-teams");
        bundesligateams.append(article3);
    });
})

getTeamsAndLogoSerieA(data => {
    data.response.forEach(team4 => {
        const teamName4 = team4.team.name;
        const teamLogo4 = team4.team.logo;
        const article4 = document.createRange().createContextualFragment(`
            <article>
            <div class="image-container">
              <img src="${teamLogo4}" alt="name">
            </div>
            <h2>${teamName4}</h2>
            </article>
          `);
        const serieAteams = document.querySelector(".serieA-teams");
        serieAteams.append(article4);
    });
})

getTeamsAndLogoLigue1(data => {
    data.response.forEach(team5 => {
        const teamName5 = team5.team.name;
        const teamLogo5 = team5.team.logo;
        const article5 = document.createRange().createContextualFragment(`
            <article>
            <div class="image-container">
              <img src="${teamLogo5}" alt="name">
            </div>
            <h2>${teamName5}</h2>
            </article>
          `);
        const ligue1teams = document.querySelector(".ligue1-teams");
        ligue1teams.append(article5);
    });
}) */

const premierId = 39;
const laligaId = 140;
const bundesligaId = 78;
const serieAId = 135;
const ligue1Id = 61;

function getTeamsAndLogo(leagueId, done) {
    const url = `https://v3.football.api-sports.io/teams?league=${leagueId}&season=2022`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '62814ce7392f82d3441e6c84135d1f70',
            'x-rapidapi-host': 'sportapi7.p.rapidapi.com'
        }
    };
    const results = fetch(url, options);
    results.then(response => response.json()).then(data => {
        done(data);
    });
}

function appendTeams(container, teams) {
    const cont = document.querySelector(container);
    teams.forEach(team => {
        const teamName = team.team.name;
        const teamLogo = team.team.logo;
        const article = document.createRange(). createContextualFragment(`
            <article>
                <div class="image-container">
                    <img src="${teamLogo}" alt="name">
                </div>
                <h2>${teamName}</h2>
            </article>
        `);
        cont.append(article);
    });
}

getTeamsAndLogo(premierId, data => {
    appendTeams('.premier-teams', data.response);
});

getTeamsAndLogo(laligaId, data => {
    appendTeams('.laliga-teams', data.response);
});

getTeamsAndLogo(bundesligaId, data => {
    appendTeams('.bundesliga-teams', data.response);
});

getTeamsAndLogo(serieAId, data => {
    appendTeams('.serieA-teams', data.response);
});

getTeamsAndLogo(ligue1Id, data => {
    appendTeams('.ligue1-teams', data.response);
});

