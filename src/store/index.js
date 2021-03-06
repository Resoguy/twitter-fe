import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import authReducer from './reducers/authReducer';
import twitsReducer from './reducers/twitsReducer';
import uiReducer from './reducers/uiReducer';

const reducer = combineReducers({
    auth: authReducer, 
    twits: twitsReducer,
    ui: uiReducer
});

const middlewares = applyMiddleware(thunk);

const store = createStore(reducer, middlewares);

export default store;
