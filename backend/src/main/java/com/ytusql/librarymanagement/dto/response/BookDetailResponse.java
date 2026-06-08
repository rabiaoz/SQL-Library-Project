package com.ytusql.librarymanagement.dto.response;

import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Getter
@Setter
public class BookDetailResponse {
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private String description;
    private String categoryName;
    private Long borrowCount;
    private Boolean available;

    private List<LibraryBookResponse> libraries;
    private List<ReviewResponse> reviews;
}