package com.ytusql.librarymanagement.dto.response;
// DTO (Data Transfer Object) frontend ile backend arasında
// veri taşımak için kullanılır.
/*
*
*
Kullanıcı kayıt oluyor.

Frontend gönderir:
{
  "fullName": "Ali",
  "email": "ali@gmail.com",
  "password": "123456"
}
Backend bunu:

RegisterRequest

DTO'suna alır.
* Bir kitap listesi döndürürken:

Book

entity'sini direkt göndermek yerine:

BookResponse

göndeririz.

Örneğin:

{
  "id": 1,
  "title": "1984",
  "author": "George Orwell"
}

Mantık:

Frontend
    ↓
Request DTO
    ↓
Service
    ↓
Entity
    ↓
Database

ve

Database
    ↓
Entity
    ↓
Response DTO
    ↓
Frontend
*
* */
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponse {

    private String token;
    private UserResponse user;
}