import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromBooks from '../reducers/books.reducers'

export const selectBooksState =
  createFeatureSelector<fromBooks.BooksState>('books');

export const selectAllBooks =
  createSelector(
    selectBooksState,
    fromBooks.selectAll
  )

export const selectActiveBook =
  createSelector(
    selectBooksState,
    fromBooks.selectActiveBook
  )
