package com.ytusql.librarymanagement.repository;

import com.ytusql.librarymanagement.entity.LibraryBook;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface LibraryBookRepository extends JpaRepository<LibraryBook, Long> {
    List<LibraryBook> findByBookId(Long bookId);
}