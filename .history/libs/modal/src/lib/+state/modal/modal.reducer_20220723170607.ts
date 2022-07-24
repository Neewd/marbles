import { Action, createReducer, on } from '@ngrx/store';

import * as ModalActions from './modal.actions';

export const MODAL_FEATURE_KEY = 'modal';

export interface ModalState {
  open: boolean; // has the Modal open or not
}

export interface ModalPartialState {
  readonly [MODAL_FEATURE_KEY]: ModalState;
}

export const initialModalState: ModalState = {
  open: false,
};

const reducer = createReducer(
  initialModalState,
  on(ModalActions.initModal, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(ModalActions.loadModalSuccess, (state, { modal }) =>
    modalAdapter.setAll(modal, { ...state, loaded: true })
  ),
  on(ModalActions.loadModalFailure, (state, { error }) => ({ ...state, error }))
);

export function modalReducer(state: ModalState | undefined, action: Action) {
  return reducer(state, action);
}
