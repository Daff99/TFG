package com.example.demo.model;

import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import jakarta.persistence.Table;
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
    @ManyToOne
    @JoinColumn(name = "IDUSER")
    @JsonIgnore
    private User user;

    public Player() {}

    public Player(String name, String image, Long apiId) {
        this.name = name;
        this.image = image;
        this.id = apiId;
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

    public User getUser() {
        return this.user;
    }

    public void setUser(User user) {
        this.user = user;
    }

}
