import {Book} from "../models/book.model";

export interface BooksState {
  collection: Book[],
  activeBookId: string | null;
}

export const initialState: BooksState = {
  collection: [],
  activeBookId: null,
}

