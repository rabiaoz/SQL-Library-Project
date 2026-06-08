package com.ytusql.librarymanagement.repository;

import com.ytusql.librarymanagement.entity.Loan;
import com.ytusql.librarymanagement.enums.LoanStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ytusql.librarymanagement.dto.response.MostBorrowedBookResponse;
import org.springframework.data.jpa.repository.Query;
import com.ytusql.librarymanagement.dto.response.LibraryStatisticsResponse;
import com.ytusql.librarymanagement.dto.response.MostActiveUserResponse;
import java.util.List;

public interface LoanRepository extends JpaRepository<Loan, Long> {

    List<Loan> findByUserId(Long userId);

    List<Loan> findByUserIdAndStatus(Long userId, LoanStatus status);

    int countByUserIdAndStatus(Long userId, LoanStatus status);

    long countByLibraryBookBookId(Long bookId);

    boolean existsByUserIdAndLibraryBookBookIdAndStatus(
            Long userId,
            Long bookId,
            LoanStatus status
    );
    @Query("""
       SELECT new com.ytusql.librarymanagement.dto.response.MostBorrowedBookResponse(
           lb.book.title,
           COUNT(l.id)
       )
       FROM Loan l
       JOIN l.libraryBook lb
       GROUP BY lb.book.title
       ORDER BY COUNT(l.id) DESC
       """)
    List<MostBorrowedBookResponse> findMostBorrowedBooks();

    @Query("""
       SELECT new com.ytusql.librarymanagement.dto.response.MostActiveUserResponse(
           l.user.fullName,
           COUNT(l.id)
       )
       FROM Loan l
       GROUP BY l.user.fullName
       ORDER BY COUNT(l.id) DESC
       """)
    List<MostActiveUserResponse> findMostActiveUsers();

    @Query("""
       SELECT new com.ytusql.librarymanagement.dto.response.LibraryStatisticsResponse(
           l.libraryBook.library.name,
           COUNT(l.id)
       )
       FROM Loan l
       GROUP BY l.libraryBook.library.name
       ORDER BY COUNT(l.id) DESC
       """)
    List<LibraryStatisticsResponse> findLibraryStatistics();
}