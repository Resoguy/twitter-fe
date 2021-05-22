import React from 'react';
import {connect} from 'react-redux';
import {Formik, Form, Field} from 'formik';
import * as yup from 'yup';
import { Button, Card, Input } from '../ui';
import {replyTweet} from '../../store/thunks/tweets';
import s from './CommentForm.module.scss';


const commentSchema = yup.object().shape({
    text: yup.string().required().max(255).min(3),
    user: yup.number().required()
});


const CommentForm = ({user, tweet, replyTweet, onComment}) => {
    const submitComment = async (values) => {
        const newComment = {
            tweet: tweet.id,
            user: values.user,
            text: values.text
        }

        await replyTweet(newComment);
        onComment();
    }

    return (
        <div className={s.commentFormWrapper}>
            <h3 className={s.replyTitle}>Reply Tweet</h3>

            <Card>
                <h4>{tweet.user.username}</h4>

                <p>{tweet.text}</p>
            </Card>

            <Formik
                initialValues={{
                    text: '',
                    user: user.id
                }}
                validationSchema={commentSchema}
                onSubmit={submitComment} >
                {
                    ({errors, touched, isSubmitting}) => (
                        <Form>
                            <Field
                                as={Input}
                                type="textarea"
                                name="text"
                                error={touched.text && errors.text}
                                placeholder="Enter your reply..."
                                block />

                            <Button type="submit" loading={isSubmitting}>
                                Reply
                            </Button>
                        </Form>
                    )
                }
            </Formik>
        </div>
    )
};

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = {
    replyTweet
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);
