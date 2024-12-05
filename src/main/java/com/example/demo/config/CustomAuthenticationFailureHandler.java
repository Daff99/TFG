package com.example.demo.config;

import java.io.IOException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException {
        String errorMessage = "Credenciales incorrectas";
        if (exception instanceof BadCredentialsException) {
            errorMessage = "Correo o contraseña incorrectos";
        }
        request.getSession().setAttribute("errorMessage", errorMessage);
        response.sendRedirect("/login");
    }
}
