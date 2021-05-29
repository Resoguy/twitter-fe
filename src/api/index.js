import axios from './axios';


export const login = (loginData) => {
    return axios.post('/auth/local', loginData);
}

export const register = (registerData) => {
    return axios.post('/auth/local/register', registerData);
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

export const replyTweet = (newComment) => {
    return axios.post(`/comments`, newComment);
}

export const fetchTweetById = (tweetId) => {
    return axios.get(`/tweets/${tweetId}`);
}

export const fetchCommentsByTweet = (tweetId) => {
    return axios.get(`/comments?tweet=${tweetId}&&_sort=created_at:desc`);
}

export const fetchProfileById = (userId) => {
    return axios.get(`/users/${userId}`);
}

export const fetchTweetsByUser = (userId) => {
    return axios.get(`/tweets?user=${userId}&&_sort=created_at:desc`);
}

export const postImage = (form) => {
    return axios.post('/upload', form, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
}

export const editProfile = (userId, userData) => {
    return axios.put(`/users/${userId}`, userData);
}

export const follow = (newFollow) => {
    return axios.post('/follows', newFollow);
}

export const unfollow = (followId) => {
    return axios.delete(`/follows/${followId}`);
}