import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  catchError,
  filter,
  from,
  map,
  mergeMap,
  of,
  tap,
  withLatestFrom,
} from 'rxjs';
import { AuthService } from '../../services/auth.service';
import {
  MaiarAppLoginService,
  MaiarWebWalletLoginService,
} from '../../services';

import * as AuthActions from './auth.actions';
import { AuthState } from './auth.reducer';
import { getAuthEntity, getSelectedLoginOption } from './auth.selectors';
import { AccountInfo, LoginInfo } from '../../services/login.service';

@Injectable()
export class AuthEffects {
  constructor(
    private authStore: Store<AuthState>,
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private maiarAppLoginService: MaiarAppLoginService,
    private maiarWebWalletLoginService: MaiarWebWalletLoginService
  ) {}

  appInitialization = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadLocalStorageData),
      mergeMap(() => {
        const promises = [
          this.authService.getLoginData(),
          this.authService.getAccountData()
        ]
        return from(Promise.all(promises)).pipe(
          map((results) => {
            let loginData: LoginInfo | null = null;
            let accountData: AccountInfo | null = null;
            results.forEach((result) => {
              if (result) {
                if ('loginOption' in result) {
                  loginData = result;
                }
                if ('address' in result) {
                  accountData = result;
                }
              }
            });
            return AuthActions.loadLocalStorageDataSuccess({ loginData: loginData, accountData: accountData })
          })
        );
      })
    )
  );

  loginMaiarApp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      withLatestFrom(this.authStore.select(getSelectedLoginOption)),
      filter(
        ([_, selectedLoginOption]) => selectedLoginOption?.id === 'maiarApp'
      ),
      mergeMap(() => {
        return from(this.maiarAppLoginService.login()).pipe(
          map((response) =>
            AuthActions.maiarAppLoginSuccess({ svgQrCode: response })
          ),
          catchError((error) => of(AuthActions.maiarAppLoginFailure({ error })))
        );
      })
    )
  );

  loginElrondWebWallet$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        withLatestFrom(this.authStore.select(getSelectedLoginOption)),
        filter(
          ([_, selectedLoginOption]) =>
            selectedLoginOption?.id === 'maiarWebWallet'
        ),
        tap(() => {
          this.maiarWebWalletLoginService.login();
        })
      ),
    { dispatch: false }
  );

  logoutMaiarApp$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        withLatestFrom(this.authStore.select(getSelectedLoginOption)),
        filter(
          ([_, selectedLoginOption]) => selectedLoginOption?.id === 'maiarApp'
        ),
        tap(() => {
          this.maiarAppLoginService.logout();
        })
      ),
    { dispatch: false }
  );

  logoutMaiarWebWallet$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        withLatestFrom(this.authStore.select(getSelectedLoginOption)),
        filter(
          ([_, selectedLoginOption]) =>
            selectedLoginOption?.id === 'maiarWebWallet'
        ),
        tap(() => {
          this.maiarWebWalletLoginService.logout();
        })
      ),
    { dispatch: false }
  );

  persistLoginMethod$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.login),
        withLatestFrom(this.authStore.select(getSelectedLoginOption)),
        tap(([_, loginOption]) => {
          if (loginOption) {
            this.authService.persistLoginData(loginOption);
          }
        })
      ),
    { dispatch: false }
  );

  unpersistLocalStorageData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout, AuthActions.loginFailed),
        tap(() => {
          this.authService.unpersistLoginData();
          this.authService.unpersistAccountData();
        })
      ),
    { dispatch: false }
  );

  persistAccountData$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        withLatestFrom(this.authStore.select(getAuthEntity)),
        tap(([_, authEntity]) => {
          if (authEntity) {
            this.authService.persistAccountData(authEntity.address);
          }
        })
      ),
    { dispatch: false }
  );
}
