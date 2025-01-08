package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Match;

public interface MatchRepository extends JpaRepository<Match, Long> {
    public Match getById(Long id);
}
