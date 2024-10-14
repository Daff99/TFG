package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name = "TEAMS")
@Data
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "IDTEAM")
    private Long id_team;
    @Column(name = "API_ID")
    private Long apiId;
    @Column(name = "NAME")
    private String name;
    @Column(name = "LOGO")
    private String image;

    public Team() {}

    public Team(String name, String image) {
        this.name = name;
        this.image = image;
    }
    
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Long getIdTeam() {
        return this.id_team;
    }

    public void setIdTeam(Long id) {
        this.id_team = id;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
