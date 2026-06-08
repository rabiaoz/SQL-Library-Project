package com.ytusql.librarymanagement.dto.response;

import com.ytusql.librarymanagement.enums.LoanStatus;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class LoanResponse {
    private Long id;
    private String bookTitle;
    private String libraryName;
    private LocalDate borrowDate;
    private LocalDate dueDate;
    private LocalDate returnDate;
    private Integer extensionDays;
    private LoanStatus status;
}