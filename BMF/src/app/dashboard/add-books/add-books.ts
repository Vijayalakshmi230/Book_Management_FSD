import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../book';

@Component({
  selector: 'app-add-books',
  standalone: false,
  templateUrl: './add-books.html',
  styleUrl: './add-books.css'
})
export class AddBooks {
  title: string = '';
  author: string = '';

  constructor(private bookService: BookService, private router: Router) {}

  addBook() {
    this.bookService.addBook({ title: this.title, author: this.author }).subscribe(() => {
      alert('Book added successfully');
      this.router.navigate(['/dashboard/view-books']);
    });
  }
}
