import React from 'react';
import { Button, Card } from '../ui';
import s from './TweetCard.module.scss';


const TweetCard = ({tweet}) => {

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
                    <Button>
                        Like
                    </Button>

                    <Button>
                        Comment
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default TweetCard;
