package com.ytusql.librarymanagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table (name = "library_books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LibraryBook { // Hangi kitap hangi kütüphanede ve kaç adet var?
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer totalCopies;
    private Integer availableCopies;
    private String location;

    @ManyToOne
    @JoinColumn(name = "library_id")
    private Library library;

    @ManyToOne
    @JoinColumn(name = "book_id")
    private Book book;
    @OneToMany(mappedBy = "libraryBook")
    private List<Loan> loans;
}
