import Swal from 'sweetalert2';
import { fetchWithToken } from '../helpers/fetch';
import { prepareEvents } from '../helpers/prepareEvents';
import { TYPES } from '../types/types';

export const addEventAction = (event) => async (dispatch, getState) => {
   const { uid, name } = getState().auth;
   try {
      const res = await fetchWithToken('events', event, 'POST');
      const body = await res.json();

      if (body.ok) {
         event.id = body.event.id;
         event.user = {
            _id: uid,
            name,
         };
         dispatch(addEvent(event));
      }
   } catch (error) {
      console.log(error);
   }
};

const addEvent = (event) => ({
   type: TYPES.ADD_NEW_EVENT,
   payload: event,
});

export const loadEventsAction = () => async (dispatch) => {
   try {
      const res = await fetchWithToken('events');
      const body = await res.json();
      const events = prepareEvents(body.events);
      dispatch(eventLoaded(events));
   } catch (error) {
      console.log(error);
   }
};

const eventLoaded = (events) => ({
   type: TYPES.EVENT_LOADED,
   payload: events,
});

export const setActiveAction = (event) => ({
   type: TYPES.SET_ACTIVE_EVENT,
   payload: event,
});

export const clearActiveAction = () => ({
   type: TYPES.CLEAR_ACTIVE_EVENT,
});

export const updateEventAction = (event) => async (dispatch) => {
   try {
      const res = await fetchWithToken(`events/${event.id}`, event, 'PUT');
      const body = await res.json();

      body.ok
         ? dispatch(updateEvent(event))
         : Swal.fire('Error', body.msg, 'error');
   } catch (error) {
      console.log(error);
   }
};

const updateEvent = (event) => ({
   type: TYPES.UPDATE_EVENT,
   payload: event,
});

export const deleteEventAction = () => async (dispatch, getState) => {
   const { id } = getState().calendar.activeEvent;
   try {
      const res = await fetchWithToken(`events/${id}`, {}, 'DELETE');
      const body = await res.json();

      body.ok ? dispatch(deleteEvent()) : Swal.fire('Error', body.msg, 'error');
   } catch (error) {
      console.log(error);
   }
};

const deleteEvent = () => ({
   type: TYPES.DELETE_EVENT,
});

export const clearEventsAction = () => ({
   type: TYPES.EVENT_LOGOUT,
});
