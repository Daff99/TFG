package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Player;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    public Player getById(Long id);
    
}
