package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import com.example.demo.model.Team;
import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.TeamsService;
import org.springframework.web.bind.annotation.RequestParam;
import java.security.Principal;

@Controller
public class TeamController {

    @Autowired
    private TeamsService teamsService;
    @Autowired
    private UserRepository userRepository;

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
        }
        return "showTeam";
    }
}
