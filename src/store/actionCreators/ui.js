import {OPEN_MODAL, CLOSE_MODAL} from '../actionTypes';

export const openModal = (component) => ({type: OPEN_MODAL, payload: component});
export const closeModal = () => ({type: CLOSE_MODAL});
