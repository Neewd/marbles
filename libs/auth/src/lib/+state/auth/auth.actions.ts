import { createAction, props } from '@ngrx/store';
import { AccountInfo, LoginInfo } from '../../services/login.service';
import { AuthEntity } from './auth.models';
import { LoginOption } from './login-option.models';

export const login = createAction(
  '[Auth Page] Login init',
  props<{ selectedLoginOption: LoginOption }>()
);

// Load the login data from the local storage
export const loadLocalStorageData = createAction(
  '[Auth Page] Load local storage data'
);

export const loadLocalStorageDataSuccess = createAction(
  '[Auth Page] Load local storage data success',
  props<{ loginData: LoginInfo | null, accountData: AccountInfo | null }>()
);

export const loginFailed = createAction('[Auth Page] Login failed');

// Maiar App Login
export const maiarAppLoginSuccess = createAction(
  '[Auth/API] Maiar App Login success',
  props<{ svgQrCode: string }>()
);

export const maiarAppLoginFailure = createAction(
  '[Auth/API] Maiar App Login failure',
  props<{ error: string }>()
);

// Maiar Ledger Login
export const maiarLedgerGetAddressesSuccess = createAction(
  '[Auth/API] Maiar Ledger Get addresses success',
  props<{ addresses: string[] | null }>()
);

export const maiarLedgerGetAddressesFailure = createAction(
  '[Auth/API] Maiar Ledger Get addresses failure',
  props<{ error: string }>()
);

export const maiarLedgerLogin = createAction(
  '[Auth/API] Maiar Ledger login',
  props<{ address: string }>()
);


export const loginSuccess = createAction(
  '[Auth/API] Login success',
  props<{ authEntity: AuthEntity }>()
);

export const logout = createAction('[Auth/API] Logout');

export const loginFailure = createAction('[Auth/API] Load Auth Failure');
