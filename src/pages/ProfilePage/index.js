import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { FaPen } from 'react-icons/fa';
import TweetCard from '../../components/TweetCard';
import { Button, Card, Image, Input } from '../../components/ui';
import MainLayout from '../../layouts/MainLayout';
import { fetchProfileById, fetchTweetsByUser, postImage, editProfile } from '../../api';
import { openModal } from '../../store/actionCreators/ui';
import {extractProfileImg} from '../../utils';
import s from './ProfilePage.module.scss';


const EditForm = ({ user }) => {
    const fileInput = useRef(null);
    const [imgSrc, setImgSrc] = useState(extractProfileImg(user));

    const openInput = () => {
        fileInput.current.click();
    }

    const changeFile = (event) => {
        const file = event.target.files[0];

        const reader = new FileReader();

        reader.onload = (event) => {
            setImgSrc(event.target.result);
        }

        reader.readAsDataURL(file);
    }

    const saveProfile = async () => {
        const form = new FormData();
        const file = fileInput.current.files[0];

        form.append('files', file);

        const { data } = await postImage(form);
        const imgId = data[0].id;

        await editProfile(user.id, { profileImg: imgId });
    }

    return (
        <div className={s.editFormWrapper}>
            <div className={s.editImage}>
                <Image src={imgSrc} icon={FaPen} onClick={openInput} />
                <input
                    ref={fileInput}
                    className={s.fileInput}
                    name="img-input"
                    type="file"
                    onChange={changeFile} />
            </div>

            <Formik
                initialValues={{
                    username: '',
                    bio: '',
                    location: '',
                    website: '',
                    dateOfBirth: ''
                }} >
                {({ errors, touched, isSubmitting }) => (
                    <>
                        <div className={s.editForm}>
                            <Form>
                                <Field
                                    as={Input}
                                    name="username"
                                    label="Username"
                                    placeholder="Enter your username..."
                                    error={touched.username && errors.username}
                                    block />

                                <Field
                                    as={Input}
                                    type="textarea"
                                    name="bio"
                                    label="Bio"
                                    placeholder="Enter your bio..."
                                    error={touched.bio && errors.bio}
                                    block />

                                <Field
                                    as={Input}
                                    name="location"
                                    label="Location"
                                    placeholder="Enter your location..."
                                    error={touched.location && errors.location}
                                    block />


                                <Field
                                    as={Input}
                                    name="website"
                                    label="Website"
                                    placeholder="Enter your website..."
                                    error={touched.website && errors.website}
                                    block />

                                <Field
                                    as={Input}
                                    name="dateOfBirth"
                                    label="Date of Birth"
                                    placeholder="Enter your username..."
                                    error={touched.dateOfBirth && errors.dateOfBirth}
                                    block />
                            </Form>
                        </div>



                        <div className={s.editActions}>
                            <Button type="submit" loading={isSubmitting}>Save</Button>
                        </div>
                    </>
                )}
            </Formik>
        </div>
    )
}

const withUser = (WrappedComponent, { user, ...rest }) => () => <WrappedComponent user={user} {...rest} />


class ProfilePage extends React.Component {
    state = {
        profile: null,
        tweets: null
    }

    componentDidMount() {
        this.fetchProfile();
        this.fetchProfileTweets();
    }

    fetchProfile = async () => {
        const { id } = this.props.match.params;

        const { data } = await fetchProfileById(id);

        this.setState({ profile: data });
    }

    fetchProfileTweets = async () => {
        const { id } = this.props.match.params;

        const { data } = await fetchTweetsByUser(id);

        this.setState({ tweets: data });
    }

    openEditModal = () => {
        this.props.openModal(withUser(EditForm, { user: this.state.profile }));
    }

    render() {
        const { profile, tweets } = this.state;

        return (
            <MainLayout>
                <h1>Profile Page</h1>

                {
                    profile &&
                    <Card flex>
                        <div className={s.profileImgWrapper}>
                            <Image
                                icon={FaPen}
                                src={extractProfileImg(profile)}
                                onClick={this.openEditModal} />
                        </div>

                        <div className={s.profileInfoWrapper}>
                            <h2>{profile.username}</h2>
                            <p>{profile.email}</p>
                        </div>
                    </Card>
                }

                {
                    tweets &&
                    tweets.map(tweet => <div
                        key={tweet.id}
                        role="link"
                        onClick={() => this.props.history.push(`/tweets/${tweet.id}`)}>
                        <TweetCard
                            tweet={tweet}
                            onLike={this.fetchProfileTweets}
                            onComment={this.fetchProfileTweets} />
                    </div>)
                }
            </MainLayout>
        )
    }
}

const mapDispatchToProps = {
    openModal
}

export default connect(null, mapDispatchToProps)(withRouter(ProfilePage));
