import {setFeed} from '../actionCreators/tweets';
import * as api from '../../api';


export const fetchFeed = () => async (dispatch) => {
    const {data} = await api.fetchFeed();

    dispatch(setFeed(data));
}

export const sendTweet = (values, successCb) => async (dispatch) => {
    await api.sendTweet(values);

    const {data} = await api.fetchFeed();

    dispatch(setFeed(data));
    
    if (successCb) successCb();
}

export const like = (tweetId) => async (dispatch, getState) => {
    const {auth} = getState();

    const newLike = {
        tweet: tweetId,
        user: auth.user.id
    }

    await api.likeTweet(newLike);
    const {data} = await api.fetchFeed();

    dispatch(setFeed(data));
}

export const unlike = (likeId) => async (dispatch) => {
    await api.unlikeTweet(likeId);

    const {data} = await api.fetchFeed();

    dispatch(setFeed(data));
}