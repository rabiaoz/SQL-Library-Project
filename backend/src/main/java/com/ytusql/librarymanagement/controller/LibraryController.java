package com.ytusql.librarymanagement.controller;

import com.ytusql.librarymanagement.dto.response.LibraryResponse;
import com.ytusql.librarymanagement.service.LibraryService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/libraries")
public class LibraryController {

    private final LibraryService libraryService;

    public LibraryController(LibraryService libraryService) {
        this.libraryService = libraryService;
    }

    @GetMapping
    public List<LibraryResponse> getAllLibraries() {
        return libraryService.getAllLibraries();
    }
}