import jwt_decode from 'jwt-decode';
import {setUser, setJwt} from '../actionCreators/auth';
import * as api from '../../api';


export const login = (loginForm, successCb) => async (dispatch) => {
    const {data} = await api.login(loginForm);

    dispatch(setUser(data.user));
    dispatch(setJwt(data.jwt));

    window.localStorage.setItem('jwt', data.jwt);
    
    if (successCb) successCb();
}

export const register = (registerForm, successCb) => async (dispatch) => {
    const {data} = await api.register(registerForm);

    dispatch(setUser(data.user));
    dispatch(setJwt(data.jwt));

    window.localStorage.setItem('jwt', data.jwt);

    if (successCb) successCb();
}

export const tryLogin = () => async (dispatch) => {
    const jwt = window.localStorage.getItem('jwt');

    if (!jwt) return;

    const {id} = jwt_decode(jwt);

    const {data: user} = await api.fetchProfileById(id);

    dispatch(setUser(user));
    dispatch(setJwt(jwt));
}

export const logout = () => (dispatch) => {
    window.localStorage.removeItem('jwt');

    dispatch(setUser(null));
    dispatch(setJwt(null));
}

export const follow = (profileId) => async (dispatch, getState) => {
    const {auth} = getState();
    const newFollow = {
        follower: auth.user.id,
        following: profileId,
    }

    await api.follow(newFollow);

    const {data} = await api.fetchProfileById(auth.user.id);

    dispatch(setUser(data));
}

export const unfollow = (followId) => async (dispatch, getState) => {
    const {auth} = getState();
    
    await api.unfollow(followId);

    const {data} = await api.fetchProfileById(auth.user.id);
    
    dispatch(setUser(data));
}