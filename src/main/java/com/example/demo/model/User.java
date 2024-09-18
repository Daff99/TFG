package com.example.demo.model;

import java.util.HashSet;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document
public class User {

    @Id
    private Long id;
    private String name;
    private String email;
    private String password;
    private HashSet<Player> favouritePlayers;
    private HashSet<Championship> favouriteChampionships;

    public Long getId() {
        return this.id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
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

    public HashSet<Player> getFavouritePlayers() {
        return this.favouritePlayers;
    }

    public void setFavouritePlayers(HashSet<Player> favouritePlayers) {
        this.favouritePlayers = favouritePlayers;
    }

    public HashSet<Championship> getFavouriteChampionships() {
        return this.favouriteChampionships;
    }

    public void setFavouriteChampionships(HashSet<Championship> favouriteChampionships) {
        this.favouriteChampionships = favouriteChampionships;
    }


}
