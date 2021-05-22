import {setFeed} from '../actionCreators/tweets';
import {closeModal} from '../actionCreators/ui';
import * as api from '../../api';


export const fetchFeed = () => async (dispatch) => {
    const {data} = await api.fetchFeed();

    dispatch(setFeed(data));
}

export const sendTweet = (values) => async (dispatch) => {
    await api.sendTweet(values);

    const {data} = await api.fetchFeed();

    dispatch(setFeed(data));
}

export const like = (tweetId) => async (dispatch, getState) => {
    console.log('like start');
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

export const replyTweet = (newComment) => async (dispatch) => {
    await api.replyTweet(newComment);

    const {data} = await api.fetchFeed()

    dispatch(setFeed(data));
    dispatch(closeModal());
}