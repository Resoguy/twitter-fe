import React from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {FaHeart, FaComment, FaRetweet, FaShare} from 'react-icons/fa';
import { Button, Card } from '../ui';
import {like, unlike} from '../../store/thunks/tweets';
import {openModal} from '../../store/actionCreators/ui';
import CommentForm from '../CommentForm';
import {extractProfileImg} from '../../utils';
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
    history,
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
        event.stopPropagation();
        if (!isTweetCard) return;

        openModal(withTweet(CommentForm, {tweet, onComment}));
    }

    const goToProfilePage = (event) => {
        event.stopPropagation();
        history.push(`/profile/${tweet.user.id}`);
    }

    return (
        <Card className={s.tweetCard} flex>
            <div className={s.imgWrapper}>
                <div className={s.profileLink} role='link' onClick={goToProfilePage}>
                    <img className={s.profileImg} src={extractProfileImg(tweet.user)} alt='profile' />
                </div>
            </div>

            <div className={s.contentWrapper}>
                <header className={s.contentHeader}>
                    <div className={s.profileLink} role='link' onClick={goToProfilePage}>
                        <h5>{tweet.user.username}</h5>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TweetCard));
