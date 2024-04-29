import {createReducer, on} from "@ngrx/store";
import * as BooksApiActions from '../actions/books-api.actions'
import {Book} from "../../models/book.model";

export interface BooksState {
  collection: Book[],
  activeBook: Book | null;
  error: string,
}

export const initialState: BooksState = {
  collection: [],
  activeBook: null,
  error: '',
}

export const bookReducer = createReducer(
  initialState,
  on(BooksApiActions.booksLoaded, (state, action) => {
    return{
      ...state,
      error: '',
      collection: action.books,
    };
  }),
  on(BooksApiActions.activeBookLoaded, (state, action) => {
    return{
      ...state,
      error: '',
      activeBook: action.activeBook,
    };
  }),
  on( BooksApiActions.booksLoadedFail, BooksApiActions.activeBooksLoadedFail, BooksApiActions.bookCreatedFail, BooksApiActions.bookDeletedFail,
    (state, action) => {
    return{
      ...state,
      error: action.errormessage,
    };
  })
);

export const selectAll = (state: BooksState) => state.collection;
export const selectActiveBook = (state: BooksState) => state.activeBook;

