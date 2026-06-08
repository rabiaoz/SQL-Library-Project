package com.ytusql.librarymanagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity //Bu sınıf bir veri tabanı tablosuna karşılık gelecek
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id //Primary Key'dir. Her kullanıcıyı benzersiz tanımlar.
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // id'yi sen verme, veritabanı otomatik oluştursun.

    private Long id;
    private String fullName;

    @Column(unique = true, nullable = false)
    //İki kural koyduk:
    //1 - Aynı email iki kez kullanılamaz.
    //2 - Email boş bırakılamaz.
    private String email;
    private String password;
    private Integer points = 0;
    @OneToMany(mappedBy = "user")
    private List<Loan> loans;
    @OneToMany(mappedBy = "user")
    private List<Review> reviews;
}
