import { authReducer } from '../../reducers/authReducer';
import '@testing-library/jest-dom';
import { TYPES } from '../../types/types';

const initialState = {
   checking: true,
};

describe('Test en authReducer.js', () => {
   test('Debe retornar el estado por defecto', () => {
      const state = authReducer(initialState, {});
      expect(state).toEqual({ checking: true });
   });

   test('Debe retornar el estado esperado segun la accion enviada', () => {
      let loginAction = {
         type: TYPES.START_LOGIN,
         payload: {
            uid: 'ABC123',
            name: 'test',
         },
      };

      const state = authReducer(initialState, loginAction);
      expect(state).toEqual({
         checking: false,
         uid: 'ABC123',
         name: 'test',
      });
   });

   test('Debe retornar el estado esperado segun la accion logout', () => {
      let logoutAction = {
         type: TYPES.LOGOUT,
      };

      const state = authReducer(initialState, logoutAction);
      expect(state).toEqual({
         checking: false,
      });
   });
});
