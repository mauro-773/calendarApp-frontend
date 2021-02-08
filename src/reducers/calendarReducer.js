import { TYPES } from '../types/types';

/*
      {
         id: '123',
         title: 'Tarea',
         notes: '',
         start: moment().toDate(),
         end: moment().add(2, 'hours').toDate(),
         bgcolor: '#fafafa',
         user: {
            _id: '123',
            name: 'Fernando',
         },
      },
*/
const initialState = {
   events: [],
   activeEvent: null,
};

export const calendarReducer = (state = initialState, action) => {
   switch (action.type) {
      case TYPES.SET_ACTIVE_EVENT:
         return {
            ...state,
            activeEvent: action.payload,
         };

      case TYPES.ADD_NEW_EVENT:
         return {
            ...state,
            events: [...state.events, action.payload],
         };

      case TYPES.CLEAR_ACTIVE_EVENT:
         return {
            ...state,
            activeEvent: null,
         };

      case TYPES.UPDATE_EVENT:
         return {
            ...state,
            events: state.events.map((event) =>
               event.id === action.payload.id ? action.payload : event
            ),
         };

      case TYPES.DELETE_EVENT:
         return {
            ...state,
            events: state.events.filter(
               (event) => event.id !== state.activeEvent.id
            ),
            activeEvent: null,
         };

      case TYPES.EVENT_LOADED:
         return {
            ...state,
            events: [...action.payload],
         };

      case TYPES.EVENT_LOGOUT:
         return {
            ...initialState,
         };

      default:
         return state;
   }
};
