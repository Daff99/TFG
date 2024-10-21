package com.example.demo.model;

import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;
import jakarta.persistence.Table;
import java.util.ArrayList;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
@Table(name ="PLAYERS")
@Data
public class Player {

    @Id
    @Column(name = "API_IDPLAYER")
    private Long id;
    @Column(name = "NAME")
    private String name;
    @Column(name ="PHOTO")
    private String image;
    @ManyToMany(mappedBy =  "favouritePlayers")
    @JsonIgnore
    private List<User> users;

    public Player() {}

    public Player(String name, String image, Long apiId) {
        this.name = name;
        this.image = image;
        this.id = apiId;
        this.users = new ArrayList<>();
    }

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

    public List<User> getUsers() {
        return this.users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }
}
