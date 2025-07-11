package com.example.demo.service;

import java.util.List;

import com.example.demo.dto.BookRequest;
import com.example.demo.entity.Book;

public interface BookService {
    Book addBook(String email, BookRequest request);
    Book updateBook(String email, Long bookId, BookRequest request);
    void deleteBook(String email, Long bookId);
    List<Book> getBooks(String email);
}
