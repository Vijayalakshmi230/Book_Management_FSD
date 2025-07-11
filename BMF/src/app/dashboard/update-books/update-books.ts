import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../book';

@Component({
  selector: 'app-update-books',
  standalone: false,
  templateUrl: './update-books.html',
  styleUrl: './update-books.css'
})
export class UpdateBooks  implements OnInit {
  id!: number;
  title: string = '';
  author: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit() {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadBook();
  }

  loadBook() {
    this.bookService.getBooks().subscribe(data => {
      const book = data.find((b: any) => b.id === this.id);
      if (book) {
        this.title = book.title;
        this.author = book.author;
      }
    });
  }

  updateBook() {
    this.bookService.updateBook(this.id, { title: this.title, author: this.author }).subscribe(() => {
      alert('Book updated successfully');
      this.router.navigate(['/dashboard/view-books']);
    });
  }
}