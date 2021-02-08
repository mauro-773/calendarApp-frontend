import { TYPES } from '../types/types';

const initialState = {
   checking: true,
};

export const authReducer = (state = initialState, action) => {
   switch (action.type) {
      case TYPES.START_LOGIN:
         return {
            ...state,
            ...action.payload,
            checking: false,
         };

      case TYPES.AUTH_CHECKING_FINISH:
         return {
            ...state,
            checking: false,
         };

      case TYPES.LOGOUT:
         return {
            checking: false,
         };

      default:
         return state;
   }
};
