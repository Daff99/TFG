package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.ui.Model;
import com.example.demo.model.Team;
import com.example.demo.services.TeamsService;

import org.springframework.web.bind.annotation.RequestParam;
import java.util.ArrayList;
import java.util.List;

@Controller
public class TeamController {

    @Autowired
    private TeamsService teamsService;

    List<Team> newList = new ArrayList<Team>();
    
    @RequestMapping("/showTeam")
    public String showTeam(@RequestParam("id") Long apiId, Model model) {
        Team team = teamsService.findByApiId(apiId);
        if (team != null) {
            model.addAttribute("team", team);
        } else {
            System.out.println("Equipo no encontrado con API ID: " + apiId);
        }
        return "showTeam";
    }
}
