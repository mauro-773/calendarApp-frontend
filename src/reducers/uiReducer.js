import { TYPES } from '../types/types';

const initialState = {
   modalOpen: false,
};

export const uiReducer = (state = initialState, action) => {
   switch (action.type) {
      case TYPES.OPEN_MODAL:
         return {
            ...state,
            modalOpen: action.payload,
         };

      case TYPES.CLOSE_MODAL:
         return {
            ...state,
            modalOpen: action.payload,
         };

      default:
         return state;
   }
};
