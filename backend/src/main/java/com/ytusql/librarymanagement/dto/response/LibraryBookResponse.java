package com.ytusql.librarymanagement.dto.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LibraryBookResponse {
    private Long id;
    private Long libraryId;
    private String libraryName;
    private Integer totalCopies;
    private Integer availableCopies;
    private String location;
}