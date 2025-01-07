package com.example.demo.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Team;
import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {
    public Team findByApiId(Long apiId);
    List<Team> findByNameContainingIgnoreCase(String name);
}
