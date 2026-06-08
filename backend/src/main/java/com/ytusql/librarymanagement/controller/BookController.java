package com.ytusql.librarymanagement.controller;

import com.ytusql.librarymanagement.dto.response.BookDetailResponse;
import com.ytusql.librarymanagement.dto.response.BookResponse;
import com.ytusql.librarymanagement.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    public List<BookResponse> getBooks(@RequestParam(required = false) String search) {
        return bookService.getBooks(search);
    }

    @GetMapping("/{id}")
    public BookDetailResponse getBookDetail(@PathVariable Long id) {
        return bookService.getBookDetail(id);
    }
}