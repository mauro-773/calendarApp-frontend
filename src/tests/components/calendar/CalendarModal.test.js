import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom';
import CalendarModal from '../../../components/calendar/CalendarModal';
import moment from 'moment';
import {
   clearActiveAction,
   updateEventAction,
   addEventAction,
} from '../../../actions/calendarActions';
import { act } from '@testing-library/react';
import Swal from 'sweetalert2';

jest.mock('../../../actions/calendarActions', () => ({
   updateEventAction: jest.fn(),
   clearActiveAction: jest.fn(),
   addEventAction: jest.fn(),
}));

jest.mock('sweetalert2', () => ({
   fire: jest.fn(),
}));

// Configuración del store de redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

let now = moment().minutes(0).seconds(0).add(1, 'hours');
let final = now.clone().add(1, 'hours');

const initialState = {
   calendar: {
      events: [],
      activeEvent: {
         title: 'Titulo de test',
         notes: 'Notes de test',
         start: now.toDate(),
         end: final.toDate(),
      },
   },
   auth: {
      uid: '123',
   },
   ui: {
      modalOpen: true,
   },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();
const wrapper = mount(
   <Provider store={store}>
      <CalendarModal />
   </Provider>
);

describe('Test en <CalendarModal />', () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   test('Debe mostrar el modal', () => {
      //expect(wrapper.find('.modal').exists()).toBe(true);
      expect(wrapper.find('Modal').prop('isOpen')).toBe(true);
   });

   test('Debe llamar abrir y cerrar modal', () => {
      wrapper.find('form').simulate('submit', {
         preventDefault() {},
      });
      expect(updateEventAction).toHaveBeenCalledWith(
         initialState.calendar.activeEvent
      );
      expect(clearActiveAction).toHaveBeenCalled();
   });

   test('Debe mostrar un error si falta el titulo', () => {
      wrapper.find('form').simulate('submit', {
         preventDefault() {},
      });
      expect(wrapper.find('input[name="title"]').hasClass('is-invalid')).toBe(
         true
      );
   });

   test('Debe crear un nuevo evento', () => {
      const initialState = {
         calendar: {
            events: [],
            activeEvent: null,
         },
         auth: {
            uid: '123',
         },
         ui: {
            modalOpen: true,
         },
      };
      const store = mockStore(initialState);
      store.dispatch = jest.fn();
      const wrapper = mount(
         <Provider store={store}>
            <CalendarModal />
         </Provider>
      );
      wrapper.find('input[name="title"]').simulate('change', {
         target: {
            name: 'title',
            value: 'Hola pruebas',
         },
      });

      wrapper.find('form').simulate('submit', {
         preventDefault() {},
      });

      expect(addEventAction).toHaveBeenCalledWith({
         end: expect.anything(),
         start: expect.anything(),
         title: 'Hola pruebas',
         notes: '',
      });

      expect(clearActiveAction).toHaveBeenCalled();
   });

   test('Debe validar las fechas', () => {
      wrapper.find('input[name="title"]').simulate('change', {
         target: {
            name: 'title',
            value: 'Hola pruebas',
         },
      });

      const hoy = new Date();
      act(() => {
         wrapper.find('DateTimePicker').at(1).prop('onChange')(hoy);
      });

      wrapper.find('form').simulate('submit', {
         preventDefault() {},
      });

      expect(Swal.fire).toHaveBeenCalledWith(
         'Error',
         'La fecha final debe ser mayor a la fecha inicial',
         'error'
      );
   });
});
