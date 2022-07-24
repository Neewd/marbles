import { createAction } from '@ngrx/store';

export const openModal = createAction('[Modal] Open', {
  props<{ closable: boolean; template: TemplateRef<HTMLElement>}>
});
export const closeModal = createAction('[Modal] Close');
