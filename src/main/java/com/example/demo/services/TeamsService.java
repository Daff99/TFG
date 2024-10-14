package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Team;
import com.example.demo.repositories.TeamRepository;

@Service
public class TeamsService {

    @Autowired
    private TeamRepository teamRepository;

    public TeamsService() {}

    public Team findByApiId(Long apiId) {
        return teamRepository.findByApiId(apiId);
    }
}
