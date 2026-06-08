package com.ytusql.librarymanagement.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewCreateRequest {

    @NotNull(message = "User id is required.")
    private Long userId;

    @NotNull(message = "Book id is required.")
    private Long bookId;

    @NotNull(message = "Rating is required.")
    private Integer rating;

    @NotBlank(message = "Comment cannot be empty.")
    private String comment;
}