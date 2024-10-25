package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import com.example.demo.model.Championship;
import com.example.demo.repositories.ChampionshipsRepository;

@Service
public class ChampionshipsService {

    @Autowired
    private ChampionshipsRepository championshipRepository;

    public ChampionshipsService() {}

    public List<Championship> findAll() {
        return championshipRepository.findAll();
    }

    public Championship findById2(Integer id) {
        return championshipRepository.getById(id);
    }
    
}
