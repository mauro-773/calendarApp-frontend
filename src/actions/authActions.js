import { fetchWithoutToken, fetchWithToken } from '../helpers/fetch';
import { TYPES } from '../types/types';
import Swal from 'sweetalert2';
import { clearEventsAction } from './calendarActions';

const saveTokenLS = (token) => {
   localStorage.setItem('token', token);
   localStorage.setItem('token-init-date', new Date().getTime());
};

const showMSGError = (msg) => {
   Swal.fire('Error', msg, 'error');
};

export const startLoginAction = (email, password) => async (dispatch) => {
   try {
      const res = await fetchWithoutToken('auth', { email, password }, 'POST');
      const body = await res.json();

      if (body.ok) {
         saveTokenLS(body.token);
         dispatch(login({ uid: body.uid, name: body.name }));
      } else {
         showMSGError(body.msg);
      }
   } catch (error) {
      console.log(error);
   }
};

const login = (user) => ({
   type: TYPES.START_LOGIN,
   payload: user,
});

export const startRegisterAction = (name, email, password) => async (
   dispatch
) => {
   const newUser = { name, email, password };
   try {
      const res = await fetchWithoutToken('auth/new', newUser, 'POST');
      const body = await res.json();

      if (body.ok) {
         saveTokenLS(body.token);
         dispatch(login({ uid: body.uid, name: body.name }));
      } else {
         showMSGError(body.msg);
      }
   } catch (error) {
      console.log(error);
   }
};

export const startCheckingAction = () => async (dispatch) => {
   try {
      const res = await fetchWithToken('auth/renew');
      const body = await res.json();

      if (body.ok) {
         saveTokenLS(body.token);
         dispatch(login({ uid: body.uid, name: body.name }));
      } else {
         dispatch(checkingFinish());
      }
   } catch (error) {
      console.log(error);
   }
};

const checkingFinish = () => ({ type: TYPES.AUTH_CHECKING_FINISH });

export const startLogoutAction = () => (dispatch) => {
   localStorage.clear();
   dispatch(logout());
   dispatch(clearEventsAction());
};

const logout = () => ({ type: TYPES.LOGOUT });
