package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Match;
import com.example.demo.repositories.MatchRepository;

@Service
public class MatchService {

    @Autowired
    private MatchRepository matchRepository;

    public MatchService() {}

    public Match findById(Long id) {
        return matchRepository.getById(id);
    }
    
}
