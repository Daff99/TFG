package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import com.example.demo.model.Team;
import com.example.demo.model.User;
import com.example.demo.repositories.TeamRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.TeamsService;
import org.springframework.web.bind.annotation.RequestParam;
import java.security.Principal;
import java.util.List;
import java.util.HashMap;
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
    
    private final Map<Long, String[]> reports = new HashMap<>();
    public TeamController() {
        reports.put(168L, new String[]{"https://app.powerbi.com/view?r=eyJrIjoiYmJhYTBlN2ItZDdjNS00MTc2LTk2ZWQtNDQyYjk0NzQ1ZDZiIiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9&zoomLevel=110"});
        reports.put(170L, new String[]{"https://app.powerbi.com/view?r=eyJrIjoiZjVmMTg3NDItMjU2Ni00NzY4LTk4ZWEtNmU2MmUzY2ViNDdhIiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9", "https://app.powerbi.com/view?r=eyJrIjoiNWMzMWFmM2YtNGQyMy00YzUyLWI4ZTQtNTI2NGYwOGVhNmQwIiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9"});
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
        List<Team> teams = teamRepository.findAll();
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
            String[] listareports = reports.get(apiId);
            model.addAttribute("listareports", listareports);
        }
        return "showTeam";
    }
}
