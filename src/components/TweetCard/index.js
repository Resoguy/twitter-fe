import React from 'react';
import {connect} from 'react-redux';
import {FaHeart, FaComment, FaRetweet, FaShare} from 'react-icons/fa';
import { Button, Card } from '../ui';
import {like, unlike} from '../../store/thunks/tweets';
import {openModal} from '../../store/actionCreators/ui';
import s from './TweetCard.module.scss';


const CommentForm = () => (
    <div>
        <h1>Comment Form</h1>
    </div>
)

const TweetCard = ({tweet, like, unlike, myId, openModal}) => {
    const likeByMe = tweet.likes.find(like => like.user === myId);

    const toggleLike = () => {
        if (!likeByMe) return like(tweet.id);

        unlike(likeByMe.id);
    }

    const openCommentModal = () => {
        openModal(CommentForm);
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

                <div className={s.contentActions}>
                    <div className={s.actionWrapper}>
                        <Button icon={FaHeart} onClick={toggleLike} />
                        <span>{tweet.likes.length}</span>
                    </div>

                    <div className={s.actionWrapper}>
                        <Button icon={FaComment} onClick={openCommentModal} />
                        <span>0</span>
                    </div>

                    <div className={s.actionWrapper}>
                        <Button icon={FaRetweet} />
                        <span>0</span>
                    </div>

                    <div className={s.actionWrapper}>
                        <Button icon={FaShare} />
                    </div>
                </div>
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
