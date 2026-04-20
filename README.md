# SQL-Library-Project
a library system with personalization options
MTM4692 - Smart Library Management System: This project is a library management database developed within the scope of the MTM4692 Applied SQL course at Yıldız Technical University. The aim of the project is to establish a robust SQL infrastructure that manages book borrowing and return processes, user interactions (comments), and hierarchical book categories.
1. Problem Statement : In addition to the traditional library borrowing process and the categorization of books by genre, there is a lack of a data structure that allows users to leave feedback (comments and ratings) about the books they have read, in line with modern needs.
2. Project Significance and Justification: This project provides the following advantages by digitizing library management:
Efficiency: Makes borrowing and return processes transparent.
Hierarchical Structure: Offers unlimited depth of category management thanks to its recursive CTE structure.
User Interaction: Creates a library community with a profile-based review system.
3. Schema Design : The project consists of 7 main, interrelated tables: Users, Books, Authors Categories, Loans, Reviews, Fines.
4. Proposed SQL Features:
Recursive CTE: For listing category trees (e.g., Main Category > Subcategory). Advanced Joins & Aggregations: For calculating the most popular books and user statistics. Views: For quickly viewing active penalties and books that need to be refunded today. Constraints: Restrictions for Primary Key, Foreign Key, and data integrity.
5. Pseudocode
  1.) Analysis of the Most Popular Books
Process: Combine the Books table with the Reviews table. Average the ratings each book received and count the number of reviews. Sort by average rating from highest to lowest and show only the top 5 results.
  2.) Hierarchical Categorization
Process: Create a self-join loop around the Categories table. Select "Main Categories" (e.g., Science, Art) where the 'parent_id' value is empty. Add subcategories linked to these main categories, building a tree structure at each level. Present all types in the library as a hierarchical list.
  3.) Detection of Overdue Refunds and Penalties
Process: Connect the Users, Loans, and Fines tables. Find the records where the penalty is still "Unpaid". Display which user owes how much for which loan transaction, along with their username.
