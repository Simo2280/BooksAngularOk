import { createAction, props } from "@ngrx/store";
import {Book} from "../../models/book.model";

export const booksLoaded = createAction(
  '[Books API] Books loaded success',
  props<{ books: Book[] }>()
);

export const booksLoadedFail = createAction(
  '[Books API] Books loading fail',
  props<{ errormessage: string }>()
);

export const activeBookLoaded = createAction(
  '[Books API] Active book loaded success',
  props<{ activeBook: Book }>()
);

export const activeBooksLoadedFail = createAction(
  '[Books API] Active Book loading fail',
  props<{ errormessage: string }>()
);

export const bookCreated = createAction(
  '[Books API] Book creation success'
);

export const bookCreatedFail = createAction(
  '[Books API] Book creation fail',
  props<{ errormessage: string }>()
);

export const bookUpdated = createAction(
  '[Books API] Book update success'
);

export const bookUpdatedFail = createAction(
  '[Books API] Book update fail',
  props<{ errormessage: string }>()
);

export const bookDeleted = createAction(
  '[Books API] Deleted a book'
);

export const bookDeletedFail = createAction(
  '[Books API] Deleted book fail',
  props<{ errormessage: string }>()
);

