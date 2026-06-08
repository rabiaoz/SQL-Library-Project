package com.ytusql.librarymanagement.service;

import com.ytusql.librarymanagement.dto.response.*;
import com.ytusql.librarymanagement.entity.Book;
import com.ytusql.librarymanagement.entity.LibraryBook;
import com.ytusql.librarymanagement.entity.Review;
import com.ytusql.librarymanagement.exception.EntityNotFoundException;
import com.ytusql.librarymanagement.repository.BookRepository;
import com.ytusql.librarymanagement.repository.LibraryBookRepository;
import com.ytusql.librarymanagement.repository.LoanRepository;
import com.ytusql.librarymanagement.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final LibraryBookRepository libraryBookRepository;
    private final LoanRepository loanRepository;
    private final ReviewRepository reviewRepository;

    public BookService(
            BookRepository bookRepository,
            LibraryBookRepository libraryBookRepository,
            LoanRepository loanRepository,
            ReviewRepository reviewRepository
    ) {
        this.bookRepository = bookRepository;
        this.libraryBookRepository = libraryBookRepository;
        this.loanRepository = loanRepository;
        this.reviewRepository = reviewRepository;
    }

    public List<BookResponse> getBooks(String search) {
        List<Book> books;

        if (search == null || search.isBlank()) {
            books = bookRepository.findAll();
        } else {
            books = bookRepository.findByTitleContainingIgnoreCase(search);
        }

        return books.stream()
                .map(this::toBookResponse)
                .toList();
    }

    public BookDetailResponse getBookDetail(Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new EntityNotFoundException("Book not found."));

        List<LibraryBook> libraryBooks = libraryBookRepository.findByBookId(bookId);
        List<Review> reviews = reviewRepository.findByBookId(bookId);

        BookDetailResponse response = new BookDetailResponse();
        response.setId(book.getId());
        response.setTitle(book.getTitle());
        response.setAuthor(book.getAuthor());
        response.setIsbn(book.getIsbn());
        response.setDescription(book.getDescription());
        response.setCategoryName(book.getCategory() != null ? book.getCategory().getName() : null);
        response.setBorrowCount(loanRepository.countByLibraryBookBookId(bookId));
        response.setAvailable(libraryBooks.stream().anyMatch(lb -> lb.getAvailableCopies() > 0));

        response.setLibraries(
                libraryBooks.stream()
                        .map(this::toLibraryBookResponse)
                        .toList()
        );

        response.setReviews(
                reviews.stream()
                        .map(this::toReviewResponse)
                        .toList()
        );

        return response;
    }

    private BookResponse toBookResponse(Book book) {
        List<LibraryBook> libraryBooks = libraryBookRepository.findByBookId(book.getId());

        BookResponse response = new BookResponse();
        response.setId(book.getId());
        response.setTitle(book.getTitle());
        response.setAuthor(book.getAuthor());
        response.setIsbn(book.getIsbn());
        response.setCategoryName(book.getCategory() != null ? book.getCategory().getName() : null);
        response.setBorrowCount(loanRepository.countByLibraryBookBookId(book.getId()));
        response.setAvailable(libraryBooks.stream().anyMatch(lb -> lb.getAvailableCopies() > 0));
        return response;
    }

    private LibraryBookResponse toLibraryBookResponse(LibraryBook libraryBook) {
        LibraryBookResponse response = new LibraryBookResponse();
        response.setId(libraryBook.getId());
        response.setLibraryId(libraryBook.getLibrary().getId());
        response.setLibraryName(libraryBook.getLibrary().getName());
        response.setTotalCopies(libraryBook.getTotalCopies());
        response.setAvailableCopies(libraryBook.getAvailableCopies());
        response.setLocation(libraryBook.getLocation());
        return response;
    }

    private ReviewResponse toReviewResponse(Review review) {
        ReviewResponse response = new ReviewResponse();
        response.setId(review.getId());
        response.setUserName(review.getUser().getFullName());
        response.setRating(review.getRating());
        response.setComment(review.getComment());
        response.setCreatedAt(review.getCreatedAt());
        return response;
    }
}