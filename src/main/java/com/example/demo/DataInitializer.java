package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.demo.model.Team;
import com.example.demo.repositories.TeamRepository;

import jakarta.annotation.PostConstruct;

public class DataInitializer {

    @Autowired
    private TeamRepository teamRepository;

    @PostConstruct
    public void init() {

        //Equipos Premier League
        Team manUnited = new Team("Manchester United", "assets/img/teams/manunited.png");
        teamRepository.save(manUnited);
    }
    
}
