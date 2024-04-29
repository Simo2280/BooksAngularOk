import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideStore} from "@ngrx/store";
import {bookReducer} from "./store/reducers/books.reducers";
import {provideEffects} from "@ngrx/effects";
import {BooksEffects} from "./store/effects/books.effects"
import {provideStoreDevtools} from '@ngrx/store-devtools';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), provideStore({ books: bookReducer }), provideEffects(BooksEffects), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimationsAsync()],
};
