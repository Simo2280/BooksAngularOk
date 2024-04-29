import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Book} from "../models/book.model";
import {HttpClient} from "@angular/common/http";


@Injectable({ providedIn: 'root' })
export class BookService {
  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>('http://localhost:4000/books');
  }

  getBook(ISBN: string): Observable<Book> {
    return this.http
      .get<Book>('http://localhost:4000/book?ISBN='+ ISBN);
  }

  createBook(book: Book) {
    return this.http
      .post('http://localhost:4000/book', book);
  }

  updateBook(book: Book) {
    return this.http
      .put('http://localhost:4000/book', book);
  }

  deleteBook(ISBN: string) {
    return this.http
      .delete('http://localhost:4000/book?ISBN='+ ISBN);
  }

}
