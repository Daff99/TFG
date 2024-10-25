package com.example.demo.controller;

import java.security.Principal;

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
    public String showPlayers(Model model, Principal principal) {
        boolean isLog = (principal != null);
        model.addAttribute("isLog", isLog);
        return "players";
    }
}
