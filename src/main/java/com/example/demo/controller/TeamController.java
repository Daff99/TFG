package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import com.example.demo.model.Team;
import com.example.demo.services.TeamsService;
import org.springframework.web.bind.annotation.RequestParam;
import java.security.Principal;

@Controller
public class TeamController {

    @Autowired
    private TeamsService teamsService;

    @RequestMapping("/teams")
    public String showTeams(Model model, Principal principal) {
        boolean isLog = (principal != null);
        model.addAttribute("isLog", isLog);
        return "teams";
    }
    
    @RequestMapping("/showTeam")
    public String showTeam(@RequestParam("id") Long apiId, Model model) {
        Team team = teamsService.findByApiId(apiId);
        if (team != null) {
            model.addAttribute("team", team);
        }
        return "showTeam";
    }
}
