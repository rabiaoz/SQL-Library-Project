package com.ytusql.librarymanagement.service;

import com.ytusql.librarymanagement.dto.request.LoginRequest;
import com.ytusql.librarymanagement.dto.request.RegisterRequest;
import com.ytusql.librarymanagement.dto.response.AuthResponse;
import com.ytusql.librarymanagement.dto.response.UserResponse;
import com.ytusql.librarymanagement.entity.User;
import com.ytusql.librarymanagement.exception.ConflictException;
import com.ytusql.librarymanagement.exception.NotPermittedException;
import com.ytusql.librarymanagement.repository.UserRepository;
import org.springframework.stereotype.Service;
import com.ytusql.librarymanagement.security.JwtUtils;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    public AuthService(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtils jwtUtils
    ) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtils = jwtUtils;
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ConflictException("This email is already in use.");
        }

        User user = new User();
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setPoints(0);

        User savedUser = userRepository.save(user);

        String token = jwtUtils.generateToken(savedUser.getId(), savedUser.getEmail());

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setUser(toUserResponse(savedUser));

        return response;
    }

    public AuthResponse login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new NotPermittedException("Invalid email or password."));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new NotPermittedException("Invalid email or password.");
        }

        String token = jwtUtils.generateToken(user.getId(), user.getEmail());

        AuthResponse response = new AuthResponse();
        response.setToken(token);
        response.setUser(toUserResponse(user));

        return response;
    }

    private UserResponse toUserResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setPoints(user.getPoints());
        return response;
    }
}
