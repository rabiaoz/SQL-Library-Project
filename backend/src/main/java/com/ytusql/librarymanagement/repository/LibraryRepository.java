package com.ytusql.librarymanagement.repository;

import com.ytusql.librarymanagement.entity.Library;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LibraryRepository extends JpaRepository<Library, Long> {
}