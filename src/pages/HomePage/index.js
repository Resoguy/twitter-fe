import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import s from './HomePage.module.scss';
import TweetCard from '../../components/TweetCard';
import { fetchFeed, sendTweet } from '../../store/thunks/tweets';
import { Card, Button, Input } from '../../components/ui';
import MainLayout from '../../layouts/MainLayout';


const tweetSchema = yup.object().shape({
    text: yup.string().required().max(255).min(3),
    user: yup.number().required()
});


class HomePage extends React.Component {

    componentDidMount() {
        this.props.fetchFeed();
        console.log(this.props.feed);
    }

    sendTweet = async (values, { resetForm, setSubmitting }) => {
        await this.props.sendTweet(values);

        resetForm();
        setSubmitting(false);
    }

    render() {
        return (
            <MainLayout>
                <header className={s.mainHeader}>
                    <h1>Home Page</h1>
                </header>

                {
                    this.props.user &&
                    <div className={s.tweetFormWrapper}>
                        <Card flex>
                            <div className={s.formImgWrapper}>
                                <img src="https://unsplash.it/40/40" alt="profile" />
                            </div>

                            <div className={s.formContent}>
                                <Formik
                                    initialValues={{
                                        text: '',
                                        user: this.props.user.id
                                    }}
                                    validationSchema={tweetSchema}
                                    onSubmit={this.sendTweet}>
                                    {
                                        ({ errors, touched, isSubmitting }) => (
                                            <Form>
                                                <div className={s.formBody}>
                                                    <Field
                                                        as={Input}
                                                        type="textarea"
                                                        name="text"
                                                        placeholder="Enter your Tweet"
                                                        error={errors.text && touched.text}
                                                        block
                                                        marginless />
                                                </div>

                                                <div className={s.formActions}>
                                                    <Button type="submit" loading={isSubmitting}>
                                                        Tweet
                                                    </Button>
                                                </div>
                                            </Form>
                                        )
                                    }
                                </Formik>
                            </div>
                        </Card>
                    </div>
                }

                <div className={s.feedWrapper}>
                    {
                        this.props.feed.map(tweet => 
                            <Link className={s.tweetLinkWrapper} to={`/tweets/${tweet.id}`} key={tweet.id}>
                                <TweetCard tweet={tweet} />
                            </Link>)
                    }
                </div>
            </MainLayout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        feed: state.twits.feed,
        user: state.auth.user
    }
}

const mapDispatchToProps = {
    fetchFeed,
    sendTweet
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
