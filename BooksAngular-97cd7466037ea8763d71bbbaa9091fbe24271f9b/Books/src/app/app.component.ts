import {Component, OnInit} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Book} from "./models/book.model";
import {Store} from "@ngrx/store";
import * as BooksActions from './store/actions/books.actions'
import {Observable} from "rxjs";
import { selectAllBooks } from './store/selectors/books.selectors';
import {AsyncPipe, CommonModule, NgOptimizedImage} from "@angular/common";
import {selectActiveBook} from "./store/selectors/books.selectors";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatCard, MatCardContent, MatCardHeader} from "@angular/material/card";
import {MatIcon} from "@angular/material/icon";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatToolbar} from "@angular/material/toolbar";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AsyncPipe, CommonModule, ReactiveFormsModule, FormsModule, MatButton, MatTable, MatColumnDef, MatHeaderCell, MatCell, MatHeaderCellDef, MatCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatCard, MatCardHeader, MatIcon, MatIconButton, MatCardContent, MatFormField, MatInput, MatToolbar, NgOptimizedImage, MatProgressSpinner],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  books$: Observable<Book[]>
  activeBook$: Observable<Book | null>
  bookForm = new FormGroup({
    ISBN: new FormControl(''),
    title: new FormControl(''),
    author: new FormControl(''),
    genre: new FormControl(''),
    publishedYear: new FormControl(2000)
  });
  columnTable: any[] = ['isbn', 'title', 'author', 'edit', 'delete'];
  flagActiveBook: boolean = false;
  flagCreate: boolean = false;
  flagUpdate: boolean = false;
  loadCover: boolean = false;

  constructor(private store: Store) {
    this.books$ = store.select(selectAllBooks);
    this.activeBook$ = store.select(selectActiveBook);
  }

  ngOnInit() {
    this.store.dispatch(BooksActions.loadBooks());
  }

  onFlagCreate() {
    this.flagCreate = !this.flagCreate;
  }

  onFlagActive() {
    this.flagActiveBook = false;
  }

  onFlagUpdateTrue(book: Book) {
    this.bookForm.patchValue({
      ISBN: book.ISBN, title: book.title, author: book.author, genre: book.genre, publishedYear: book.publishedYear
    })
    this.flagUpdate = true;
  }

  onFlagUpdateFalse() {
    this.flagUpdate = false;
  }

  getBookCoverUrl(isbn: string): string {
    console.log("url")
    return `https://covers.openlibrary.org/b/ISBN/${isbn}-M.jpg`;
  }

  onImageLoad() {
    console.log("loaded")
    this.loadCover = false;
  }

  onFormBook () {
    const book: Book = { ISBN: '', title: '', author: '', genre: '', publishedYear: 2000 }

    const formValues = this.bookForm.value;
    book.ISBN = formValues.ISBN ?? '';
    book.title = formValues.title ?? '';
    book.author = formValues.author ?? '';
    book.genre = formValues.genre ?? '';
    book.publishedYear = formValues.publishedYear ?? 2000;

    return book;
  }

  onGetBook(isbnActive: string) {
    this.store.dispatch(BooksActions.loadActiveBook({ ISBN: isbnActive }));
    this.loadCover = true;
    this.flagActiveBook = true;
  }

  onCreateBook() {
    const newBook: Book = this.onFormBook();

    this.store.dispatch(BooksActions.createBook({ newBook: newBook }));

    this.bookForm.patchValue({
      ISBN: '', title: '', author: '', genre: '', publishedYear: 2000
    })
  }

  onUpdateBook() {
    const editBook: Book = this.onFormBook();

    this.store.dispatch(BooksActions.updateBook({ editBook: editBook }));

    this.bookForm.patchValue({
      ISBN: '', title: '', author: '', genre: '', publishedYear: 2000
    })
    this.onFlagUpdateFalse();
  }


  onDeleteBook(isbn: string) {
    this.store.dispatch(BooksActions.deleteBook({ isbn: isbn }));
  }

}
