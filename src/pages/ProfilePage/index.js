import React, { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';
import { FaPen } from 'react-icons/fa';
import TweetCard from '../../components/TweetCard';
import { Button, Card, Image, Input } from '../../components/ui';
import MainLayout from '../../layouts/MainLayout';
import { fetchProfileById, fetchTweetsByUser, postImage, editProfile } from '../../api';
import { openModal, closeModal } from '../../store/actionCreators/ui';
import {follow, unfollow} from '../../store/thunks/auth';
import {extractProfileImg} from '../../utils';
import s from './ProfilePage.module.scss';


const editProfileSchema = yup.object().shape({
    username: yup.string().required().min(3),
    bio: yup.string().min(3),
    location: yup.string().min(3),
    website: yup.string().min(3),
    dateOfBirth: yup.string().min(3)
})

const EditForm = ({ user, onComplete }) => {
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

    const saveProfile = async (values) => {
        const file = fileInput.current.files[0];

        if (!file) {
            console.log('No Image!', values)

            await editProfile(user.id, values);
            return onComplete()
        }

        const form = new FormData();
        form.append('files', file);

        const { data } = await postImage(form);
        const imgId = data[0].id;

        await editProfile(user.id, { profileImg: imgId, ...values });
        onComplete();
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
                    username: user.username || '',
                    bio: user.bio || '',
                    location: user.location || '',
                    website: user.website || '',
                    dateOfBirth: user.dateOfBirth || ''
                }}
                validationSchema={editProfileSchema}
                onSubmit={saveProfile} >
                {({ errors, touched, isSubmitting, handleSubmit }) => (
                    <Form>
                        <div className={s.editForm}>
                            <>
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
                            </>
                        </div>


                        <div className={s.editActions}>
                            <Button type="submit" loading={isSubmitting}>Save</Button>
                        </div>
                    </Form>
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
        if (this.props.user.id !== this.state.profile.id) return;
        
        this.props.openModal(withUser(EditForm, { 
            user: this.state.profile, 
            onComplete: () => {
                this.fetchProfile();
                this.props.closeModal();
            }
        }));
    }

    toggleFollow = () => {
        const followByMe = this.props.user.followings.find(follow => follow.following === this.state.profile.id);

        if (followByMe) {
            this.props.unfollow(followByMe.id);
        } else {
            this.props.follow(this.state.profile.id);
        }
    }

    render() {
        const { profile, tweets } = this.state;
        const {id: userId, followings: myFollowings} = this.props.user;
        const isMyProfile = profile && userId === profile.id;
        const isFollowedByMe = myFollowings && profile && !!myFollowings.find(follow => follow.following === profile.id);

        return (
            <MainLayout>
                <h1>Profile Page</h1>

                {
                    profile &&
                    <Card flex>
                        <div className={s.profileImgWrapper}>
                            <Image
                                icon={isMyProfile && FaPen }
                                src={extractProfileImg(profile)}
                                onClick={this.openEditModal} />
                        </div>

                        <div className={s.profileInfoWrapper}>
                            <h2>{profile.username}</h2>
                            <p>{profile.email}</p>
                            <p>Bio: {profile.bio}</p>
                            <p>Location: {profile.location}</p>
                            <p>Website: {profile.website}</p>
                        </div>

                        <div>
                            <Button 
                                variant={isFollowedByMe ? 'outline' : 'normal'}
                                onClick={() => {
                                    isMyProfile ? this.openEditModal() : this.toggleFollow()
                                }}>
                                {
                                    isMyProfile ?
                                    'Edit' :
                                    (isFollowedByMe ? 'Unfollow' : 'Follow')
                                }
                            </Button>
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
    openModal,
    closeModal,
    follow,
    unfollow
}

const mapStateToProps = state => ({
    user: state.auth.user || {}
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(ProfilePage));
