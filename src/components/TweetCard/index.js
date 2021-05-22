import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {FaHeart, FaComment, FaRetweet, FaShare} from 'react-icons/fa';
import { Button, Card } from '../ui';
import {like, unlike} from '../../store/thunks/tweets';
import {openModal} from '../../store/actionCreators/ui';
import CommentForm from '../CommentForm';
import s from './TweetCard.module.scss';

const withTweet = (WrappedComponent, {tweet, ...rest}) => () => <WrappedComponent tweet={tweet} {...rest} />


const TweetCard = ({
    tweet, 
    onLike = () => null,
    onComment = () => null,
    like, 
    unlike, 
    myId, 
    openModal, 
    type = 'tweet'
}) => {
    const isTweetCard = type === 'tweet';
    const likeByMe = isTweetCard && tweet.likes.find(like => like.user === myId);

    const toggleLike = async (event) => {
        event.preventDefault();
        if (!isTweetCard) return;

        if (!likeByMe) {
            await like(tweet.id);
        } else {
            await unlike(likeByMe.id);
        }
        
        onLike();
    }

    const openCommentModal = (event) => {
        event.preventDefault();
        if (!isTweetCard) return;

        openModal(withTweet(CommentForm, {tweet, onComment}));
    }

    return (
        <Card className={s.tweetCard} flex>
            <div className={s.imgWrapper}>
                <img src='https://unsplash.it/40/40' alt='profile' />
            </div>

            <div className={s.contentWrapper}>
                <header className={s.contentHeader}>
                    <h5>{tweet.user.username}</h5>
                </header>

                <div className={s.contentBody}>
                    <p>{tweet.text}</p>
                </div>

                {
                    isTweetCard &&
                    <div className={s.contentActions}>
                        <div className={s.actionWrapper}>
                            <Button icon={FaHeart} onClick={toggleLike} />
                            <span>{tweet.likes.length}</span>
                        </div>

                        <div className={s.actionWrapper}>
                            <Button icon={FaComment} onClick={openCommentModal} />
                            <span>{tweet.comments.length}</span>
                        </div>

                        <div className={s.actionWrapper}>
                            <Button icon={FaRetweet} />
                            <span>0</span>
                        </div>

                        <div className={s.actionWrapper}>
                            <Button icon={FaShare} />
                        </div>
                    </div>
                }
            </div>
        </Card>
    )
}

const mapStateToProps = state => ({
    myId: state.auth.user && state.auth.user.id
});

const mapDispatchToProps = {
    like,
    unlike,
    openModal
};

export default connect(mapStateToProps, mapDispatchToProps)(TweetCard);
