package com.example.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.regex.Pattern;

import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public UserService() {}

    public User createUser(String name, String email, String password) {
        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("El nombre no puede estar vacío");
        }
        if (email == null || email.isBlank()) {
            throw new IllegalArgumentException("El email no puede estar vacío");
        }
        if (name.length() < 3) {
            throw new IllegalArgumentException("El nombre debe tener minimo 3 caracteres");
        }
        String formatEmail = "^[\\w-\\.]+@[\\w-]+\\.[a-z]{2,}$";
        Pattern pattern = Pattern.compile(formatEmail, Pattern.CASE_INSENSITIVE);
        if (!pattern.matcher(email).matches()) {
            throw new IllegalArgumentException("El correo no tiene un formato válido");
        }
        User user = new User();
        user.setUsername(name);
        user.setEmail(email);
        if (password == null || password.isBlank()) {
            throw new IllegalArgumentException("La contraseña no puede estar vacía");
        }
        if (password.length() < 6) {
            throw new IllegalArgumentException("La contraseña debe tener mínimo 6 caracteres");
        }
        user.setPassword(passwordEncoder.encode(password));
        user.setRol("client");
        //user.setImage(imagen);
        user.setFavouriteChampionships(new ArrayList<>());
        user.setFavouritePlayers(new ArrayList<>());
        user.setImage("/assets/img/default.jpeg");
        userRepository.save(user);
        return user;
    }

    public boolean checkPassword(String pw1, String pw2) {
        return passwordEncoder.matches(pw1, pw2);
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

    public User updateUser(User user, String newPassword) {
        User user2 = userRepository.getById(user.getId());
        user2.setUsername(user.getUsername());
        if (newPassword != null && !newPassword.isEmpty()) {
            user2.setPassword(passwordEncoder.encode(newPassword));
        }
        user2.setImage(user.getImage());
        userRepository.save(user2);
        return user;
    }
}
