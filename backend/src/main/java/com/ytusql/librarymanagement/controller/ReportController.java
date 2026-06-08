package com.ytusql.librarymanagement.controller;

import com.ytusql.librarymanagement.dto.response.MostBorrowedBookResponse;
import com.ytusql.librarymanagement.service.ReportService;
import org.springframework.web.bind.annotation.GetMapping;
import com.ytusql.librarymanagement.dto.response.MostActiveUserResponse;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.ytusql.librarymanagement.dto.response.LibraryStatisticsResponse;

import java.util.List;

@RestController
@RequestMapping("/api/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/most-borrowed-books")
    public List<MostBorrowedBookResponse> getMostBorrowedBooks() {
        return reportService.getMostBorrowedBooks();
    }

    @GetMapping("/most-active-users")
    public List<MostActiveUserResponse> getMostActiveUsers() {
        return reportService.getMostActiveUsers();
    }

    @GetMapping("/library-statistics")
    public List<LibraryStatisticsResponse> getLibraryStatistics() {
        return reportService.getLibraryStatistics();
    }
}