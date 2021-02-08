import { TYPES } from '../types/types';

export const openModalAction = () => ({
   type: TYPES.OPEN_MODAL,
   payload: true,
});

export const closeModalAction = () => ({
   type: TYPES.CLOSE_MODAL,
   payload: false,
});
