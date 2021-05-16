import {OPEN_MODAL, CLOSE_MODAL} from '../actionTypes';


const INITIAL_STATE = {
    isModalOpen: false,
    modalComponent: null
}

const uiReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case OPEN_MODAL:
            return {...state, isModalOpen: true, modalComponent: action.payload};

        case CLOSE_MODAL:
            return {...state, isModalOpen: false, modalComponent: null};
    
        default:
            return state;
    }
}

export default uiReducer;
