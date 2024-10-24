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

import com.amazonaws.AmazonServiceException;
import com.amazonaws.SdkClientException;
import com.amazonaws.regions.Regions;
import com.example.demo.model.Register;
import com.example.demo.model.Team;
import com.example.demo.model.User;
import com.example.demo.repositories.TeamRepository;
import com.example.demo.repositories.UserRepository;
import com.example.demo.services.S3Service;
import com.example.demo.services.UserService;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Controller
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private S3Service awsService;
    @Autowired
    private TeamRepository teamRepository;
    private String bucketName = "images-daff";
    private Regions regions = Regions.EU_NORTH_1;

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
                                Authentication auth) throws AmazonServiceException, SdkClientException, IOException {
        User user = userService.findById2(userId);
        user.setUsername(username);
        user.setPassword(password); 
        String filename = image.getOriginalFilename();
        awsService.uploadToS3(image.getInputStream(), filename);
        if (!image.isEmpty()) {
            try {
                String nombreArchivo = image.getOriginalFilename();
                awsService.uploadToS3(image.getInputStream(), nombreArchivo);
                user.setImage("https://" + bucketName + ".s3." + regions.getName() + ".amazonaws.com/" + nombreArchivo);
            } catch(IOException | SdkClientException e) {
                e.printStackTrace();
                model.addAttribute("error", "error");
            }
            model.addAttribute("message", "imagen subida correctamente!");
        }

        userService.updateUser(user); 
        return "redirect:/profile"; 
    }

    @GetMapping("/favs")
    public String showFavourites(Model model, Authentication auth) {
        String username = auth.getName();
        User user = userRepository.findByEmail(username);
        List<Team> favouriteTeams = user.getFavouriteTeams();
        model.addAttribute("favouriteTeams", favouriteTeams);
        return "favs";
    }

    @PostMapping("/addFavouriteTeam")
    public String addFavouriteTeams(@RequestParam("teamId") Long teamId, Authentication auth) {
        String username = auth.getName();
        User user = userRepository.findByEmail(username);
        Team team = teamRepository.findByApiId(teamId);
        if (user.getFavouriteTeams().contains(team)) {
            user.getFavouriteTeams().remove(team);
        } else {
            user.getFavouriteTeams().add(team);
        }
        userRepository.save(user);
        return "redirect:/favs";
    }
    
}
