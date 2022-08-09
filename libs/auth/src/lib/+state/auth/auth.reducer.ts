import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from './auth.actions';
import * as ModalActions from '@marbles/modal';
import { AuthEntity } from './auth.models';
import { LoginOption } from './login-option.models';

export const AUTH_FEATURE_KEY = 'auth';

export interface AuthState {
  appInitialized: boolean; // Whether the data for the app to be initialized has been retrieved
  authEntity: AuthEntity | null; // Represent the info of the logged in user
  error?: string | null; // last known error (if any)
  ledgerAddresses?: string[] | null
  loaded: boolean; // has the Auth list been loaded
  loginOptions?: LoginOption[];
  loginStarted: boolean | null; // Has the login started
  selectedLoginOption?: LoginOption | null; // which Auth record has been selected
  svgQrCode?: string | null; // the SVG QR Code
}

export interface AuthPartialState {
  readonly [AUTH_FEATURE_KEY]: AuthState;
}

export const initialAuthState: AuthState = {
  appInitialized: false,
  authEntity: null,
  ledgerAddresses: null,
  loaded: false,
  loginOptions: [
    {
      id: 'maiarDefiWallet',
      title: 'Maiar DeFi Wallet',
    },
    {
      id: 'maiarApp',
      title: 'Maiar App',
    },
    {
      id: 'ledger',
      title: 'Ledger',
    },
    {
      id: 'maiarWebWallet',
      title: 'Elrond Web Wallet',
    },
  ],
  loginStarted: false,
  selectedLoginOption: null,
  svgQrCode: null,
};

const reducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (state, { selectedLoginOption }) => ({
    ...state,
    selectedLoginOption,
    loginStarted: true,
    loaded: false,
    error: null,
  })),
  on(AuthActions.maiarAppLoginSuccess, (state, { svgQrCode }) => ({
    ...state,
    svgQrCode,
    loginStarted: false,
    loaded: false,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { authEntity }) => ({
    ...state,
    authEntity,
    loginStarted: false,
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
  }),
  on(AuthActions.loadLocalStorageDataSuccess, (state, { loginData, accountData }) => {
    const loginStarted = loginData?.expires ? true : false;
    let authEntity = null;
    let selectedLoginOption = null;
    if (accountData) {
      authEntity = {
        address: accountData.address
      }
    } 
    if (loginData) {
      selectedLoginOption = state.loginOptions?.find(loginOption => loginOption.id === loginData.loginOption);
    }

    return {
      ...state,
      appInitialized: true,
      authEntity: authEntity,
      loginStarted,
      selectedLoginOption
    };
  })
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return reducer(state, action);
}
