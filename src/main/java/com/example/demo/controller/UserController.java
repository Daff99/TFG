package com.example.demo.controller;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;
import com.example.demo.model.Register;
import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.UserService;
import java.nio.file.StandardCopyOption;

@Controller
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;

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

    @GetMapping("editProfile")
    public String editProfile(Model model, Authentication auth) {
        String username = auth.getName();
        User user = userRepository.findByEmail(username);
        model.addAttribute("user", user);
        return "editProfile";
    }

    @PostMapping("editProfile")
    public String updateProfile(@ModelAttribute User user, Authentication auth, @RequestParam("image") MultipartFile image) throws IOException {
        if (!image.isEmpty()) {
            String fileName = StringUtils.cleanPath(image.getOriginalFilename());
            user.setImage(fileName);
            String upload = "images/" + user.getId();
            saveImage(upload, fileName, image);
        }
        userService.updateUser(user);
        return "redirect:/profile";
    }

    private void saveImage(String dir, String fileName, MultipartFile image) throws IOException {
        Path upPath = Paths.get(dir);
        if (!Files.exists(upPath)) {
            Files.createDirectories(upPath);
        }
        try (InputStream is = image.getInputStream()) {
            Path filePath = upPath.resolve(fileName);
            Files.copy(is, filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new IOException("No se puede guardar el archivo");
        }
    }
}
