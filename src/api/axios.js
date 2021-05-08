import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:1337'
});

const checkJwt = (config) => {
    const jwt = window.localStorage.getItem('jwt');

    if (!jwt) return config;

    config.headers = {
        ...config.headers, 
        Authorization: `Bearer ${jwt}`
    }

    return config;
}

const requestMiddleware = (config) => {
    return checkJwt(config);
}

const responseMiddleware = (response) => {
    console.log({response});
    return response;
}

const responseErrorMiddleware = (error) => {
    alert(error.message);
}

instance.interceptors.request.use(requestMiddleware);

instance.interceptors.response.use(responseMiddleware, responseErrorMiddleware);

export default instance;
