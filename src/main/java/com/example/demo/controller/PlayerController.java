package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import java.security.Principal;
import org.springframework.web.bind.annotation.RequestParam;
import com.example.demo.model.Player;
import com.example.demo.services.PlayerService;

@Controller
public class PlayerController {

    @Autowired
    private PlayerService playerService;

    @RequestMapping("/players")
    public String showPlayers(Model model, Principal principal) {
        boolean isLog = (principal != null);
        model.addAttribute("isLog", isLog);
        return "players";
    }

    @RequestMapping("showPlayer")
    public String showPlayer(@RequestParam("id") Long id, Model model) {
        Player player = playerService.findById2(id);
        if (player != null) {
            model.addAttribute("player", player);
        }
        return "showPlayer";
    }
}
