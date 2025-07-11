package com.example.demo.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.BookRequest;
import com.example.demo.entity.Book;
import com.example.demo.entity.User;
import com.example.demo.repo.BookRepo;
import com.example.demo.repo.UserRepo;
import com.example.demo.service.BookService;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public Book addBook(String email, BookRequest request) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Book book = new Book();
        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setUser(user);
        return bookRepo.save(book);
    }

    @Override
    public Book updateBook(String email, Long bookId, BookRequest request) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (!book.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized to update this book");
        }

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        return bookRepo.save(book);
    }

    @Override
    public void deleteBook(String email, Long bookId) {
        Book book = bookRepo.findById(bookId)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        if (!book.getUser().getEmail().equals(email)) {
            throw new RuntimeException("Unauthorized to delete this book");
        }

        bookRepo.delete(book);
    }

    @Override
    public List<Book> getBooks(String email) {
        return bookRepo.findByUserEmail(email);
    }
}
