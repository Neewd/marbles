import { createAction, props } from '@ngrx/store';

export const openModal = createAction(
  '[Modal] Open',
  props<{ closable: boolean }>
);
export const closeModal = createAction('[Modal] Close');
