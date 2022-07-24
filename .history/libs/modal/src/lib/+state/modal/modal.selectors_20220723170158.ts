import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MODAL_FEATURE_KEY, ModalState, modalAdapter } from './modal.reducer';

// Lookup the 'Modal' feature state managed by NgRx
export const getModalState =
  createFeatureSelector<ModalState>(MODAL_FEATURE_KEY);

const { selectAll, selectEntities } = modalAdapter.getSelectors();

export const getModalLoaded = createSelector(
  getModalState,
  (state: ModalState) => state.loaded
);

export const getModalError = createSelector(
  getModalState,
  (state: ModalState) => state.error
);

export const getAllModal = createSelector(getModalState, (state: ModalState) =>
  selectAll(state)
);

export const getModalEntities = createSelector(
  getModalState,
  (state: ModalState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getModalState,
  (state: ModalState) => state.selectedId
);

export const getSelected = createSelector(
  getModalEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined)
);
