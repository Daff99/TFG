package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import com.example.demo.services.MatchService;
import com.example.demo.repositories.UserRepository;
import com.example.demo.model.Match;
import com.example.demo.model.User;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.security.core.context.SecurityContextHolder;


@Controller
public class MatchController {
    
    @Autowired
    private MatchService matchService;
    @Autowired
    private UserRepository userRepository;

    @RequestMapping("/showMatch")
    public String showMatch(@RequestParam("id") Long id, Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String username = auth.getName();
            User user = userRepository.findByEmail(username);
            model.addAttribute("user", user);
        }
        Match match = matchService.findById(id);
        if (match != null) {
            model.addAttribute("match", match);   
        }
        return "showMatch";
    }
}
