import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {setJwt, setUser} from '../../store/actionCreators';
import {Card, Button, Input} from '../../components/ui';
import {register} from '../../api';
import s from './RegisterPage.module.scss';


class RegisterPage extends React.Component {
    state = {
        username: '',
        email: '',
        password: ''
    }

    setUsername = (event) => {
        this.setState({username: event.target.value});
    }

    setEmail = (event) => {
        this.setState({email: event.target.value});
    }

    setPassword = (event) => {
        this.setState({password: event.target.value});
    }

    register = async (event) => {
        event.preventDefault();

        const {username, email, password} = this.state;
        const registerForm = {
            username,
            email,
            password
        }

        const {data} = await register(registerForm);

        this.props.dispatch(setUser(data.user));
        this.props.dispatch(setJwt(data.jwt));
        this.setState({
            username: '',
            email: '',
            password: ''
        });

        this.props.history.replace('/');
    }

    render() {
        const {username, email, password} = this.state;

        return (
            <div>
                <div className={s.formWrapper}>
                    <Card>
                        <h1>Register Form</h1>

                        <form onSubmit={this.register}>

                            <Input 
                                name="username"
                                label="Username"
                                value={username}
                                onChange={this.setUsername}
                                placeholder="Enter your username..."
                                block />

                            <Input
                                name="email"
                                type="email"
                                label="Email"
                                value={email}
                                onChange={this.setEmail}
                                placeholder="Enter your email..."
                                block />

                            <Input
                                name="password"
                                type="password"
                                label="Password"
                                value={password}
                                onChange={this.setPassword}
                                placeholder="Enter your password..."
                                block />

                            <Button type="submit">
                                Register
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

export default connect(mapStateToProps)(withRouter(RegisterPage));
