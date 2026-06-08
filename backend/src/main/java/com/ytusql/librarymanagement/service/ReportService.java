package com.ytusql.librarymanagement.service;

import com.ytusql.librarymanagement.dto.response.MostBorrowedBookResponse;
import com.ytusql.librarymanagement.repository.LoanRepository;
import com.ytusql.librarymanagement.dto.response.LibraryStatisticsResponse;
import com.ytusql.librarymanagement.dto.response.MostActiveUserResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private final LoanRepository loanRepository;

    public ReportService(LoanRepository loanRepository) {
        this.loanRepository = loanRepository;
    }

    public List<MostBorrowedBookResponse> getMostBorrowedBooks() {
        return loanRepository.findMostBorrowedBooks();
    }
    public List<MostActiveUserResponse> getMostActiveUsers() {
        return loanRepository.findMostActiveUsers();
    }
    public List<LibraryStatisticsResponse> getLibraryStatistics() {
        return loanRepository.findLibraryStatistics();
    }
}
