package com.ytusql.librarymanagement.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BorrowBookRequest {

    @NotNull(message = "User id is required.")
    private Long userId;

    @NotNull(message = "Library book id is required.")
    private Long libraryBookId;
}