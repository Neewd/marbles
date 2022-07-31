import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as ModalActions from '@marbles/modal';
import { AuthEntity } from './auth.models';
import { LoginOption } from './login-option.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  authEntity: AuthEntity | null; // Represent the info of the logged in user
  selectedLoginOption?: LoginOption | null; // which Auth record has been selected
  svgQrCode?: string | null; // the SVG QR Code
  loaded: boolean; // has the Auth list been loaded
  error?: string | null; // last known error (if any)
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialAuthState: AuthState = {
  authEntity: null,
  selectedLoginOption: null,
  svgQrCode: null,
  loaded: false,
};

const reducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, { selectedLoginOption }) => ({
    ...state,
    selectedLoginOption,
    loaded: false,
    error: null,
  })),
  on(AuthActions.maiarAppLoginSuccess, (state, { svgQrCode }) => ({
    ...state,
    svgQrCode,
    loaded: false,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { authEntity }) => ({
    ...state,
    authEntity,
    loaded: false,
    error: null,
  })),
  on(AuthActions.logout, (state) => ({
    ...state,
    authEntity: null,
    loaded: false,
    error: null,
  })),
  on(ModalActions.openModal, (state) => {
    return {
      ...state,
      authEntity: null,
      selectedLoginOption: null,
      svgQrCode: null,
      loaded: false,
      error: null,
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
