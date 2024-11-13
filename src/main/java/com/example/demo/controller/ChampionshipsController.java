package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.security.core.Authentication;
import java.security.Principal;
import java.util.List;
import com.example.demo.services.ChampionshipsService;
import com.example.demo.model.Championship;
import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.ui.Model;

@Controller
public class ChampionshipsController {

    @Autowired
    private ChampionshipsService championshipsService;
    @Autowired
    private UserRepository userRepository;
    
    @RequestMapping("/championships")
    public String showChampionships(Model model, Principal principal) {
        boolean isLog = (principal != null);
        model.addAttribute("isLog", isLog);
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String username = auth.getName();
            User user = userRepository.findByEmail(username);
            model.addAttribute("user", user);
        }
        List<Championship> listChampionships = championshipsService.findAll();
        model.addAttribute("listChampionships", listChampionships);
        return "championships";
    }

    @RequestMapping("/showChampionship/{id}")
    public String showChampionship(@PathVariable("id") Long id, Model model) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.isAuthenticated()) {
            String username = auth.getName();
            User user = userRepository.findByEmail(username);
            model.addAttribute("user", user);
        }
        Championship champ = championshipsService.findById2(id);
        if (champ != null) {
            model.addAttribute("championship", champ);
            model.addAttribute("leagueId", champ.getId());
            String powerBiURL;
            switch (champ.getName()) {
                case "Bundesliga":
                    powerBiURL = "https://app.powerbi.com/view?r=eyJrIjoiYTQ4YzNlMjgtZTBiNC00MTlkLWE5MjEtNjA1MzJmYzllOTg2IiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9&pageName=24eda314bd635c9586ac";
                    break;
                case "La Liga":
                    powerBiURL = "https://app.powerbi.com/view?r=eyJrIjoiNzk2ZDU0MDMtZWMxZS00NjAzLTlhNTAtMTQ3NmIxNjBlMGQzIiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9&pageName=2fb42849f8433bceda63";
                    break;
                case "Premier League":
                    powerBiURL = "https://app.powerbi.com/view?r=eyJrIjoiODI1MWMxODctYzEwNy00ZGU5LWIzZmMtNGZhZTA1OGU0ZmIwIiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9";
                    break;
                case "Serie A":
                    powerBiURL = "https://app.powerbi.com/view?r=eyJrIjoiNmEzZGQ4NDktM2M3Yy00ODVhLWEzOWEtMDQzMWExZmVjY2U4IiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9&pageName=b6e19b504af03c8ac43d";
                    break;
                case "Ligue 1":
                    powerBiURL = "https://app.powerbi.com/view?r=eyJrIjoiMDJiMzNkMGQtOGVkOC00YzBiLWFkYTItODc1MzUzMmY3MWZjIiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9&pageName=0049490b2017f30fc5a5";
                    break;
                default:
                    powerBiURL = null;
            }
            model.addAttribute("powerBi", powerBiURL);
        }
        return "showChampionship";
    }
}
