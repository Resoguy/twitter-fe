import axios from './axios';


export const login = (loginData) => {
    return axios.post('/auth/local', loginData);
}

export const register = (registerData) => {
    return axios.post('/auth/local/register', registerData);
}

export const fetchMe = () => {
    return axios.get('/users/me');
}
