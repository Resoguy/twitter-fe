import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Formik, Form, Field, ErrorMessage} from 'formik';
import {Card, Button, Input, ErrorText} from '../../components/ui';
import {login} from '../../store/thunks';
import s from './LoginPage.module.scss';


class LoginPage extends React.Component {
    state = {
        isLoading: false
    }

    login = async (formValues) => {
        this.setState({isLoading: true});
        const successCb = () => {
            this.setState({
                identifier: '',
                password: '',
                isLoading: false
            });
            this.props.history.replace('/');
        }

        this.props.login(formValues, successCb);
    }

    loginValidator = (values) => {
        const errors = {};

        if (values.identifier.length < 3) {
            errors.identifier = 'Min character length is 3.';
        }

        if (values.password.length < 6) {
            errors.password = 'Min char length is 6';
        }

        return errors;
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
                            validate={this.loginValidator}
                            onSubmit={this.login} >
                                {({errors, touched}) =>
                                    <Form>
                                        {console.log({touched})}
                                        <Field 
                                            as={Input}
                                            name="identifier"
                                            label="Email or Username"
                                            placeholder="Enter your email or username"
                                            error={errors.identifier && touched.identifier}
                                            block />

                                        <ErrorMessage name="identifier" component={ErrorText} />

                                        <Field 
                                            as={Input}
                                            name="password"
                                            type="password"
                                            label="Password"
                                            error={errors.password && touched.password}
                                            placeholder="Enter your password..."
                                            block />

                                        <ErrorMessage name="password" component={ErrorText} />

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
