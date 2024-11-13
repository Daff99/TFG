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
@Table(name ="CHAMPIONSHIPS")
@Data
public class Championship {

    @Id
    @Column(name = "IDCHAMPIONSHIP")
    private Long id;
    @Column(name = "NAME")
    private String name;
    @Column(name = "IMAGE")
    private String image;
    @Column(name = "SLIDER")
    private String slider;
    @ManyToMany(mappedBy =  "favouriteChampionships")
    @JsonIgnore
    private List<User> users = new ArrayList<>();

    public Championship() {}

    public Championship(String name, String image, String slider) {
        this.name = name;
        this.image = image;
        this.slider = slider;
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

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getSlider() {
        return this.slider;
    }

    public void setSlider(String slider) {
        this.slider = slider;
    }
}
