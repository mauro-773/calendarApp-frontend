import { uiReducer } from '../../reducers/uiReducer';
import '@testing-library/jest-dom';
import { closeModalAction, openModalAction } from '../../actions/uiActions';

const initialState = {
   modalOpen: false,
};

describe('Test en iuReducer.js', () => {
   test('Debe retornar el estado por defecto', () => {
      const state = uiReducer(initialState, {});
      expect(state).toEqual(initialState);
   });

   test('Debe abrir y cerrar el modal', () => {
      const openModal = openModalAction();
      const closeModal = closeModalAction();

      const state = uiReducer(initialState, openModal);
      expect(state).toEqual({ modalOpen: true });

      const stateClose = uiReducer(state, closeModal);
      expect(stateClose).toEqual({ modalOpen: false });
   });
});
