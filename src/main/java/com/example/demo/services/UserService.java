package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService() {}

    public User createUser(String name, String email, String password/* , String imagen*/) {
        User user = new User();
        user.setUsername(name);
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));
        user.setRol("client");
        //user.setImage(imagen);
        user.setFavouriteChampionships(new ArrayList<>());
        user.setFavouritePlayers(new ArrayList<>());
        user.setImage("/assets/img/default.jpeg");
        userRepository.save(user);
        return user;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user != null) {
            var usuario = org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRol())
                .build();
            return usuario;
        }
        throw new UnsupportedOperationException("Unimplemented method 'loadUserByUsername'");
    }

    public User findById2(Long id) {
        return userRepository.getById(id);
    }

    public User updateUser(User user) {
        User user2 = userRepository.getById(user.getId());
        user2.setUsername(user.getUsername());
        if (user.getPassword() != null &&!user.getPassword().isEmpty()) {
            user2.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        user2.setImage(user.getImage());
        userRepository.save(user2);
        return user;
    }
}
