import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import '@testing-library/jest-dom';
import {
   startCheckingAction,
   startLoginAction,
   startRegisterAction,
} from '../../actions/authActions';
import { TYPES } from '../../types/types';
import Swal from 'sweetalert2';
import * as fetchModule from '../../helpers/fetch';

jest.mock('sweetalert2', () => ({
   fire: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);
Storage.prototype.setItem = jest.fn();

describe('Test en authActions.js', () => {
   beforeEach(() => {
      store = mockStore(initialState);
      jest.clearAllMocks();
   });

   test('Fn startLoginAction debe funcionar', async () => {
      await store.dispatch(startLoginAction('correo@correo.com', '123456'));
      const actions = store.getActions();

      // Esperamos que se ejecute la accion correcta
      expect(actions[0]).toEqual({
         type: TYPES.START_LOGIN,
         payload: {
            uid: expect.any(String),
            name: expect.any(String),
         },
      });

      // Esperamos que el localStorage se haya llamado
      expect(localStorage.setItem).toHaveBeenCalledWith(
         'token',
         expect.any(String)
      );
      expect(localStorage.setItem).toHaveBeenCalledWith(
         'token-init-date',
         expect.any(Number)
      );

      //let token = localStorage.setItem.mock.calls[0][1]
   });

   test('Fn startLoginAction incorrecto', async () => {
      await store.dispatch(startLoginAction('correo@correo.com', '123456789'));
      const actions = store.getActions();

      // Esperamos que las acciones no tenga ninguna accion
      expect(actions).toEqual([]);
      expect(Swal.fire).toHaveBeenCalledWith(
         'Error',
         'La contraseña es incorrecta',
         'error'
      );
   });

   test('Fn startRegisterAction debe funcionar', async () => {
      fetchModule.fetchWithoutToken = jest.fn(() => ({
         json() {
            return {
               ok: true,
               uid: '123',
               name: 'test',
               token: 'ABC',
            };
         },
      }));

      await store.dispatch(
         startRegisterAction('test', 'test123@test.com', '123456')
      );
      const actions = store.getActions();

      // Esperamos que se haya llamado
      expect(actions[0]).toEqual({
         type: TYPES.START_LOGIN,
         payload: {
            uid: '123',
            name: 'test',
         },
      });
      // Esperamos que el localStorage se haya llamado
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC');
      expect(localStorage.setItem).toHaveBeenCalledWith(
         'token-init-date',
         expect.any(Number)
      );
   });

   test('Fn startCheckingAction debe funcionar', async () => {
      fetchModule.fetchWithToken = jest.fn(() => ({
         json() {
            return {
               ok: true,
               uid: '123',
               name: 'test',
               token: 'ABC',
            };
         },
      }));

      await store.dispatch(startCheckingAction());
      const actions = store.getActions();

      // Esperamos que se haya llamado
      expect(actions[0]).toEqual({
         type: TYPES.START_LOGIN,
         payload: {
            uid: '123',
            name: 'test',
         },
      });
      expect(localStorage.setItem).toHaveBeenCalledWith('token', 'ABC');
      expect(localStorage.setItem).toHaveBeenCalledWith(
         'token-init-date',
         expect.any(Number)
      );
   });
});
