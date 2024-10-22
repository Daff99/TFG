package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;

@Controller
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/")
    public String showHomePage() {
        return "live";
    }

    @RequestMapping("/favs")
    public String showFavs() {
        return "favs";
    }

    @RequestMapping("/profile")
    public String showProfile(Authentication auth, Model model) {
        String username = auth.getName();
        User user = userRepository.findByEmail(username);
        model.addAttribute("user", user);
        return "profile";
    }

    @RequestMapping("/players")
    public String showPlayers() {
        return "players";
    }

    @RequestMapping("/teams")
    public String showTeams() {
        return "teams";
    }

    @RequestMapping("/championships")
    public String showChampionships() {
        return "championships";
    }

    @RequestMapping("/laliga")
    public String showLaLiga() {
        return "laliga";
    }

    @RequestMapping("/premier")
    public String showPremier() {
        return "premier";
    }

    @RequestMapping("/seriea")
    public String showSerieA() {
        return "seriea";
    }

    @RequestMapping("/bundesliga")
    public String showBundesliga() {
        return "bundesliga";
    }

    @RequestMapping("/ligue1")
    public String showLigue1() {
        return "ligue1";
    }

    @RequestMapping("/champions")
    public String showChampionsLeague() {
        return "champions";
    }
    
}
