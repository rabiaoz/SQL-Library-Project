package com.ytusql.librarymanagement.controller;

import com.ytusql.librarymanagement.dto.request.ReviewCreateRequest;
import com.ytusql.librarymanagement.dto.response.ReviewResponse;
import com.ytusql.librarymanagement.service.ReviewService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ReviewResponse createReview(@Valid @RequestBody ReviewCreateRequest request) {
        return reviewService.createReview(request);
    }
}