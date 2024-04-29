import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {catchError, concatMap, map, of, switchMap} from "rxjs";
import { BookService } from "../../services/book-service";
import * as BooksActions from "../actions/books.actions";
import * as BooksApiActions from "../actions/books-api.actions";

@Injectable()
export class BooksEffects {

  constructor(private actions$: Actions,
              private bookService: BookService) {}

  loadBooks$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.loadBooks),
      switchMap(() => {
        return this.bookService
          .getBooks()
          .pipe(map((books) => BooksApiActions.booksLoaded({ books })));
      }),
      catchError((_err) => of(BooksApiActions.booksLoadedFail({ errormessage: _err.message })))
    )
  });

  loadActiveBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.loadActiveBook),
      switchMap((action) => {
        return this.bookService
          .getBook(action.ISBN)
          .pipe(map((book) => BooksApiActions.activeBookLoaded({ activeBook: book })));
      }),
      catchError((_err) => of(BooksApiActions.activeBooksLoadedFail({ errormessage: _err.message })))
    )
  });

  createBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.createBook),
      switchMap((action) => {
        return this.bookService.createBook(action.newBook).pipe(
          concatMap(() => [
            BooksApiActions.bookCreated(),
            BooksActions.loadBooks()
          ]),
          catchError((error) => {
            return of(BooksApiActions.bookCreatedFail({ errormessage: error.message }));
          })
        );
      })
    );
  });

  deleteBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.deleteBook),
      switchMap((action) => {
        return this.bookService
          .deleteBook(action.isbn)
          .pipe(
            concatMap(() => [
            BooksApiActions.bookDeleted(),
            BooksActions.loadBooks()
          ]),
            catchError((_err) => of(BooksApiActions.bookDeletedFail({ errormessage: _err.message }))));
      })
    )
  });

  updateBook$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(BooksActions.updateBook),
      switchMap((action) => {
        return this.bookService
          .updateBook(action.editBook)
          .pipe(
            concatMap(() => [
              BooksApiActions.bookUpdated(),
              BooksActions.loadBooks()
            ]),
            catchError((_err) => of(BooksApiActions.bookUpdatedFail({ errormessage: _err.message }))));
      })
    )
  });

}
