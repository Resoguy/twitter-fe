import {SET_USER, SET_JWT} from '../actionTypes';


// ACTION CREATORS
export const setUser = (payload) => ({type: SET_USER, payload});
export const setJwt = (payload) => ({type: SET_JWT, payload});
