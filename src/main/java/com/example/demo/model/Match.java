package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import jakarta.persistence.Table;

@Entity
@Table(name = "MATCHES")
@Data
@AllArgsConstructor
public class Match {
    @Id
    @Column(name = "MATCH_ID")
    private Long matchId;
    @Column(name = "HOME_TEAM")
    private String homeTeam;
    @Column(name = "AWAY_TEAM")
    private String awayTeam;
    @Column(name = "COMPETITION")
    private String competition;
    @Column(name = "SEASON")
    private String season;

    public Match() {}

    public Match(String homeTeam, String awayTeam, String competition, String season) {
        this.homeTeam = homeTeam;
        this.awayTeam = awayTeam;
        this.competition = competition;
        this.season = season;
    }

}
