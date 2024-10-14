package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.ArrayList;
import com.example.demo.model.Team;
import com.example.demo.repositories.TeamRepository;
import java.net.http.HttpClient;
import jakarta.annotation.PostConstruct;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.net.URI;
import org.json.JSONArray;
import org.json.JSONObject;


public class DataInitializer {

    @Autowired
    private TeamRepository teamRepository;

    @PostConstruct
    public void init() {

        //Equipos Premier League
        List<Team> teams = getPremierTeams();
        teamRepository.saveAll(teams);
    }

    private List<Team> getPremierTeams() {
        List<Team> teamList = new ArrayList<>();
        String apiKey = "62814ce7392f82d3441e6c84135d1f70";
        String url = "https://v3.football.api-sports.io/teams?league=39&season=2022";
        try {
            HttpClient client = HttpClient.newHttpClient();
            HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("x-rapidapi-key", apiKey)
                .header("x-rapidapi-host", "sportapi7.p.rapidapi.com").build();
            HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
            System.out.println(response.body());
            JSONObject jsonResponse = new JSONObject(response.body());
            JSONArray teamsList = jsonResponse.getJSONArray("response");
            for (int i = 0; i < teamsList.length(); i ++) {
                JSONObject teamObject = teamsList.getJSONObject(i).getJSONObject("team");
                String teamName = teamObject.getString("name");
                String teamLogo = teamObject.getString("logo");
                Long apiId = teamObject.getLong("id");

                Team team = new Team();
                team.setApiId(apiId);
                team.setName(teamName);
                team.setImage(teamLogo);
                teamList.add(team);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return teamList;
    }
}
