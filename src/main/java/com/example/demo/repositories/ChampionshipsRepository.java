package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Championship;

public interface ChampionshipsRepository extends JpaRepository<Championship, Long> {
    public Championship getById(Long id);
}
