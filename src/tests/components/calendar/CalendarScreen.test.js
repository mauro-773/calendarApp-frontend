import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';

import '@testing-library/jest-dom';
import CalendarScreen from '../../../components/calendar/CalendarScreen';
import { messages } from '../../../helpers/calendar-messages-es';
import { TYPES } from '../../../types/types';
import {
   setActiveAction,
   loadEventsAction,
} from '../../../actions/calendarActions';
import { act } from '@testing-library/react';

jest.mock('../../../actions/calendarActions', () => ({
   setActiveAction: jest.fn(),
   loadEventsAction: jest.fn(),
}));
Storage.prototype.setItem = jest.fn();

// Configuración del store de redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initialState = {
   calendar: {
      events: [],
   },
   auth: {
      uid: '123',
   },
   ui: {
      modalOpen: false,
   },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();
const wrapper = mount(
   <Provider store={store}>
      <CalendarScreen />
   </Provider>
);

describe('Test en <CalendarScreen />', () => {
   test('Debe hacer el match con el snapshot', () => {
      expect(wrapper).toMatchSnapshot();
   });

   test('Debe interactuar con las acciones del calendario', () => {
      const calendar = wrapper.find('Calendar');
      const calendarMessages = calendar.prop('messages');
      expect(calendarMessages).toEqual(messages);

      calendar.prop('onDoubleClickEvent')();
      expect(store.dispatch).toHaveBeenCalledWith({
         type: TYPES.OPEN_MODAL,
         payload: true,
      });

      calendar.prop('onSelectEvent')({ start: 'Inicio' });
      expect(setActiveAction).toHaveBeenCalledWith({ start: 'Inicio' });

      act(() => {
         calendar.prop('onView')('week');
         expect(localStorage.setItem).toHaveBeenCalledWith('lastView', 'week');
      });
   });
});
