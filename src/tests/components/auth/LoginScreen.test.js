import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom';
import LoginScreen from '../../../components/auth/LoginScreen';
import {
   startLoginAction,
   startRegisterAction,
} from '../../../actions/authActions';
import Swal from 'sweetalert2';

jest.mock('sweetalert2', () => ({
   fire: jest.fn(),
}));

jest.mock('../../../actions/authActions', () => ({
   startLoginAction: jest.fn(),
   startRegisterAction: jest.fn(),
}));

// Configuración del store de redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();
const wrapper = mount(
   <Provider store={store}>
      <LoginScreen />
   </Provider>
);

describe('Test en <LoginScreen />', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   test('Debe hacer el match con el snapshot', () => {
      expect(wrapper).toMatchSnapshot();
   });

   test('Debe llamar al dispatch del login', () => {
      wrapper.find('input[name="lEmail"]').simulate('change', {
         target: {
            name: 'lEmail',
            value: 'correo@correo.com',
         },
      });

      wrapper.find('input[name="lPassword"]').simulate('change', {
         target: {
            name: 'lPassword',
            value: '123456',
         },
      });

      wrapper.find('form').at(0).prop('onSubmit')({
         preventDefault() {},
      });

      expect(startLoginAction).toHaveBeenCalledWith(
         'correo@correo.com',
         '123456'
      );
   });

   test('Debe existir un error si las contraseñas no son iguales', () => {
      wrapper.find('input[name="rPassword"]').simulate('change', {
         target: {
            name: 'rPassword',
            value: '1234567',
         },
      });

      wrapper.find('input[name="rPassword2"]').simulate('change', {
         target: {
            name: 'rPassword2',
            value: '123456',
         },
      });

      wrapper.find('form').at(1).prop('onSubmit')({
         preventDefault() {},
      });

      expect(startRegisterAction).not.toHaveBeenCalled();
      expect(Swal.fire).toHaveBeenCalledWith(
         'Error',
         'Las contraseñas deben ser iguales',
         'error'
      );
   });

   test('Debe disparar la accion si las contraseñas son iguales', () => {
      wrapper.find('input[name="rPassword"]').simulate('change', {
         target: {
            name: 'rPassword',
            value: '1234567',
         },
      });

      wrapper.find('input[name="rPassword2"]').simulate('change', {
         target: {
            name: 'rPassword2',
            value: '1234567',
         },
      });

      wrapper.find('form').at(1).prop('onSubmit')({
         preventDefault() {},
      });

      expect(startRegisterAction).toHaveBeenCalled();
   });
});
