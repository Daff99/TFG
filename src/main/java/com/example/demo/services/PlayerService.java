package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.demo.model.Player;
import com.example.demo.repositories.PlayerRepository;
import java.util.List;

@Service
public class PlayerService {

    @Autowired
    private PlayerRepository playerRepository;

    public PlayerService() {}

    public Player findById(Long id) {
        return playerRepository.findById(id).orElse(null);
    }

    public List<Player> searchByName(String query) {
        return playerRepository.findByNameContainingIgnoreCase(query);
    }
    
}
