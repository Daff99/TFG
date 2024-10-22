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
            @RequestParam("password") String password, /*@RequestParam("image") String imagen*/ Model model) {
        //userService.createUser(name, email, password, imagen);
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
    public String updateProfile(Model model, 
                                @RequestParam("image") MultipartFile image, 
                                @RequestParam("id") Long userId, 
                                @RequestParam("username") String username, 
                                @RequestParam("password") String password, 
                                Authentication auth) {
        // Obtener el usuario existente
        User user = userService.findById2(userId);
        
        // Actualizar los campos
        user.setUsername(username);
        user.setPassword(password); // Considera hacer hashing de la contraseña aquí

        if (!image.isEmpty()) {
            // Define el directorio donde se guardará la imagen
            Path directorio = Paths.get("demo\\src\\main\\resources\\static\\assets\\img\\profile");
            String nombreArchivo = StringUtils.cleanPath(image.getOriginalFilename());
            Path rutaCompleta = directorio.resolve(nombreArchivo);
            
            try (InputStream inputStream = image.getInputStream()) {
                // Guarda la imagen en el directorio
                Files.copy(inputStream, rutaCompleta, StandardCopyOption.REPLACE_EXISTING);
                user.setImage(nombreArchivo); // Actualiza el nombre de la imagen en la base de datos
            } catch(IOException e) {
                e.printStackTrace();
            }
        }

        userService.updateUser(user); // Actualiza el usuario en la base de datos
        return "redirect:/profile"; // Redirige a la página de perfil
    }


}
