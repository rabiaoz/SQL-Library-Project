package com.ytusql.librarymanagement.service;

import com.ytusql.librarymanagement.dto.response.UserResponse;
import com.ytusql.librarymanagement.entity.User;
import com.ytusql.librarymanagement.exception.EntityNotFoundException;
import com.ytusql.librarymanagement.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserResponse getUserById(Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("User not found."));

        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setFullName(user.getFullName());
        response.setEmail(user.getEmail());
        response.setPoints(user.getPoints());

        return response;
    }
}