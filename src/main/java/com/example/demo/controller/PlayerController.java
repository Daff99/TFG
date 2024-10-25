package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import java.security.Principal;

@Controller
public class PlayerController {

    @RequestMapping("/players")
    public String showPlayers(Model model, Principal principal) {
        boolean isLog = (principal != null);
        model.addAttribute("isLog", isLog);
        return "players";
    }
}
