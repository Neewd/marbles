import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState, AUTH_FEATURE_KEY } from './auth.reducer';

// Lookup the 'Auth' feature state managed by NgRx
export const getAuthState = createFeatureSelector<AuthState>(AUTH_FEATURE_KEY);

export const getAuthLoaded = createSelector(
  getAuthState,
  (state: AuthState) => state.loaded
);

export const getAuthError = createSelector(
  getAuthState,
  (state: AuthState) => state.error
);

export const getSelectedLoginOption = createSelector(
  getAuthState,
  (state: AuthState) => state.selectedLoginOption
);

export const getSVGQrCode = createSelector(
  getAuthState,
  (state: AuthState) => state.svgQrCode
);

export const getIsAuthenticated = createSelector(
  getAuthState,
  (state: AuthState) => state.authEntity !== null
);

export const getAuthEntity = createSelector(
  getAuthState,
  (state: AuthState) => state.authEntity
);
