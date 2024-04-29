import { createAction, props } from "@ngrx/store";
import {Book} from "../../models/book.model";

export const loadBooks = createAction(
  '[App Component] Loading books'
);

export const loadBooksFail = createAction(
  '[App Component] Loading books fail',
  props<{ errormessage: string }>()
);

export const loadActiveBook = createAction(
  '[App Component] Loading the active book',
  props<{ ISBN: string }>()
);

export const loadActiveBookFail = createAction(
  '[App Component] Loading active book fail',
  props<{ errormessage: string }>()
);

export const createBook = createAction(
  '[App Component] Create a book',
  props<{ newBook: Book }>()
);

export const createBookFail = createAction(
  '[App Component] Create book fail',
  props<{ errormessage: string }>()
);

export const updateBook = createAction(
  '[App Component] Update a book',
  props<{ editBook: Book }>()
);

export const updateFail = createAction(
  '[App Component] Update book fail',
  props<{ errormessage: string }>()
);

export const deleteBook = createAction(
  '[App Component] Delete a book',
  props<{ isbn: string }>()
);

export const deleteBookFail = createAction(
  '[App Component] Delete book fail',
  props<{ errormessage: string }>()
);


