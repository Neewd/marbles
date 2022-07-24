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
  on(ModalActions.openModal, (state) => ({
    ...state,
    open: true,
  })),
  on(ModalActions.closeModal, (state) => ({
    ...state,
    open: false,
  }))
);

export function modalReducer(state: ModalState | undefined, action: Action) {
  return reducer(state, action);
}
