package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Data;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;

@Entity
@Table(name = "TEAMS")
@Data
public class Team {
    @Id
    @Column(name = "API_ID")
    private Long apiId;
    @Column(name = "NAME")
    private String name;
    @Column(name = "LOGO")
    private String image;
    @Column(name = "COMPETITION")
    private String competition;
    @ManyToMany(mappedBy =  "favouriteTeams")
    @JsonIgnore
    private List<User> users;

    public Team() {}

    public Team(String name, String image, Long apiId) {
        this.name = name;
        this.image = image;
        this.apiId = apiId;
        this.users = new ArrayList<>();
    }

    public String getCompetition() {
        return this.competition;
    }

    public void setCompetition(String competition) {
        this.competition = competition;
    }
    
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Long getApiId() {
        return this.apiId;
    }

    public void setApiId(Long apiId) {
        this.apiId = apiId;
    }

    public List<User> getUsers() {
        return this.users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
