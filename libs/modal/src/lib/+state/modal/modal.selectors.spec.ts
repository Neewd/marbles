import { ModalEntity } from './modal.models';
import {
  modalAdapter,
  ModalPartialState,
  initialModalState,
} from './modal.reducer';
import * as ModalSelectors from './modal.selectors';

describe('Modal Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getModalId = (it: ModalEntity) => it.id;
  const createModalEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as ModalEntity);

  let state: ModalPartialState;

  beforeEach(() => {
    state = {
      modal: modalAdapter.setAll(
        [
          createModalEntity('PRODUCT-AAA'),
          createModalEntity('PRODUCT-BBB'),
          createModalEntity('PRODUCT-CCC'),
        ],
        {
          ...initialModalState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Modal Selectors', () => {
    it('getAllModal() should return the list of Modal', () => {
      const results = ModalSelectors.getAllModal(state);
      const selId = getModalId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = ModalSelectors.getSelected(state) as ModalEntity;
      const selId = getModalId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getModalLoaded() should return the current "loaded" status', () => {
      const result = ModalSelectors.getModalLoaded(state);

      expect(result).toBe(true);
    });

    it('getModalError() should return the current "error" state', () => {
      const result = ModalSelectors.getModalError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
