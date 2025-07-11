package com.example.demo.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.BookRequest;
import com.example.demo.entity.Book;
import com.example.demo.service.BookService;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:4200") // adjust as needed
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping
    public ResponseEntity<Book> addBook(@RequestBody BookRequest request, Principal principal) {
        Book savedBook = bookService.addBook(principal.getName(), request);
        return ResponseEntity.ok(savedBook);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable Long id, @RequestBody BookRequest request, Principal principal) {
        Book book = bookService.updateBook(principal.getName(), id, request);
        return ResponseEntity.ok(book);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBook(@PathVariable Long id, Principal principal) {
        bookService.deleteBook(principal.getName(), id);
        return ResponseEntity.ok("Book deleted successfully");
    }

    @GetMapping
    public ResponseEntity<List<Book>> getBooks(Principal principal) {
        List<Book> books = bookService.getBooks(principal.getName());
        return ResponseEntity.ok(books);
    }
}
