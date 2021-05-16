import {SET_FEED} from '../actionTypes';


const INITIAL_STATE = {
    feed: []
}

const twitsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case SET_FEED:
            return {...state, feed: action.payload};
    
        default:
            return state;
    }

}

export default twitsReducer;
