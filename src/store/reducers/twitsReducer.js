const INITIAL_STATE = {
    twits: []
}

const twitsReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'SET_TWITS':
            return {...state, twits: action.payload};
    
        default:
            return state;
    }

}

export default twitsReducer;
