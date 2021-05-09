import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Formik, Form, Field} from 'formik';
import * as yup from 'yup';
import {Card, Button, Input} from '../../components/ui';
import {register} from '../../store/thunks';
import s from './RegisterPage.module.scss';

const registerSchema = yup.object().shape({
    username: yup.string().required().min(3),
    email: yup.string().required().email(),
    password: yup.string().required().min(8)
});


class RegisterPage extends React.Component {
    state = {
        isLoading: false
    }

    register = async (formValues, {resetForm}) => {
        this.setState({isLoading: true});

        const successCb = () => {
            resetForm();
            this.setState({isLoading: false});
            this.props.history.replace('/');
        }

        this.props.register(formValues, successCb);
    }

    render() {
        const {isLoading} = this.state;

        return (
            <div>
                <div className={s.formWrapper}>
                    <Card>
                        <h1>Register Form</h1>

                        <Formik
                            initialValues={{
                                username: '',
                                email: '',
                                password: ''
                            }}
                            validationSchema={registerSchema}
                            onSubmit={this.register} >

                            {({errors, touched}) => (
                                <Form>
                                    <Field
                                        as={Input}
                                        name="username"
                                        label="Username"
                                        placeholder="Enter your username..."
                                        error={errors.username && touched.username}
                                        block />

                                    <Field
                                        as={Input}
                                        name="email"
                                        type="email"
                                        label="Email"
                                        placeholder="Enter your email..."
                                        error={errors.email && touched.email}
                                        block />

                                    <Field
                                        as={Input}
                                        name="password"
                                        type="password"
                                        label="Password"
                                        placeholder="Enter your password..."
                                        error={errors.password && touched.password}
                                        block />

                                    <Button type="submit" loading={isLoading}>
                                        Register
                                    </Button>

                                </Form>
                            )}
                        </Formik>
                    </Card>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        jwt: state.auth.jwt
    }
}

const mapDispatchToProps = {
    register
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(RegisterPage));
