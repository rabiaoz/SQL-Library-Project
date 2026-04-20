# Library Management System

This project is a relational database system designed to manage multiple library branches in a centralized way.

The main goal is to solve the problem of tracking book availability, borrowing activity, and user interactions across different libraries.

Instead of isolated systems, this platform allows users to search for books, see which libraries have them, borrow them, and leave verified reviews.


## The Problem

In real-world library systems, data is often fragmented.

- Users cannot easily find which library has a specific book  
- Borrowing records are stored separately across branches  
- Review systems are unreliable because anyone can leave feedback  


## The Solution

This project centralizes all library data into a single SQL-based system.

With this system, users can:
- Search for books across multiple libraries  
- See real-time availability of books  
- Borrow books from specific library branches  
- Leave reviews only if they have previously borrowed the book  


## Database Structure

The project is built around 6 core tables:

- **Users** → Stores user information and activity (including points)
- **Libraries** → Represents different library branches
- **Books** → Contains general information about books
- **LibraryBooks** → Tracks which books are available in which libraries
- **Loans** → Records borrowing transactions
- **Reviews** → Stores user reviews and ratings for books


## Key Relationships

- A user can borrow multiple books  
- A book can exist in multiple libraries  
- A library can contain multiple books  
- A user can write reviews for books they have borrowed  
- A book can have multiple reviews  


## Key Features

- **Centralized Search**  
  Users can find which libraries have a specific book using SQL JOIN operations.

- **Borrowing System**  
  Tracks borrowing history, due dates, and returns.

- **Verified Review System**  
  Only users who borrowed a book can review it.


## SQL Techniques Used

- **JOIN** → Combine data from Users, Books, and Libraries  
- **GROUP BY & Aggregation** → Analyze user activity and book popularity  
- **VIEWS** → Simplify commonly used queries  
- **SUBQUERIES** → Handle advanced filtering  
- **CONSTRAINTS** → Ensure data integrity (PK, FK, UNIQUE, CHECK)

---

## Sample Queries

### Find which libraries have a specific book
```sql
SELECT l.library_name, b.title
FROM Libraries l
JOIN LibraryBooks lb ON l.library_id = lb.library_id
JOIN Books b ON lb.book_id = b.book_id
WHERE b.title = 'Harry Potter';
