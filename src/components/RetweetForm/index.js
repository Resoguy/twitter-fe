import React from 'react';
import {connect} from 'react-redux';
import {Formik, Form, Field} from 'formik';
import { Button, Input } from '../ui';
import s from './RetweetForm.module.scss';
import {extractImageFromFile} from '../../utils';
import {sendTweet} from '../../store/thunks/tweets';
import {closeModal} from '../../store/actionCreators/ui';


const RetweetForm = ({tweet, myId, sendTweet, closeModal}) => {

    const sendRetweet = async (values, { resetForm, setSubmitting }) => {
        const retweet = {
            ...values,
            parentTweet: tweet.id
        }
        await sendTweet(retweet);

        resetForm();
        setSubmitting(false);
        closeModal();
    }

    return (
        <div className={s.retweetWrapper}>
            <h2>Retweet</h2>

            <div className={s.tweetWrapper}>
                <div className={s.profileImgWrapper}>
                    <img 
                        className={s.profileImg} 
                        src={extractImageFromFile(tweet.user.profileImg)} 
                        alt="tweet-user" />
                </div>

                <div className={s.tweetBody}>
                    <h4 className={s.tweetUser}>{tweet.user.username} <small>tweet.user.email</small></h4>
                    <p className={s.tweetText}>
                        {tweet.text}
                    </p>
                    {
                        tweet.image &&
                        <div className={s.tweetImgWrapper}>
                            <img
                                className={s.tweetImg}
                                src={extractImageFromFile(tweet.image, 'medium')}
                                alt="tweet-content" />
                        </div>
                    }
                </div>
            </div>

            <Formik
                initialValues={{
                    text: '',
                    user: myId
                }}
                onSubmit={sendRetweet}>
                    {
                        ({errors, touched, isSubmitting}) => (
                            <Form>
                                <div className={s.retweetForm}>
                                    <Field
                                        as={Input}
                                        type="textarea"
                                        name="text"
                                        placeholder="Enter your retweet..."
                                        error={touched.text && errors.text}
                                        block
                                        marginless />
                                </div>

                                <div className={s.actions}>
                                    <Button 
                                        type="submit" 
                                        loading={isSubmitting}>
                                        Retweet
                                    </Button>
                                </div>
                            </Form>
                        )
                    }
            </Formik>
        </div>
    )
}

const mapDispatchToProps = {
    sendTweet,
    closeModal
}

export default connect(null, mapDispatchToProps)(RetweetForm);
