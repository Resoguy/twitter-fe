import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {withRouter, Link} from 'react-router-dom';
import {FaHeart, FaComment, FaRetweet, FaShare} from 'react-icons/fa';
import {fetchProfileById} from '../../api';
import { Button, Card } from '../ui';
import {like, unlike} from '../../store/thunks/tweets';
import {closeModal, openModal} from '../../store/actionCreators/ui';
import CommentForm from '../CommentForm';
import RetweetForm from '../RetweetForm';
import {extractImageFromFile} from '../../utils';
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
    closeModal,
    history,
    type = 'tweet' // 'tweet' | 'retweet' | 'reply'
}) => {
    const isTweetCard = type === 'tweet';
    const isRetweet = type === 'retweet';
    const likeByMe = isTweetCard && tweet.likes.find(like => like.user === myId);

    const [user, setUser] = useState({});

    useEffect(() => {
        if (!isRetweet) return;

        fetchRetweetUser();
    }, []);

    const fetchRetweetUser = async () => {
        const {data} = await fetchProfileById(tweet.user);

        setUser(data);
    }

    const toggleLike = async (event) => {
        event.stopPropagation();
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

    const openRetweetModal = (event) => {
        event.stopPropagation();

        openModal(withTweet(RetweetForm, {tweet, myId}));
    }

    return (
        <Card className={s.tweetCard} flex>
            <div className={s.imgWrapper}>
                <div className={s.profileLink} role='link' onClick={goToProfilePage}>
                    <img className={s.profileImg} src={extractImageFromFile(tweet.user.profileImg || user.profileImg)} alt='profile' />
                </div>
            </div>

            <div className={s.contentWrapper}>
                <header className={s.contentHeader}>
                    <div className={s.profileLink} role='link' onClick={goToProfilePage}>
                        <h5>{tweet.user.username || user.username} {tweet.user.email || user.email}</h5>
                    </div>
                </header>

                <div className={s.contentBody}>
                    <p>{tweet.text}</p>
                </div>

                {
                    tweet.image &&
                    <div className={s.tweetImgWrapper}>
                        <img 
                            className={s.tweetImg}
                            src={extractImageFromFile(tweet.image, 'medium')}
                            alt={tweet.image.name} />
                    </div>
                }

                {
                    tweet.parentTweet && !isRetweet &&
                    <TweetCard tweet={tweet.parentTweet} type="retweet" />
                }

                {
                    isTweetCard && !isRetweet &&
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
                            <Button icon={FaRetweet} onClick={openRetweetModal} />
                            <span>{tweet.children.length}</span>
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
    openModal,
    closeModal
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(TweetCard));
