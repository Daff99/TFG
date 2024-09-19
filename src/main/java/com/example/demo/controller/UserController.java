package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.model.User;

@Controller
public class UserController {

    @GetMapping("/login")
    public String showLoginForm(Model model) {
        User user = new User();
        model.addAttribute("user", user);
        return "loginregister.html";
    }

    @PostMapping("/login")
    public String loginUser(@ModelAttribute("user") User user, @RequestParam("email") String email,
        @RequestParam("password") String password, Model model) {
            user.setEmail(email);
            model.addAttribute("session", model);
            return "index.html";
    }

    


    
    
}
