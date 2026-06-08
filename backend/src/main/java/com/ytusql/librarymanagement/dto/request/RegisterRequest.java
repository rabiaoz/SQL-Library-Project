package com.ytusql.librarymanagement.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message="Full name cannot be empty.")
    private String fullName;
    @NotBlank(message="Email cannot be empty.")
    @Email(message = "Please enter a valid email address.")
    private String email;
    @NotBlank(message = "Password cannot be empty.")
    private String password;
}