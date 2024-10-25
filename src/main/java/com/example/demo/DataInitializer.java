package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.Set;
import java.util.HashSet;

import com.example.demo.model.Championship;
import com.example.demo.model.Player;
import com.example.demo.model.Team;
import com.example.demo.repositories.ChampionshipsRepository;
import com.example.demo.repositories.PlayerRepository;
import com.example.demo.repositories.TeamRepository;
import java.net.http.HttpClient;
import jakarta.annotation.PostConstruct;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer {

    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private ChampionshipsRepository championshipsRepository;
    private String apiKey = "62814ce7392f82d3441e6c84135d1f70";
    private final int PREMIER = 39;
    private final int LALIGA = 140;
    private final int BUNDESLIGA = 78;
    private final int SERIEA = 135;
    private final int LIGUE1 = 61;

    @PostConstruct
    public void init() {
        /* 
        //Equipos y Jugadores
        for (int year = 2013; year <= 2023; year ++) {
            int season = year;
            saveTeamsAndPlayersForLeague(PREMIER, season);
            saveTeamsAndPlayersForLeague(LALIGA, season);
            saveTeamsAndPlayersForLeague(BUNDESLIGA, season);
            saveTeamsAndPlayersForLeague(SERIEA, season);
            saveTeamsAndPlayersForLeague(LIGUE1, season);
        }
        */
        /* 
        Championship premier = new Championship("Premier League", "assets/img/championships/premier.png", "sliderpremier.jpg");
        Championship laliga = new Championship("La Liga", "assets/img/championships/laliga.png", "sliderlaliga.jpg");
        Championship bundesliga = new Championship("Bundesliga", "assets/img/championships/bundesliga.png", "sliderbundesliga.jpg");
        Championship serieA = new Championship("Serie A", "assets/img/championships/seriea.png", "sliderseriea.jpg");
        Championship ligue1 = new Championship("Ligue 1", "assets/img/championships/ligue1.png", "sliderligue1.jpg");

        premier.setId(39);
        laliga.setId(140);
        bundesliga.setId(78);
        serieA.setId(135);
        ligue1.setId(61);

        championshipsRepository.save(premier);
        championshipsRepository.save(laliga);
        championshipsRepository.save(bundesliga);
        championshipsRepository.save(serieA);
        championshipsRepository.save(ligue1);
        */
        
        
    }

    private void saveTeamsAndPlayersForLeague(int leagueId, int season) {
        Set<Team> teams = getTeamsForLeague(leagueId, season, apiKey);
        for (Team team: teams) {
            teamRepository.save(team);
        }
        Set<Player> players = getPlayersForLeague(leagueId, season, apiKey);
        for (Player player: players) {
            playerRepository.save(player);
        }
    }

    private static Set<Player> getPlayersForLeague(int leagueId, int season, String apiKey) {
        String url = "https://v3.football.api-sports.io/players/topscorers?season=" + season + "&league=" + leagueId;
        Set<Player> playerList = new HashSet<>();
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("x-rapidapi-key", apiKey)
                .header("x-rapidapi-host", "v3.football.api-sports.io").build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                JSONObject jsonResponse = new JSONObject(response.body());
                JSONArray playersArray = jsonResponse.getJSONArray("response");
                for (int i = 0; i < playersArray.length(); i ++) {
                    JSONObject playerObject = playersArray.getJSONObject(i).getJSONObject("player");
                    String playerName = playerObject.getString("name");
                    String playerLogo = playerObject.getString("photo");
                    Long apiId = playerObject.getLong("id");

                    Player player = new Player(playerName, playerLogo, apiId);
                    playerList.add(player);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return playerList;
    }

    private static Set<Team> getTeamsForLeague(int leagueId, int season, String apiKey) {
        String url = "https://v3.football.api-sports.io/teams?league=" + leagueId + "&season=" + season;
        Set<Team> teamList = new HashSet<>();
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("x-rapidapi-key", apiKey)
                .header("x-rapidapi-host", "v3.football.api-sports.io").build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            if (response.statusCode() == 200) {
                JSONObject jsonResponse = new JSONObject(response.body());
                JSONArray teamsArray = jsonResponse.getJSONArray("response");
                for (int i = 0; i < teamsArray.length(); i ++) {
                    JSONObject teamObject = teamsArray.getJSONObject(i).getJSONObject("team");
                    String teamName = teamObject.getString("name");
                    String teamLogo = teamObject.getString("logo");
                    Long apiId = teamObject.getLong("id");

                    Team team = new Team(teamName, teamLogo, apiId);
                    teamList.add(team);
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return teamList;
    }
}
