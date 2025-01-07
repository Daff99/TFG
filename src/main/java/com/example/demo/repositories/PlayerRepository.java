package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Player;
import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Long> {
    public Player getById(Long id);
    List<Player> findByNameContainingIgnoreCase(String name);
}
