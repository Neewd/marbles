import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as ModalActions from './modal.actions';
import { ModalEntity } from './modal.models';

export const MODAL_FEATURE_KEY = 'modal';

export interface ModalState extends EntityState<ModalEntity> {
  selectedId?: string | number; // which Modal record has been selected
  loaded: boolean; // has the Modal list been loaded
  error?: string | null; // last known error (if any)
}

export interface ModalPartialState {
  readonly [MODAL_FEATURE_KEY]: ModalState;
}

export const modalAdapter: EntityAdapter<ModalEntity> =
  createEntityAdapter<ModalEntity>();

export const initialModalState: ModalState = modalAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

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
