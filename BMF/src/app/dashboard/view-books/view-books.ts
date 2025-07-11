import { Component, OnInit } from '@angular/core';
import { BookService } from '../../book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-books',
  standalone: false,
  templateUrl: './view-books.html',
  styleUrl: './view-books.css'
})
export class ViewBooks implements OnInit {
  books: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.getBooks();
  }

  getBooks() {
    this.bookService.getBooks().subscribe({
      next: data => {
        this.books = data;
      },
      error: err => {
        console.error('Failed to fetch books', err);
      }
    });
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id).subscribe(() => {
        this.getBooks(); // refresh list
      });
    }
  }
}
