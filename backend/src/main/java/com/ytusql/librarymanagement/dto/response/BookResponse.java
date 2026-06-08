package com.ytusql.librarymanagement.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BookResponse {
    private Long id;
    private String title;
    private String author;
    private String isbn;
    private String categoryName;
    private Long borrowCount;
    private Boolean available;
}