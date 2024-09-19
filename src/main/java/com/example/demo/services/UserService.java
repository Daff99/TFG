package com.example.demo.services;

import java.util.HashSet;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserService() {}

    public User createUser(String name, String email, String password) {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        user.setFavouriteChampionships(new HashSet<>());
        user.setFavouritePlayers(new HashSet<>());
        userRepository.save(user);
        return user;
    }
    
}
