package com.example.demo.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import com.example.demo.model.Championship;
import com.example.demo.model.Player;
import com.example.demo.model.Team;
import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;

//En esta clase manejo controladores que no tienen nada que ver con las entidades de mi aplicacion
@Controller
public class MainController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/")
    public String showHomePage(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String username = auth.getName();
            User user = userRepository.findByEmail(username);
            model.addAttribute("user", user);
        }
        return "live";
    }

    @RequestMapping("/favs")
    public String showFavourites(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String username = auth.getName();
            User user = userRepository.findByEmail(username);
            model.addAttribute("user", user);
            List<Team> favouriteTeams = user.getFavouriteTeams();
            List<Player> favouritePlayers = user.getFavouritePlayers();
            List<Championship> favouriteChampionships = user.getFavouriteChampionships();
            model.addAttribute("favouriteTeams", favouriteTeams);
            model.addAttribute("favouritePlayers", favouritePlayers);
            model.addAttribute("favouriteChampionships", favouriteChampionships);
        }
        return "favs";
    }

    @RequestMapping("/profile")
    public String showProfile(Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String username = auth.getName();
            User user = userRepository.findByEmail(username);
            model.addAttribute("user", user);
        }
        return "profile";
    }

    @RequestMapping("/teamNotAvailable")
    public String showTeamNotAvailable() {
        return "teamNotAvailable";
    }

    @RequestMapping("/playerNotAvailable")
    public String showPlayerNotAvailable() {
        return "playerNotAvailable";
    }

    @RequestMapping("/customerror")
    public String showError() {
        return "error";
    }
}
