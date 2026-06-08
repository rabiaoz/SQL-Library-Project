package com.ytusql.librarymanagement.service;

import com.ytusql.librarymanagement.dto.response.LibraryResponse;
import com.ytusql.librarymanagement.entity.Library;
import com.ytusql.librarymanagement.repository.LibraryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LibraryService {

    private final LibraryRepository libraryRepository;

    public LibraryService(LibraryRepository libraryRepository) {
        this.libraryRepository = libraryRepository;
    }

    public List<LibraryResponse> getAllLibraries() {
        return libraryRepository.findAll()
                .stream()
                .map(this::toResponse)
                .toList();
    }

    private LibraryResponse toResponse(Library library) {
        LibraryResponse response = new LibraryResponse();
        response.setId(library.getId());
        response.setName(library.getName());
        response.setAddress(library.getAddress());
        response.setCity(library.getCity());
        return response;
    }
}