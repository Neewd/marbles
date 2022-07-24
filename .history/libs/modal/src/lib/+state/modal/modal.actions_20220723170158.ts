import { createAction, props } from '@ngrx/store';
import { ModalEntity } from './modal.models';

export const initModal = createAction('[Modal Page] Init');

export const loadModalSuccess = createAction(
  '[Modal/API] Load Modal Success',
  props<{ modal: ModalEntity[] }>()
);

export const loadModalFailure = createAction(
  '[Modal/API] Load Modal Failure',
  props<{ error: any }>()
);
