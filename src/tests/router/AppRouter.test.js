import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom';
import AppRouter from '../../router/AppRouter';

// Configuración del store de redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
//store.dispatch = jest.fn();

describe('Pruebas en <AppRouter />', () => {
   test('Debe mostrar : <div>Cargando...</div>', () => {
      const initialState = {
         auth: {
            checking: true,
         },
      };
      const store = mockStore(initialState);

      const wrapper = mount(
         <Provider store={store}>
            <AppRouter />
         </Provider>
      );

      expect(wrapper).toMatchSnapshot();
   });

   test('Debe mostrar : <PublicRoute />', () => {
      const initialState = {
         auth: {
            checking: false,
            uid: null,
         },
      };
      const store = mockStore(initialState);

      const wrapper = mount(
         <Provider store={store}>
            <AppRouter />
         </Provider>
      );

      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('.login-container').exists()).toBe(true);
   });

   test('Debe mostrar : <PrivateRoute />', () => {
      const initialState = {
         ui: {
            modalOpen: false,
         },
         calendar: {
            events: [],
         },
         auth: {
            checking: false,
            uid: '123',
            name: 'Ernesto',
         },
      };
      const store = mockStore(initialState);

      const wrapper = mount(
         <Provider store={store}>
            <AppRouter />
         </Provider>
      );

      expect(wrapper).toMatchSnapshot();
      expect(wrapper.find('.calendar-screen').exists()).toBe(true);
   });
});
