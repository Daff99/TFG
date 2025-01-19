package com.example.demo.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity //Habilita la integración con Spring Security
public class SecurityConfig {

    @Autowired
    private CustomAuthenticationFailureHandler failureHandler;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http 
                .authorizeHttpRequests(auth -> auth
                //Aquí lo que hago es permitir el acceso a favs.html y profile.html solo si el usuario está autenticado
                    .requestMatchers("/favs").authenticated()
                    .requestMatchers("/profile").authenticated()
                    .anyRequest().permitAll() //Las demás pantallas, como no hace falta estar autenticado, se permite el acceso
                )
                .formLogin(form -> form
                    .loginPage("/login") //Esta es la ruta personalizada para el inicio de sesion
                    //El email y la contraseña son los parametros requeridos para iniciar sesion
                    .usernameParameter("email") 
                    .passwordParameter("password")
                    .defaultSuccessUrl("/", true) //En caso de que la autenticacion haya sido un exito, se redirige a la pagina principal
                    .failureHandler(failureHandler) //En caso de que no, se lanza el controlador personalizado para los fallos de autenticacion
                )
                .logout(config -> config.logoutSuccessUrl("/")) //Esto controla la pagina a la que el usuario será redirigido despues de cerrar sesion
                .build();
    }

    //Para codificar las contraseñas en mi base de datos
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
}
