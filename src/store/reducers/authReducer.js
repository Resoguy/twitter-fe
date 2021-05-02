const INITIAL_STATE = {
    user: null,
    jwt: null
}

const authReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'SET_USER':
            return {...state, user: action.payload};

        case 'SET_JWT':
            return {...state, jwt: action.payload};
    
        default:
            return state;
    }

}

export default authReducer;
