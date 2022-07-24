import { Action } from '@ngrx/store';

import * as ModalActions from './modal.actions';
import { ModalEntity } from './modal.models';
import { ModalState, initialModalState, modalReducer } from './modal.reducer';

describe('Modal Reducer', () => {
  const createModalEntity = (id: string, name = ''): ModalEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Modal actions', () => {
    it('loadModalSuccess should return the list of known Modal', () => {
      const modal = [
        createModalEntity('PRODUCT-AAA'),
        createModalEntity('PRODUCT-zzz'),
      ];
      const action = ModalActions.loadModalSuccess({ modal });

      const result: ModalState = modalReducer(initialModalState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = modalReducer(initialModalState, action);

      expect(result).toBe(initialModalState);
    });
  });
});
