package com.example.demo.model;

import java.util.List;
import java.util.ArrayList;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;

@Entity
@Table(name = "USERS")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "IDUSER")
    private Long id;
    @Column(name = "NAME")
    private String username;
    @Column(name = "EMAIL")
    private String email;
    @Column(name = "PASSWORD")
    private String password;
    @Column(name = "ROL")
    private String rol;
    @Column(name = "IMAGE", nullable = true, length = 64)
    private String image;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "USER_FAVOURITE_PLAYERS", 
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "player_id")
    )
    @JsonIgnore
    private List<Player> favouritePlayers;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "USER_FAVOURITE_CHAMPIONSHIPS",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "championships_id")
    )
    @JsonIgnore
    private List<Championship> favouriteChampionships;
    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "USER_FAVOURITE_TEAMS",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "team_id")
    )
    @JsonIgnore
    private List<Team> favouriteTeams;

    public User() {}

    public User(String name, String email, String password) {
        this.username = name;
        this.email = email;
        this.password = password;
        this.favouriteChampionships = new ArrayList<>();
        this.favouritePlayers = new ArrayList<>();
        this.favouriteTeams = new ArrayList<>();
    }

    public String getRol() {
        return this.rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String name) {
        this.username = name;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Player> getFavouritePlayers() {
        return this.favouritePlayers;
    }

    public void setFavouritePlayers(List<Player> favouritePlayers) {
        this.favouritePlayers = favouritePlayers;
    }

    public List<Championship> getFavouriteChampionships() {
        return this.favouriteChampionships;
    }

    public void setFavouriteChampionships(List<Championship> favouriteChampionships) {
        this.favouriteChampionships = favouriteChampionships;
    }

    public List<Team> getFavouriteTeams() {
        return this.favouriteTeams;
    }

    public void setFavouriteTeams(List<Team> favouriteTeams) {
        this.favouriteTeams = favouriteTeams;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
