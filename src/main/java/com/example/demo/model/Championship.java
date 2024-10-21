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
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;

@Entity
@Table(name ="CHAMPIONSHIPS")
@Data
public class Championship {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "IDCHAMPIONSHIP")
    private Long id;
    @Column(name = "NAME")
    private String name;
    @ManyToMany(mappedBy =  "favouriteChampionships")
    @JsonIgnore
    private List<User> users = new ArrayList<>();

    public Championship() {}

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
