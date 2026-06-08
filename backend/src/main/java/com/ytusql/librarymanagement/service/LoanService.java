package com.ytusql.librarymanagement.service;

import com.ytusql.librarymanagement.dto.request.BorrowBookRequest;
import com.ytusql.librarymanagement.dto.request.ExtendLoanRequest;
import com.ytusql.librarymanagement.dto.response.LoanResponse;
import com.ytusql.librarymanagement.entity.LibraryBook;
import com.ytusql.librarymanagement.entity.Loan;
import com.ytusql.librarymanagement.entity.User;
import com.ytusql.librarymanagement.enums.LoanStatus;
import com.ytusql.librarymanagement.exception.ConflictException;
import com.ytusql.librarymanagement.exception.EntityNotFoundException;
import com.ytusql.librarymanagement.exception.NotPermittedException;
import com.ytusql.librarymanagement.repository.LibraryBookRepository;
import com.ytusql.librarymanagement.repository.LoanRepository;
import com.ytusql.librarymanagement.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final UserRepository userRepository;
    private final LibraryBookRepository libraryBookRepository;

    public LoanService(
            LoanRepository loanRepository,
            UserRepository userRepository,
            LibraryBookRepository libraryBookRepository
    ) {
        this.loanRepository = loanRepository;
        this.userRepository = userRepository;
        this.libraryBookRepository = libraryBookRepository;
    }

    @Transactional
    public LoanResponse borrowBook(BorrowBookRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new EntityNotFoundException("User not found."));

        LibraryBook libraryBook = libraryBookRepository.findById(request.getLibraryBookId())
                .orElseThrow(() -> new EntityNotFoundException("Library book not found."));

        int activeLoanCount = loanRepository.countByUserIdAndStatus(user.getId(), LoanStatus.ACTIVE);

        if (activeLoanCount >= 3) {
            throw new ConflictException("A user can borrow a maximum of 3 books at the same time.");
        }

        if (libraryBook.getAvailableCopies() == null || libraryBook.getAvailableCopies() <= 0) {
            throw new ConflictException("This book is currently unavailable.");
        }

        Loan loan = new Loan();
        loan.setUser(user);
        loan.setLibraryBook(libraryBook);
        loan.setBorrowDate(LocalDate.now());
        loan.setDueDate(LocalDate.now().plusDays(30));
        loan.setReturnDate(null);
        loan.setExtensionDays(0);
        loan.setStatus(LoanStatus.ACTIVE);

        libraryBook.setAvailableCopies(libraryBook.getAvailableCopies() - 1);
        user.setPoints(user.getPoints() + 5);

        Loan savedLoan = loanRepository.save(loan);
        libraryBookRepository.save(libraryBook);
        userRepository.save(user);

        return toResponse(savedLoan);
    }

    public List<LoanResponse> getUserLoans(Long userId) {
        return loanRepository.findByUserId(userId)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Transactional
    public LoanResponse extendLoan(Long loanId, ExtendLoanRequest request) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new EntityNotFoundException("No loan record found."));

        if (loan.getStatus() != LoanStatus.ACTIVE) {
            throw new NotPermittedException("Only active loans can be extended.");
        }

        if (request.getExtensionDays() != 15 && request.getExtensionDays() != 30) {
            throw new ConflictException("The period can only be extended by 15 or 30 days.");
        }

        loan.setDueDate(loan.getDueDate().plusDays(request.getExtensionDays()));
        loan.setExtensionDays(loan.getExtensionDays() + request.getExtensionDays());

        return toResponse(loanRepository.save(loan));
    }

    @Transactional
    public LoanResponse returnBook(Long loanId) {
        Loan loan = loanRepository.findById(loanId)
                .orElseThrow(() -> new EntityNotFoundException("No loan record found."));

        if (loan.getStatus() != LoanStatus.ACTIVE) {
            throw new NotPermittedException("This book has already been returned.");
        }

        LocalDate today = LocalDate.now();

        loan.setReturnDate(today);

        LibraryBook libraryBook = loan.getLibraryBook();
        libraryBook.setAvailableCopies(libraryBook.getAvailableCopies() + 1);

        if (today.isAfter(loan.getDueDate())) {
            loan.setStatus(LoanStatus.LATE);
            User user = loan.getUser();
            user.setPoints(user.getPoints() - 1);
            userRepository.save(user);
        } else {
            loan.setStatus(LoanStatus.RETURNED);
        }

        libraryBookRepository.save(libraryBook);
        return toResponse(loanRepository.save(loan));
    }

    private LoanResponse toResponse(Loan loan) {
        LoanResponse response = new LoanResponse();
        response.setId(loan.getId());
        response.setBookTitle(loan.getLibraryBook().getBook().getTitle());
        response.setLibraryName(loan.getLibraryBook().getLibrary().getName());
        response.setBorrowDate(loan.getBorrowDate());
        response.setDueDate(loan.getDueDate());
        response.setReturnDate(loan.getReturnDate());
        response.setExtensionDays(loan.getExtensionDays());
        response.setStatus(loan.getStatus());
        return response;
    }
    public List<LoanResponse> getUserLoansByStatus(Long userId, LoanStatus status) {

        return loanRepository.findByUserIdAndStatus(userId, status)
                .stream()
                .map(this::toResponse)
                .toList();
    }
}