package com.ytusql.librarymanagement.controller;

import com.ytusql.librarymanagement.dto.request.LoginRequest;
import com.ytusql.librarymanagement.dto.request.RegisterRequest;
import com.ytusql.librarymanagement.dto.response.AuthResponse;
import com.ytusql.librarymanagement.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public AuthResponse register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
