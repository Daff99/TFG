package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @RequestMapping("/")
    public String showHomePage() {
        return "index";
    }

    @RequestMapping("/live")
    public String showLive() {
        return "live";
    }

    @RequestMapping("/fav")
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
    
}
