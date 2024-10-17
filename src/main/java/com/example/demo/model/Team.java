package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
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

    public Team() {}

    public Team(String name, String image, Long apiId) {
        this.name = name;
        this.image = image;
        this.apiId = apiId;
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
}
