import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  filter,
  tap,
  withLatestFrom,
  exhaustMap,
  of,
  from,
  map,
  catchError,
  mergeMap,
} from 'rxjs';
import { MaiarAppLoginService } from '../../services/maiar-app.login.service';

import * as AuthActions from './auth.actions';
import { AuthState } from './auth.reducer';
import { getSelectedLoginOption } from './auth.selectors';

@Injectable()
export class AuthEffects {
  constructor(
    private authStore: Store<AuthState>,
    private readonly actions$: Actions,
    private maiarLoginService: MaiarAppLoginService
  ) {}

  loginMaiarApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      withLatestFrom(this.authStore.select(getSelectedLoginOption)),
      filter(
        ([_, selectedLoginOption]) => selectedLoginOption?.id === 'maiarApp'
      ),
      mergeMap(([_, __]) => {
        return from(this.maiarLoginService.login()).pipe(
          map((response) =>
            AuthActions.maiarAppLoginSuccess({ svgQrCode: response })
          ),
          catchError((error) => of(AuthActions.maiarAppLoginFailure({ error })))
        );
      })
    )
  );
}

/*

exhaustMap(([action, selectedLoginOption]) => {
        return of(this.maiarLoginService.login()).pipe(
          map((response) => AuthActions.loginSuccess),
          catchError((error) => of(AuthActions.loginFailure))
        );
      })
      */
