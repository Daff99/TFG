package com.example.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.demo.model.Register;
import com.example.demo.model.User;
import com.example.demo.services.UserService;

@Controller
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public String showLoginForm(Model model) {
        User user = new User();
        model.addAttribute("user", user);
        return "login";
    }

    @GetMapping("/register")
    public String register(Model model) {
        Register r = new Register();
        model.addAttribute("r", r);
        return "register";
    }

    @PostMapping("/register")
    public String processRegistration(@RequestParam("name") String name, @RequestParam("email") String email, 
            @RequestParam("password") String password, Model model) {
        userService.createUser(name, email, password);
        return "redirect:/login";
    }
}
