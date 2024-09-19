package com.example.demo.model;

import java.util.HashSet;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Id;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
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
    private String name;
    @Column(name = "EMAIL")
    private String email;
    @Column(name = "PASSWORD")
    private String password;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
    private HashSet<Player> favouritePlayers;
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonIgnore
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
