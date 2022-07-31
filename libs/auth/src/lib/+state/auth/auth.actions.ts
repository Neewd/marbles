import { createAction, props } from '@ngrx/store';
import { AuthEntity } from './auth.models';
import { LoginOption } from './login-option.models';

export const login = createAction(
  '[Auth Page] Login init',
  props<{ selectedLoginOption: LoginOption }>()
);

export const loginFailed = createAction('[Auth Page] Login failed');

export const maiarAppLoginSuccess = createAction(
  '[Auth/API] Maiar App Login success',
  props<{ svgQrCode: string }>()
);

export const maiarAppLoginFailure = createAction(
  '[Auth/API] Maiar App Login failure',
  props<{ error: string }>()
);

export const loginSuccess = createAction(
  '[Auth/API] Login success',
  props<{ authEntity: AuthEntity }>()
);

export const logout = createAction('[Auth/API] Logout');

export const loginFailure = createAction('[Auth/API] Load Auth Failure');
