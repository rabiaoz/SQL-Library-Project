package com.ytusql.librarymanagement.controller;

import com.ytusql.librarymanagement.dto.request.BorrowBookRequest;
import com.ytusql.librarymanagement.dto.request.ExtendLoanRequest;
import com.ytusql.librarymanagement.dto.response.LoanResponse;
import com.ytusql.librarymanagement.service.LoanService;
import com.ytusql.librarymanagement.enums.LoanStatus;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    @PostMapping
    public LoanResponse borrowBook(@Valid @RequestBody BorrowBookRequest request) {
        return loanService.borrowBook(request);
    }

    @GetMapping("/user/{userId}")
    public List<LoanResponse> getUserLoans(@PathVariable Long userId) {
        return loanService.getUserLoans(userId);
    }

    @PostMapping("/{loanId}/extend")
    public LoanResponse extendLoan(
            @PathVariable Long loanId,
            @Valid @RequestBody ExtendLoanRequest request
    ) {
        return loanService.extendLoan(loanId, request);
    }

    @PostMapping("/{loanId}/return")
    public LoanResponse returnBook(@PathVariable Long loanId) {
        return loanService.returnBook(loanId);
    }

    @GetMapping("/user/{userId}/status")
    public List<LoanResponse> getUserLoansByStatus(
            @PathVariable Long userId,
            @RequestParam LoanStatus status
    ) {
        return loanService.getUserLoansByStatus(userId, status);
    }
}