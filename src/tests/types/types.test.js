import { TYPES } from '../../types/types';

describe('Pruebas en types.js', () => {
   test('Deben ser iguales', () => {
      expect(TYPES).toEqual({
         /* UI */
         OPEN_MODAL: 'OPEN_MODAL',
         CLOSE_MODAL: 'CLOSE_MODAL',

         /* Calendar */
         SET_ACTIVE_EVENT: 'SET_ACTIVE_EVENT',
         EVENT_LOGOUT: 'EVENT_LOGOUT',

         START_ADD_NEW: 'START_ADD_NEW',
         ADD_NEW_EVENT: 'ADD_NEW_EVENT',
         CLEAR_ACTIVE_EVENT: 'CLEAR_ACTIVE_EVENT',
         UPDATE_EVENT: 'UPDATE_EVENT',
         DELETE_EVENT: 'DELETE_EVENT',
         EVENT_LOADED: 'EVENT_LOADED',

         /* Auth */
         AUTH_CHECKING_FINISH: 'AUTH_CHECKING_FINISH',
         START_LOGIN: 'START_LOGIN',
         AUTH_START: 'AUTH_START',
         START_REGISTER: 'START_REGISTER',
         START_TOKEN_RENEW: 'START_TOKEN_RENEW',
         LOGOUT: 'LOGOUT',
      });
   });
});
