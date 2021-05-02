import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {Card, Button, Input} from '../../components/ui';
import {login} from '../../api';
import {setJwt, setUser} from '../../store/actionCreators';
import s from './LoginPage.module.scss';


class LoginPage extends React.Component {
    state = {
        identifier: '',
        password: ''
    }

    setIdentifier = (event) => {
        this.setState({identifier: event.target.value});
    }

    setPassword = (event) => {
        this.setState({password: event.target.value});
    }

    login = async (event) => {
        event.preventDefault();

        const {identifier, password} = this.state;
        const loginForm = {
            identifier,
            password
        }
        const {data} = await login(loginForm);

        this.props.dispatch(setUser(data.user));
        this.props.dispatch(setJwt(data.jwt));
        this.setState({
            identifier: '',
            password: ''
        });
        this.props.history.replace('/');
    }

    render() {
        const {identifier, password} = this.state;

        return (
            <div>
                <div className={s.formWrapper}>
                    <Card>
                        <h1>Login Form</h1>
                        <form onSubmit={this.login}>

                            <Input
                                name="identifier"
                                label="Email or Username"
                                placeholder="Enter your email or username..."
                                value={identifier}
                                onChange={this.setIdentifier}
                                block />

                            <Input
                                name="password"
                                type="password"
                                label="Password"
                                placeholder="Enter your password..."
                                value={password}
                                onChange={this.setPassword}
                                block />

                            <Button type="submit">
                                Login
                            </Button>

                        </form>
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

export default connect(mapStateToProps)(withRouter(LoginPage));
