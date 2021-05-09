import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Card, Button, Input, ErrorText} from '../../components/ui';
import {login} from '../../store/thunks';
import s from './LoginPage.module.scss';
import * as yup from 'yup';

const loginSchema = yup.object().shape({
    identifier: yup.string()
                    .required('This is a required field')
                    .min(3, 'Must be min 3 characters.'),
    password: yup.string()
                    .required('This is a required field')
                    .min(8, 'Must be min 8 characters.')
});


class LoginPage extends React.Component {
    state = {
        isLoading: false
    }

    login = async (formValues, {resetForm}) => {
        this.setState({isLoading: true});

        const successCb = () => {
            resetForm();
            this.setState({isLoading: false});
            this.props.history.replace('/');
        }

        this.props.login(formValues, successCb);
    }

    render() {
        const {isLoading} = this.state;

        return (
            <div>
                <div className={s.formWrapper}>
                    <Card>
                        <h1>Login Form</h1>

                        <Formik 
                            initialValues={{
                                identifier: '',
                                password: ''
                            }}
                            validationSchema={loginSchema}
                            onSubmit={this.login} >
                                {({errors, touched}) =>
                                    <Form>
                                        <Field 
                                            as={Input}
                                            name="identifier"
                                            label="Email or Username"
                                            placeholder="Enter your email or username"
                                            error={errors.identifier && touched.identifier}
                                            block />

                                        <Field 
                                            as={Input}
                                            name="password"
                                            type="password"
                                            label="Password"
                                            error={errors.password && touched.password}
                                            placeholder="Enter your password..."
                                            block />

                                        <Button 
                                            type="submit" 
                                            loading={isLoading}>
                                            Login
                                        </Button>
                                    </Form>
                                }
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
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage));
