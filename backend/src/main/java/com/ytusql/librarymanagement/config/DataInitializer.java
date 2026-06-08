package com.ytusql.librarymanagement.config;

import com.ytusql.librarymanagement.entity.*;
import com.ytusql.librarymanagement.repository.*;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    private final LibraryRepository libraryRepository;
    private final CategoryRepository categoryRepository;
    private final BookRepository bookRepository;
    private final LibraryBookRepository libraryBookRepository;

    public DataInitializer(
            LibraryRepository libraryRepository,
            CategoryRepository categoryRepository,
            BookRepository bookRepository,
            LibraryBookRepository libraryBookRepository
    ) {
        this.libraryRepository = libraryRepository;
        this.categoryRepository = categoryRepository;
        this.bookRepository = bookRepository;
        this.libraryBookRepository = libraryBookRepository;
    }

    @Override
    public void run(String... args) {
        if (libraryRepository.count() > 0) {
            return;
        }

        Library kadikoy = new Library();
        kadikoy.setName("Kadıköy Kütüphanesi");
        kadikoy.setAddress("Kadıköy / İstanbul");
        kadikoy.setCity("İstanbul");

        Library besiktas = new Library();
        besiktas.setName("Beşiktaş Kütüphanesi");
        besiktas.setAddress("Beşiktaş / İstanbul");
        besiktas.setCity("İstanbul");

        libraryRepository.save(kadikoy);
        libraryRepository.save(besiktas);

        Category roman = new Category();
        roman.setName("Roman");

        Category bilim = new Category();
        bilim.setName("Bilim");

        categoryRepository.save(roman);
        categoryRepository.save(bilim);

        Book book1 = new Book();
        book1.setTitle("Suç ve Ceza");
        book1.setAuthor("Fyodor Dostoyevski");
        book1.setIsbn("9780140449136");
        book1.setDescription("Klasik roman.");
        book1.setCategory(roman);

        Book book2 = new Book();
        book2.setTitle("1984");
        book2.setAuthor("George Orwell");
        book2.setIsbn("9780451524935");
        book2.setDescription("Distopik roman.");
        book2.setCategory(roman);

        bookRepository.save(book1);
        bookRepository.save(book2);

        LibraryBook lb1 = new LibraryBook();
        lb1.setLibrary(kadikoy);
        lb1.setBook(book1);
        lb1.setTotalCopies(3);
        lb1.setAvailableCopies(3);
        lb1.setLocation("A-12");

        LibraryBook lb2 = new LibraryBook();
        lb2.setLibrary(besiktas);
        lb2.setBook(book1);
        lb2.setTotalCopies(2);
        lb2.setAvailableCopies(2);
        lb2.setLocation("B-04");

        LibraryBook lb3 = new LibraryBook();
        lb3.setLibrary(kadikoy);
        lb3.setBook(book2);
        lb3.setTotalCopies(1);
        lb3.setAvailableCopies(1);
        lb3.setLocation("C-08");

        libraryBookRepository.save(lb1);
        libraryBookRepository.save(lb2);
        libraryBookRepository.save(lb3);
    }
}
