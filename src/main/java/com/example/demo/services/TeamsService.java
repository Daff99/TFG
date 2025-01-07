package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Team;
import com.example.demo.repositories.TeamRepository;
import java.util.List;

@Service
public class TeamsService {

    @Autowired
    private TeamRepository teamRepository;

    public TeamsService() {}

    public Team findByApiId(Long apiId) {
        return teamRepository.findByApiId(apiId);
    }

    public List<Team> searchByName(String query) {
        return teamRepository.findByNameContainingIgnoreCase(query);
    }
}
