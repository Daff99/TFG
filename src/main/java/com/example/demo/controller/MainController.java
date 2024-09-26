package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @RequestMapping("/")
    public String showHomePage() {
        return "live";
    }

    @RequestMapping("/favs")
    public String showFavs() {
        return "favs";
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
