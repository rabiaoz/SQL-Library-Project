package com.ytusql.librarymanagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table (name = "books")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String author;
    @Column(unique = true)
    private String isbn;
    private String description;

    @ManyToOne// (many book to one category)
    @JoinColumn(name = "category_id")
    private Category category; // Her Book nesnesinin bir Category nesnesi vardır.

    @OneToMany(mappedBy = "book")
    private List<LibraryBook> libraryBooks;

    @OneToMany(mappedBy = "book")
    private List<Review> reviews;
}
