package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import java.security.Principal;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.demo.model.Player;
import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.PlayerService;

@Controller
public class PlayerController {

    @Autowired
    private PlayerService playerService;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/players")
    public String showPlayers(Model model, Principal principal) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String username = auth.getName();
            User user = userRepository.findByEmail(username);
            model.addAttribute("user", user);
        }
        boolean isLog = (principal != null);
        model.addAttribute("isLog", isLog);
        return "players";
    }

    @RequestMapping("showPlayer")
    public String showPlayer(@RequestParam("id") Long id, Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String username = auth.getName();
            User user = userRepository.findByEmail(username);
            model.addAttribute("user", user);
        }
        Player player = playerService.findById2(id);
        if (player != null) {
            model.addAttribute("player", player);
        }
        return "showPlayer";
    }
}
