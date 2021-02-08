import DeleteEventFab from '../../../components/ui/DeleteEventFab';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { deleteEventAction } from '../../../actions/calendarActions';

import '@testing-library/jest-dom';

jest.mock('../../../actions/calendarActions', () => ({
   deleteEventAction: jest.fn(),
}));

// Configuración del store de redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
const store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
   <Provider store={store}>
      <DeleteEventFab />
   </Provider>
);

describe('Test en <DeleteEventFab />', () => {
   test('Debe hacer el match con el snapshot', () => {
      expect(wrapper).toMatchSnapshot();
   });

   test('Debe llamar a deleteEventAction al hacer click', () => {
      wrapper.find('button').prop('onClick')();
      expect(deleteEventAction).toHaveBeenCalled();
   });
});
