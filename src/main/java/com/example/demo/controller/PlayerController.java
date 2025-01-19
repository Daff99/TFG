package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import java.security.Principal;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.example.demo.model.Player;
import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.PlayerService;
import jakarta.annotation.PostConstruct;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.core.type.TypeReference;
import java.io.InputStream;
import java.util.List;

@Controller
public class PlayerController {

    @Autowired
    private PlayerService playerService;
    @Autowired
    private UserRepository userRepository;
    private Map<Long, String> reports; //Aquí ire almacenando los informes de los 177 jugadores que tengo 

    @PostConstruct
    public void initReports() {
        //Este metodo lee mi archivo reportsPlayers.json para asignar a cada jugador su correspondiente informe de powerBi y almacenarlo en el mapa reports
        try {
            ObjectMapper mapper = new ObjectMapper(); //Permite trabajar con JSON
            InputStream input = getClass().getResourceAsStream("/reportsPlayers.json"); //Busco el archivo reportsPlayers.json en mi aplicacion
            reports = mapper.readValue(input, new TypeReference<Map<Long, String>>() {}); //Convierto el contenido del archivo JSON en un objeto Java, concretamente en un objeto del tipo Map<Long, String>
        } catch (Exception e) {
            e.printStackTrace();
            reports = Map.of(); //Si hay error, inicializo un mapa vacio
        }
    }

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
        Player player = playerService.findById(id);
        if (player != null) {
            model.addAttribute("player", player);
            String report = reports.get(id);
            model.addAttribute("report", report);
            return "showPlayer";
        } else {
            return "redirect:/playerNotAvailable";
        }
    }

    //Metodo para buscar jugadores en la barra de busqueda
    @GetMapping("/searchPlayers")
    @ResponseBody
    public List<Player> searchPlayers(@RequestParam("query") String query) {
        return playerService.searchByName(query);
    }
}
