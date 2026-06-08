package com.ytusql.librarymanagement.repository;

import com.ytusql.librarymanagement.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;


public interface UserRepository extends JpaRepository<User, Long> {
    // Repository veri tabanı ile konuşan katmandır.
    // Repository = Veritabanı işlerini yapan katman.
    // userRepository.save (user); Kullanıcıyı veri tabanına kaydeder.
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
}