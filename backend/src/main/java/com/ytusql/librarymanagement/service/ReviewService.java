package com.ytusql.librarymanagement.service;

import com.ytusql.librarymanagement.dto.request.ReviewCreateRequest;
import com.ytusql.librarymanagement.dto.response.ReviewResponse;
import com.ytusql.librarymanagement.entity.Book;
import com.ytusql.librarymanagement.entity.Review;
import com.ytusql.librarymanagement.entity.User;
import com.ytusql.librarymanagement.enums.LoanStatus;
import com.ytusql.librarymanagement.exception.ConflictException;
import com.ytusql.librarymanagement.exception.EntityNotFoundException;
import com.ytusql.librarymanagement.exception.NotPermittedException;
import com.ytusql.librarymanagement.repository.BookRepository;
import com.ytusql.librarymanagement.repository.LoanRepository;
import com.ytusql.librarymanagement.repository.ReviewRepository;
import com.ytusql.librarymanagement.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final UserRepository userRepository;
    private final BookRepository bookRepository;
    private final LoanRepository loanRepository;

    public ReviewService(
            ReviewRepository reviewRepository,
            UserRepository userRepository,
            BookRepository bookRepository,
            LoanRepository loanRepository
    ) {
        this.reviewRepository = reviewRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.loanRepository = loanRepository;
    }

    public ReviewResponse createReview(ReviewCreateRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found."));

        Book book = bookRepository.findById(request.getBookId())
                .orElseThrow(() -> new EntityNotFoundException("Book not found."));

        boolean returned = loanRepository.existsByUserIdAndLibraryBookBookIdAndStatus(
                user.getId(),
                book.getId(),
                LoanStatus.RETURNED
        );

        boolean lateReturned = loanRepository.existsByUserIdAndLibraryBookBookIdAndStatus(
                user.getId(),
                book.getId(),
                LoanStatus.LATE
        );

        if (!returned && !lateReturned) {
            throw new NotPermittedException("You can only review books that you have borrowed and returned.");
        }

        if (reviewRepository.existsByUserIdAndBookId(user.getId(), book.getId())) {
            throw new ConflictException("You have already reviewed this book.");
        }

        Review review = new Review();
        review.setUser(user);
        review.setBook(book);
        review.setRating(request.getRating());
        review.setComment(request.getComment());
        review.setCreatedAt(LocalDateTime.now());

        return toResponse(reviewRepository.save(review));
    }

    private ReviewResponse toResponse(Review review) {
        ReviewResponse response = new ReviewResponse();
        response.setId(review.getId());
        response.setUserName(review.getUser().getFullName());
        response.setRating(review.getRating());
        response.setComment(review.getComment());
        response.setCreatedAt(review.getCreatedAt());
        return response;
    }
}