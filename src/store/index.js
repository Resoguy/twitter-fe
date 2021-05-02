import {combineReducers, createStore} from 'redux';
import authReducer from './reducers/authReducer';
import twitsReducer from './reducers/twitsReducer';

const reducer = combineReducers({
    auth: authReducer, 
    twits: twitsReducer
});

const store = createStore(reducer);

export default store;
