import {setUser, setJwt} from '../actionCreators';
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

    const {data} = await api.fetchMe()

    dispatch(setUser(data));
    dispatch(setJwt(jwt));
}

export const logout = () => (dispatch) => {
    window.localStorage.removeItem('jwt');

    dispatch(setUser(null));
    dispatch(setJwt(null));
}
