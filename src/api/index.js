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

export const fetchFeed = () => {
    return axios.get('/tweets?_sort=created_at:desc');
}

export const sendTweet = (values) => {
    return axios.post('/tweets', values);
}

export const likeTweet = (newLike) => {
    return axios.post('/likes', newLike);
}

export const unlikeTweet = (likeId) => {
    return axios.delete(`/likes/${likeId}`);
}