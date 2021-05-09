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