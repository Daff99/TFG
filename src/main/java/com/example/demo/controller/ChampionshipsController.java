package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;
import com.example.demo.services.ChampionshipsService;
import com.example.demo.model.Championship;
import org.springframework.ui.Model;

@Controller
public class ChampionshipsController {

    @Autowired
    private ChampionshipsService championshipsService;
    
    @RequestMapping("/championships")
    public String showChampionships(Model model) {
        List<Championship> listChampionships = championshipsService.findAll();
        model.addAttribute("listChampionships", listChampionships);
        return "championships";
    }

    @RequestMapping("/showChampionship/{id}")
    public String showChampionship(@PathVariable("id") Integer id, Model model) {
        Championship champ = championshipsService.findById2(id);
        if (champ != null) {
            model.addAttribute("championship", champ);
            model.addAttribute("leagueId", champ.getId());
            String powerBiURL;
            switch (champ.getName()) {
                case "Bundesliga":
                    powerBiURL = "https://app.powerbi.com/view?r=eyJrIjoiYTQ4YzNlMjgtZTBiNC00MTlkLWE5MjEtNjA1MzJmYzllOTg2IiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9";
                    break;
                case "La Liga":
                    powerBiURL = "https://app.powerbi.com/view?r=eyJrIjoiNzk2ZDU0MDMtZWMxZS00NjAzLTlhNTAtMTQ3NmIxNjBlMGQzIiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9";
                    break;
                case "Premier League":
                    powerBiURL = "https://app.powerbi.com/view?r=eyJrIjoiODI1MWMxODctYzEwNy00ZGU5LWIzZmMtNGZhZTA1OGU0ZmIwIiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9";
                    break;
                case "Serie A":
                    powerBiURL = "https://app.powerbi.com/view?r=eyJrIjoiNmEzZGQ4NDktM2M3Yy00ODVhLWEzOWEtMDQzMWExZmVjY2U4IiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9";
                    break;
                case "Ligue 1":
                    powerBiURL = "https://app.powerbi.com/view?r=eyJrIjoiMDJiMzNkMGQtOGVkOC00YzBiLWFkYTItODc1MzUzMmY3MWZjIiwidCI6IjVmODRjNGVhLTM3MGQtNGI5ZS04MzBjLTc1NmY4YmYxYjUxZiIsImMiOjh9";
                    break;
                default:
                    powerBiURL = null;
            }
            model.addAttribute("powerBi", powerBiURL);
        }
        return "showChampionship";
    }
}
