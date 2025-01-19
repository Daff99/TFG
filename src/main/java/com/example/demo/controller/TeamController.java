package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.ui.Model;
import com.example.demo.model.Team;
import com.example.demo.model.User;
import com.example.demo.repositories.TeamRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.TeamsService;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.web.bind.annotation.RequestParam;
import java.io.InputStream;
import java.security.Principal;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Controller
public class TeamController {

    @Autowired
    private TeamsService teamsService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private TeamRepository teamRepository;
    private Map<Long, String[]> reports;
    
    //Lo mismo que hago con los jugadores, lo hago con los equipos
    @PostConstruct
    public void initReports() {
        try {
            ObjectMapper mapper = new ObjectMapper();
            InputStream input = getClass().getResourceAsStream("/reportsTeams.json");
            reports = mapper.readValue(input, new TypeReference<Map<Long, String[]>>() {});
        } catch (Exception e) {
            e.printStackTrace();
            reports = Map.of();
        }
    }

    @RequestMapping("/teams")
    public String showTeams(Model model, Principal principal) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String username = auth.getName();
            User user = userRepository.findByEmail(username);
            model.addAttribute("user", user);
        }
        boolean isLog = (principal != null);
        model.addAttribute("isLog", isLog);
        List<Team> teams = teamRepository.findAll(); //Recojo todos los equipos
        //Necesito filtrar segun la competicion asignada a cada equipo para mostrarlos en los div correspondientes, despues convierto todos los equipos de una competicion en una lista
        List<Team> premierTeams = teams.stream().filter(team -> "Premier League".equals(team.getCompetition())).collect(Collectors.toList());
        List<Team> laligaTeams = teams.stream().filter(team -> "La Liga".equals(team.getCompetition())).collect(Collectors.toList());
        List<Team> bundesligaTeams = teams.stream().filter(team -> "Bundesliga".equals(team.getCompetition())).collect(Collectors.toList());
        List<Team> serieATeams = teams.stream().filter(team -> "Serie A".equals(team.getCompetition())).collect(Collectors.toList());
        List<Team> ligue1Teams = teams.stream().filter(team -> "Ligue 1".equals(team.getCompetition())).collect(Collectors.toList());
        model.addAttribute("premierTeams", premierTeams);
        model.addAttribute("laligaTeams", laligaTeams);
        model.addAttribute("bundesligaTeams", bundesligaTeams);
        model.addAttribute("serieATeams", serieATeams);
        model.addAttribute("ligue1Teams", ligue1Teams);
        return "teams";
    }
    
    @RequestMapping("/showTeam")
    public String showTeam(@RequestParam("id") Long apiId, Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String username = auth.getName();
            User user = userRepository.findByEmail(username);
            model.addAttribute("user", user);
        }
        Team team = teamsService.findByApiId(apiId);
        if (team != null) {
            model.addAttribute("team", team);
            //Necesitaba sacar el ID de la liga para luego poder hacer una llamada a la API
            Map<String, Long> competitionLeagueId = Map.of(
                "Premier League", 39L,
                "La Liga", 140L,
                "Bundesliga", 78L,
                "Serie A", 135L,
                "Ligue 1", 61L
            );
            String competition = team.getCompetition(); //Saco la competicion del equipo
            Long leagueId = competitionLeagueId.get(competition); //Saco el id de la competicion
            model.addAttribute("leagueId", leagueId); //Lo paso al modelo para luego poder hacer la llamada a la API
            String[] listareports = reports.get(apiId);
            model.addAttribute("listareports", listareports);
            return "showTeam";
        } else {
            return "redirect:/teamNotAvailable";
        }
    }

    @GetMapping("/searchTeams")
    @ResponseBody
    public List<Team> searchTeams(@RequestParam("query") String query) {
        return teamsService.searchByName(query);
    }
}
