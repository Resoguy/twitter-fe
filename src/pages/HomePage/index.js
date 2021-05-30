import React from 'react';
import { connect } from 'react-redux';
import {FaImage} from 'react-icons/fa'
import {withRouter, Link} from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import s from './HomePage.module.scss';
import TweetCard from '../../components/TweetCard';
import { fetchFeed, sendTweet } from '../../store/thunks/tweets';
import { Card, Button, Input } from '../../components/ui';
import MainLayout from '../../layouts/MainLayout';
import {extractImageFromFile} from '../../utils';
import {postImage} from '../../api';


const tweetSchema = yup.object().shape({
    text: yup.string().required().max(255).min(3),
    user: yup.number().required()
});


class HomePage extends React.Component {
    imageInputRef = null;
    state = {
        imagePreview: null
    }

    componentDidMount() {
        this.props.fetchFeed();
        console.log(this.props.feed);
    }

    openImageInput = () => {
        this.imageInputRef.click();
    }

    changeImage = (file) => {
        console.log(file);
        const reader = new FileReader();

        reader.onload = () => {
            this.setState({imagePreview: reader.result});
        }

        reader.readAsDataURL(file);
    }

    sendTweet = async (values, { resetForm, setSubmitting }) => {
        const {image, ...tweet} = values;

        const form = new FormData();
        form.append('files', image);

        const {data} = await postImage(form);

        const newTweet = {
            ...tweet,
            image: data[0].id
        }

        await this.props.sendTweet(newTweet);

        resetForm();
        this.setState({imagePreview: null});
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
                                <Link to={`/profile/${this.props.user.id}`}>
                                    <img className={s.profileImg} src={extractImageFromFile(this.props.user.profileImg)} alt="profile" />
                                </Link>
                            </div>

                            <div className={s.formContent}>
                                <Formik
                                    initialValues={{
                                        text: '',
                                        user: this.props.user.id,
                                        image: null
                                    }}
                                    validationSchema={tweetSchema}
                                    onSubmit={this.sendTweet}>
                                    {
                                        ({ errors, touched, isSubmitting, setFieldValue }) => (
                                            <Form>
                                                <div className={s.formBody}>
                                                    <Field
                                                        as={Input}
                                                        type="textarea"
                                                        name="text"
                                                        placeholder="Enter your Tweet"
                                                        error={errors.text && touched.text}
                                                        rows="8"
                                                        block
                                                        marginless />

                                                    <input 
                                                        ref={el => this.imageInputRef = el}
                                                        className={s.imageInput}
                                                        type="file" 
                                                        name="image"
                                                        accept="image/*"
                                                        onChange={event => {
                                                            const file = event.target.files[0];

                                                            setFieldValue('image', file);
                                                            this.changeImage(file);
                                                        }} />
                                                        
                                                    <Button 
                                                        className={s.imageInputBtn} 
                                                        icon={FaImage} 
                                                        onClick={this.openImageInput} />
                                                </div>

                                                {
                                                    this.state.imagePreview &&
                                                    <div className={s.imagePreviewWrapper}>
                                                        <img 
                                                            className={s.imagePreview} 
                                                            src={this.state.imagePreview} 
                                                            alt="preview" />
                                                    </div>
                                                }

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
                            <div 
                                className={s.tweetLink}
                                key={tweet.id} 
                                role="link" 
                                onClick={() => this.props.history.push(`/tweets/${tweet.id}`)}>
                                <TweetCard tweet={tweet} />
                            </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(HomePage));
