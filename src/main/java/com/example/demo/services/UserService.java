package com.example.demo.services;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
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
        user.setFavouriteChampionships(new ArrayList<>());
        user.setFavouritePlayers(new ArrayList<>());
        userRepository.save(user);
        return user;
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean validatePassword(User user, String password) {
        return user.getPassword().equals(password);
    }
    
}
